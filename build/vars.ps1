#env vars
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildFolder = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location)
$prCommitId = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT (git rev-parse --verify HEAD)
$buildVersion = IIf $env:APPVEYOR_BUILD_VERSION $env:APPVEYOR_BUILD_VERSION  $prCommitId
$buildNumber = IIf $env:APPVEYOR_BUILD_NUMBER $env:APPVEYOR_BUILD_NUMBER  "0.0.0"
$platform = IIf $env:PLATFORM  $env:PLATFORM  "localhost"

#release
$releaseDir = Join-Path -Path $buildFolder -ChildPath "release"
$artifactsDir = Join-Path -Path $buildFolder -ChildPath "artifacts"


#projects
$spaDir = Join-Path -Path $buildFolder -ChildPath "src/spas" 
$distDir = Join-Path -Path $spaDir -ChildPath "dist"

Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Platform: $($platform)"
Write-Output "Build folder: $($buildFolder)"  
Write-Output "PR Commit ID: $($prCommitId)"
Write-Output "SPA Dir: $($spaDir)"
Write-Output "Build number: $($buildNumber)";
Write-Output ""