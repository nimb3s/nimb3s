$appName = "Nimb3s"
$friendlyAppName = "SPA $($appName)"
$nugetPkgId = "$($appName).Spa"
$appSpaDir = Join-Path -Path $spaDir -ChildPath "apps/$appName"

Build-AngularApp `
    -AppName $friendlyAppName `
    -SpaDirectory $spaDir `
    -SiteRootDirectory "apps/$($appName.ToLower())/*" `
    -DistDirectory $distDir `
    -NpmInstallScript "build:install" `
    -NpmSiteBuildScript "build:$($appName.ToLower())"

Publish-ReleasePackage `
    -AppName $friendlyAppName `
    -BuildDirectory $buildDir `
    -IsExecutingOnBuildServer $isRunningOnBuildServer `
    -ArtifactsDirectory $artifactsDir `
    -ReleaseDirectory $releaseDir `
    -GitVersioning $gitVersion `
    -NugetPackageId $nugetPkgId `
    -NugetPackageDescription "$($appName) Single Page App" `
    -NugetTags "nimb3s angular web spa" `
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
    -TargetDefault "default" `
    -TargetStage "stage" `
    -TargetProd "prod" `
    -FirebaseKey $firebaseToken `
    -NugetPackageId $nugetPkgId `
    -GitVersioning $gitVersion
    