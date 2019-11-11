$appName = "JwAdmin"
$friendlyAppName = "SPA $($appName)"
$nugetPkgId = "$($appName).Spa"
$appSpaDir = Join-Path -Path $spaDir -ChildPath "apps/$appName"

if ($envDeployTarget -eq $stagingDeployTarget) {
    $npmBuildScript = "build:$($appName.ToLower())-stage"
} elseif ($envDeployTarget -eq $prodDeployTarget) {
    $npmBuildScript = "build:$($appName.ToLower())-prod"
} else {
    $npmBuildScript = "build:$($appName.ToLower())-dev"
}

Build-AngularApp `
    -AppName $friendlyAppName `
    -SpaDirectory $spaDir `
    -SiteRootDirectory "apps/$($appName.ToLower())/*" `
    -DistDirectory $distDir `
    -NpmInstallScript "build:install" `
    -NpmSiteBuildScript $npmBuildScript

Publish-ReleasePackage `
    -AppName $friendlyAppName `
    -BuildDirectory $buildDir `
    -IsExecutingOnBuildServer $isRunningOnBuildServer `
    -ArtifactsDirectory $artifactsDir `
    -ReleaseDirectory $releaseDir `
    -GitVersioning $gitVersion `
    -NugetPackageId $nugetPkgId `
    -NugetPackageDescription "$($appName) Single Page App" `
    -NugetTags "nimb3s jwadmin angular web spa" `
    -NugetFileTargets @( ,("<file src=`"..\src\spas\dist\apps\$($appName.ToLower())\**\*`" target=`"dist`" />")) `
    -NugetFeedApiKey $nugetApiKey `
    -NugetFeedUrl $nugetUrl
    
Publish-FirebaseSite `
    -AppName $appName `
    -SpaDirectory $spaDir `
    -AppSpaDirectory $appSpaDir `
    -BuildDirectory $buildDir `
    -IsExecutingOnBuildServer $isRunningOnBuildServer `
    -DeployTarget $envDeployTarget `
    -LocalDeployTarget $localhostDeployTarget `
    -TargetDefault "default-$($appName.ToLower())" `
    -TargetStage "stage-$($appName.ToLower())" `
    -TargetProd "prod-$($appName.ToLower())" `
    -FirebaseKey $firebaseToken `
    -NugetPackageId $nugetPkgId `
    -GitVersioning $gitVersion