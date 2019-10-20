$appName = "JwAdmin"
$friendlyAppName = "SPA $($appName)"
$nugetPackageId = "$($appName).Spa"

Build-AngularApp `
    -FriendlyAppName $friendlyAppName `
    -SpaDirecotry $spaDir `
    -SiteRootDirectory "apps/$($appName.ToLower())/*" `
    -DistDirectory $distDir `
    -NpmInstallScript "build:install" `
    -NpmSiteBuildScript "build:$($appName.ToLower())"

$artifactName = Publish-ReleasePackage `
    -FriendlyAppName $friendlyAppName `
    -BuildDirectory $buildDir `
    -NugetPackageId $nugetPackageId `
    -NugetPackageDescription "$($appName) Single Page App" `
    -NugetTags "nimb3s jwadmin angular web spa" `
    -NugetFileTargets @( ,("<file src=`"..\src\spas\dist\apps\$($appName.ToLower())\**\*`" target=`"dist`" />")) `
    -ArtifactsDirectory $artifactsDir `
    -ReleaseDirectory $releaseDir `
    -IsRunningOnBuildServer $isRunningOnBuildServer `
    -NugetApiKey $nugetApiKey`
    -NugetUrl $nugetUrl
    
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
    -TargetDefault "default-$($appName.ToLower())" `
    -TargetStage "stage-$($appName.ToLower())" `
    -TargetProd "prod-$($appName.ToLower())"