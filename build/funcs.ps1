Function IIf($If, $IfTrue, $IfFalse) {
    if ($If) {if ($IfTrue -is 'ScriptBlock') {&$IfTrue} else {$IfTrue}}
    else {if ($IfFalse -is 'ScriptBlock') {&$IfFalse} else {$IfFalse}}
}
function Build-AngularApp(
    $FriendlyAppName,
    $SpaDirecotry,
    $SiteRootDirectory,
    $DistDirectory,
    $NpmInstallScript,
    $NpmSiteBuildScript
) {
    Write-Output "******************************************"
    Write-Output "$($FriendlyAppName): BUILD STARTED"
    Write-Output "******************************************"

    $projectDistDir = Join-Path -Path $DistDirectory -ChildPath $SiteRootDirectory
    
    Write-Output "changed working directory to $($SpaDirecotry)"
    Write-Output "running npm.v.$(npm -v)"
    Write-Output "project dist: $($projectDistDir)"
    
    Set-Location -Path $SpaDirecotry
    
    npm run $NpmInstallScript
    npm run $NpmSiteBuildScript
    
    Write-Output "******************************************"
    Write-Output "$($FriendlyAppName): BUILD ENDED"
    Write-Output "******************************************"
    Write-Output "";
}

function Publish-ReleasePackage(
    $FriendlyAppName,
    $BuildDirectory,
    $NugetPackageId,
    $NugetPackageDescription,
    $NugetTags,
    $NugetFileTargets,
    $ArtifactsDirectory,
    $ReleaseDirectory,
    $IsRunningOnBuildServer,
    $NugetApiKey,
    $NugetUrl
) {
    Write-Output "";
    Write-Output "******************************************"
    Write-Output "$($FriendlyAppName): RELEASE STARTED"
    Write-Output "******************************************"
    Write-Output "";

    $nuspecFile = Join-Path -Path $BuildDirectory -ChildPath "release/$($NugetPackageId).nuspec"
    $nuspecTemplate = Join-Path -Path $BuildDirectory -ChildPath "nuspec.template"
    $lastCommitMessage = git log -1 --pretty=%B
    $artifactName = "$($NugetPackageId).$($GitVersion.NuGetVersionV2)-$($GitVersion.CommitsSinceVersionSource)"
    $artifactNupkg = Join-Path -Path $BuildDirectory -ChildPath "artifacts/$($artifactName).nupkg"

    Set-Location -Path $BuildDirectory
    
    Get-Content ($nuspecTemplate) | ForEach-Object { 
      $_ -replace '@version', -join($GitVersion.NuGetVersionV2, "-", $GitVersion.CommitsSinceVersionSource) `
         -replace "@id", "$($NugetPackageId)" `
         -replace "@releaseNotes", $lastCommitMessage `
         -replace "@description", "$($NugetPackageDescription)" `
         -replace "@tags", "$($NugetTags)" `
         -replace "@files", ($NugetFileTargets -join "`n") `
    } > $nuspecFile

    nuget pac (Join-path -Path $ReleaseDirectory -ChildPath "$($NugetPackageId).nuspec") -OutputDirectory $ArtifactsDirectory

    if ($IsRunningOnBuildServer -eq $true) {
      Push-AppveyorArtifact $artifactNupkg
      Write-Output "nuget push $($artifactNupkg) -ApiKey $($NugetApiKey) -Source $($NugetUrl)"
    
      nuget push $artifactNupkg -ApiKey $NugetApiKey -Source $NugetUrl
    }

    Write-Output "";
    Write-Output "******************************************"
    Write-Output "$($FriendlyAppName): RELEASE ENDED"
    Write-Output "******************************************"
    Write-Output "";

    $artifactName
}

function Publish-FirebaseSite(
    $FriendlyAppName,
    $BuildDirectory,
    $DeployTarget,
    $LocalDeployTarget,
    $IsRunningOnBuildServer,
    $ArtifactName,
    $FirebaseToken,
    $NugetPackgeId,
    $GitVersion
) {
    Write-Output "******************************************"
    Write-Output "$($FriendlyAppName): DEPLOY STARTED"
    Write-Output "******************************************"
    Write-Output "";
    
    if ($DeployTarget -eq $LocalDeployTarget) {
      Write-Output "DEPLOY SKIPPED!!!";
      Write-Output "";
    
      if ($IsRunningOnBuildServer -eq $true) {
        Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): Release/Deployed ended: $($ArtifactName)" -Category Information
      }
      
      return;
    }
    
    Set-Location -Path $spaDir
    
    npm run build:firebase
    
    if ($DeployTarget -eq $developDeployTarget) {
      firebase use default
    } elseif ($DeployTarget -eq $stagingDeployTarget) {
      firebase use stage
    } elseif ($DeployTarget -eq $prodDeployTarget) {
      firebase use prod
    }
    
    firebase deploy --only hosting:nimb3s --message "$($NugetPackageId).$($GitVersion.InformationalVersion)" --token $FirebaseToken
    
    Write-Output "******************************************"
    Write-Output "$($FriendlyAppName): DEPLOY ENDED"
    Write-Output "******************************************"
    Write-Output "";
    
    if ($IsRunningOnBuildServer -eq $true) {
      Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): Release/Deployed ended: $($ArtifactName)" -Category Information
    }

    Set-Location -Path $BuildDirectory
}