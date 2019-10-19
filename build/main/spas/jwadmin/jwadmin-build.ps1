$appName = "JwAdmin"
$friendlyAppName = "SPA $($appName)"
$nugetPackageId = "$($appName).Spa"

Build-AngularApp -FriendlyAppName $friendlyAppName `
    -SpaDirecotry $spaDir `
    -SiteRootDirectory "apps/$($appName.ToLower())/*" `
    -DistDirectory $distDir `
    -NpmInstallScript "build:install" `
    -NpmSiteBuildScript "build:$($appName.ToLower())"

$artifactName = Publish-ReleasePackage -FriendlyAppName $friendlyAppName `
    -BuildDirectory $buildDir `
    -NugetPackageId $nugetPackageId `
    -NugetPackageDescription "$($appName) Single Page App" `
    -NugetTags "nimb3s angular web spa" `
    -NugetFileTargets @( ,("<file src=`"..\src\spas\dist\apps\$($appName.ToLower())\**\*`" target=`"dist`" />")) `
    -ArtifactsDirectory $artifactsDir `
    -ReleaseDirectory $releaseDir `
    -IsRunningOnBuildServer $isRunningOnBuildServer `
    -NugetApiKey (IIf $env:NUGET_API_KEY $env:NUGET_API_KEY  "nuget api key missing") `
    -NugetUrl (IIf $env:NUGET_URL $env:NUGET_URL "nuget url missing")
    
Publish-FirebaseSite -FriendlyAppName $friendlyAppName `
    -BuildDirectory $buildDir `
    -DeployTarget $envDeployTarget `
    -LocalDeployTarget $localhostDeployTarget `
    -ArtifactName $artifactName `
    -FirebaseToken (IIf $env:FIREBASE_TOKEN $env:FIREBASE_TOKEN "generate a token using: firebase login:ci") `
    -NugetPackageId $nugetPackgeId `
    -GitVersion $gitVersion