Function IIf($If, $IfTrue, $IfFalse) {
    if ($If) {if ($IfTrue -is 'ScriptBlock') {&$IfTrue} else {$IfTrue}}
    else {if ($IfFalse -is 'ScriptBlock') {&$IfFalse} else {$IfFalse}}
}
function Build-AngularApp (
    $AppName,
    $SpaDirectory,
    $SiteRootDirectory,
    $DistDirectory,
    $NpmInstallScript,
    $NpmSiteBuildScript
) {
    Write-Output "******************************************"
    Write-Output "$($AppName): BUILD STARTED"
    Write-Output "******************************************"

    $projectDistDir = Join-Path -Path $DistDirectory -ChildPath $SiteRootDirectory
    
    Write-Output "changed working directory to $($SpaDirectory)"
    Write-Output "running npm.v.$(npm -v)"
    Write-Output "project dist: $($projectDistDir)"
    
    Set-Location -Path $SpaDirectory
    
    npm run $NpmInstallScript
    npm run $NpmSiteBuildScript
    
    Write-Output "******************************************"
    Write-Output "$($AppName): BUILD ENDED"
    Write-Output "******************************************"
    Write-Output "";

    if ($IsExecutingOnBuildServer -eq $true) {
      Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): angular app build finished: $($projectDistDir)" -Category Information
    }
}
function Publish-ReleasePackage (
    $AppName,
    $BuildDirectory,
    $NugetPackageId,
    $NugetPackageDescription,
    $NugetTags,
    $NugetFileTargets,
    $ArtifactsDirectory,
    $ReleaseDirectory,
    $IsExecutingOnBuildServer,
    $NugetFeedApiKey,
    $NugetFeedUrl,
    $GitVersioning
) {
    Write-Output "";
    Write-Output "******************************************"
    Write-Output "$($AppName): RELEASE STARTED"
    Write-Output "******************************************"
    Write-Output "";

    $nuspecFile = Join-Path -Path $BuildDirectory -ChildPath "release/$($NugetPackageId).nuspec"
    $nuspecTemplate = Join-Path -Path $BuildDirectory -ChildPath "nuspec.template"
    $lastCommitMessage = git log -1 --pretty=%B
    $artifactName = "$($NugetPackageId).$($GitVersioning.NuGetVersionV2)-$($GitVersioning.CommitsSinceVersionSource)"
    $artifactNupkg = Join-Path -Path $BuildDirectory -ChildPath "artifacts/$($artifactName).nupkg"

    Set-Location -Path $BuildDirectory
    
    Get-Content ($nuspecTemplate) | ForEach-Object { 
      $_ -replace '@version', -join($GitVersioning.NuGetVersionV2, "-", $GitVersioning.CommitsSinceVersionSource) `
         -replace "@id", "$($NugetPackageId)" `
         -replace "@releaseNotes", $lastCommitMessage `
         -replace "@description", "$($NugetPackageDescription)" `
         -replace "@tags", "$($NugetTags)" `
         -replace "@files", ($NugetFileTargets -join "`n") `
    } > $nuspecFile

    nuget pac (Join-path -Path $ReleaseDirectory -ChildPath "$($NugetPackageId).nuspec") -OutputDirectory $ArtifactsDirectory

    if ($IsExecutingOnBuildServer -eq $true) {
      Push-AppveyorArtifact $artifactNupkg
      Write-Output "nuget push $($artifactNupkg) -ApiKey $($NugetFeedApiKey) -Source $($NugetFeedUrl)"
    
      nuget push $artifactNupkg -ApiKey $NugetFeedApiKey -Source $NugetFeedUrl
    }

    Write-Output "";
    Write-Output "******************************************"
    Write-Output "$($AppName): RELEASE ENDED"
    Write-Output "******************************************"
    Write-Output "";

    if ($IsExecutingOnBuildServer -eq $true) {
      Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): release package published: $($artifactName)" -Category Information
    }
}
function Publish-FirebaseSite (
    $AppName,
    $SpaDirectory,
    $AppSpaDirectory,
    $BuildDirectory,
    $DeployTarget,
    $LocalDeployTarget,
    $IsExecutingOnBuildServer,
    $NugetPackgeId,
    $GitVersioning,
    $TargetDefault,
    $TargetStage,
    $TargetProd,
    $FirebaseKey,
    $FirebaseRulesConfigFile,
    $FirebasIndexConfigFile
) {
    Write-Output "******************************************"
    Write-Output "$($AppName): DEPLOY STARTED"
    Write-Output "******************************************"
    Write-Output "";

    #skip deploy if not running on build server

    if ($DeployTarget -eq $LocalDeployTarget) {
      Write-Output "DEPLOY SKIPPED!!!";
      Write-Output "";
    
      if ($IsExecutingOnBuildServer -eq $true) {
        Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): firebase app publish SKIPPED!!!: $($artifact)" -Category Information
      }
      
      return;
    }

    $artifact = "$($NugetPackageId).$($GitVersioning.NuGetVersionV2)-$($GitVersioning.CommitsSinceVersionSource)"
    
    Set-Location -Path $SpaDirectory
    
    #install firebase tools

    npm run build:firebase
    
    #set firebase target

    if ($DeployTarget -eq $developDeployTarget) {
      firebase use $TargetDefault --token $FirebaseKey
      Write-Output "using firebase target: $($TargetDefault)"
    } elseif ($DeployTarget -eq $stagingDeployTarget) {
      firebase use $TargetStage --token $FirebaseKey
      Write-Output "using firebase target: $($TargetStage)"
    } elseif ($DeployTarget -eq $prodDeployTarget) {
      firebase use $TargetProd --token $FirebaseKey
      Write-Output "using firebase target: $($TargetProd)"
    }

    #config files

    $firestoreRulesFileName = "firestore.rules"
    $firestoreIndexesFileName = "firestore.indexes.json"

    $thisAppRulesConfigFile = Join-Path -Path $AppSpaDirectory -ChildPath $firestoreRulesFileName
    $thisAppIndexConfigFile = Join-Path -Path $AppSpaDirectory -ChildPath $firestoreIndexesFileName

    $rulesConfigFile = Join-Path -Path $SpaDirectory -ChildPath $firestoreRulesFileName
    $indexConfigFile = Join-Path -Path $SpaDirectory -ChildPath $firestoreIndexesFileName

    if (Test-Path $thisAppRulesConfigFile -PathType leaf)
    {
      Write-Output "using security rules in: $($thisAppRulesConfigFile)"
      Copy-Item $thisAppRulesConfigFile  $rulesConfigFile -Force

      Write-Output "firebase deploy --only firestore:rules"
      firebase deploy --only firestore:rules
    }

    if (Test-Path $indexConfigFile -PathType leaf)
    {
      Remove-Item $indexConfigFile -Force
    } 

    if (Test-Path $thisAppRulesConfigFile -PathType leaf)
    {
      Write-Output "using indexes in: $($thisAppIndexConfigFile)"
      Copy-Item $thisAppIndexConfigFile  $indexConfigFile -Force

      #firebase deploy --only firestore:indexes
    }    

    #deploy
    
    Write-Output "firebase deploy --only hosting:$($AppName.ToLower()) --message $($NugetPackageId).$($GitVersioning.InformationalVersion) --token $($FirebaseKey)"
    firebase deploy --only hosting:$($AppName.ToLower()) --message "$($NugetPackageId).$($GitVersioning.InformationalVersion)" --token $FirebaseKey
    
    Write-Output "******************************************"
    Write-Output "$($AppName): DEPLOY ENDED"
    Write-Output "******************************************"
    Write-Output "";
    
    if ($IsExecutingOnBuildServer -eq $true) {
      Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): firebase app published: $($artifact)" -Category Information
    }

    Set-Location -Path $BuildDirectory
}
