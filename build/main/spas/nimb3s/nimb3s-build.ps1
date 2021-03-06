$appName = "Nimb3s"
$friendlyAppName = "SPA $($appName)"
$nugetPackageId = "$($appName).Spa"

Build-AngularApp `
    -FriendlyAppName $friendlyAppName `
    -SpaDirecotry $spaDir `
    -SiteRootDirectory "apps/$($appName.ToLower())/*" `
    -DistDirectory $distDir `
    -NpmInstallScript "build:install" `
    -NpmSiteBuildScript "build:$($appName.ToLower())"

Publish-ReleasePackage `
    -FriendlyAppName $friendlyAppName `
    -BuildDirectory $buildDir `
    -NugetPackageId $nugetPackageId `
    -NugetPackageDescription "$($appName) Single Page App" `
    -NugetTags "nimb3s angular web spa" `
    -NugetFileTargets @( ,("<file src=`"..\src\spas\dist\apps\$($appName.ToLower())\**\*`" target=`"dist`" />")) `
    -ArtifactsDirectory $artifactsDir `
    -ReleaseDirectory $releaseDir `
    -IsRunningOnBuildServer $isRunningOnBuildServer `
    -NugetApiKey $nugetApiKey `
    -NugetUrl $nugetUrl `
    -GitVersion $gitVersion
    
Publish-FirebaseSite `
    -AppName $appName `
    -BuildDirectory $buildDir `
    -DeployTarget $envDeployTarget `
    -LocalDeployTarget $localhostDeployTarget `
    -IsRunningOnBuildServer $isRunningOnBuildServer `
    -ArtifactName $artifactName `
    -FirebaseToken $firebaseToken `
    -NugetPackageId $nugetPackgeId `
    -GitVersion $gitVersion `
    -TargetDefault "default" `
    -TargetStage "stage" `
    -TargetProd "prod"