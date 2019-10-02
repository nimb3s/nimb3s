#env vars
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildFolder = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location)
$prCommitId = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT (git rev-parse --verify HEAD)

#scripts
$psMainDir = Join-Path -Path $buildFolder -ChildPath ".\build\main"
$psFuncsScript = ".\build\funcs.ps1"
$psVarsScript = ".\build\vars.ps1"
$psBeforeScript = ".\build\before.ps1"
$psAfterScript = ".\build\after.ps1"

#projects
$spaDir = Join-Path -Path $buildFolder -ChildPath "src/spas" 

Write-Output "******************************************"
Write-Output "ENVIRONEMNT VARS:"
Write-Output "******************************************"

Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Build folder: $($buildFolder.Path)"  
Write-Output "PR Commit ID: $($prCommitId)"