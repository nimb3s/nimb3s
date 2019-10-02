#env vars
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildFolder = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location)
$prCommitId = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT (git rev-parse --verify HEAD)

#projects
$spaDir = Join-Path -Path $buildFolder -ChildPath "src/spas" 

Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Build folder: $($buildFolder)"  
Write-Output "PR Commit ID: $($prCommitId)"
Write-Output "SPA Dir: $($spaDir)"