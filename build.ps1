Function IIf($If, $IfTrue, $IfFalse) {
    If ($If) {If ($IfTrue -is "ScriptBlock") {&$IfTrue} Else {$IfTrue}}
    Else {If ($IfFalse -is "ScriptBlock") {&$IfFalse} Else {$IfFalse}}
}

cd ../..

#env vars
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildFolder = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location)
$prCommitId = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT (git rev-parse --verify HEAD)

Write-Output "******************************************"
Write-Output "ENVIRONEMNT VARS:"
Write-Output "******************************************"

Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Build folder: $($buildFolder.Path)"  
Write-Output "PR Commit ID: $($prCommitId)"

#project paths
$spaDir = Join-Path -Path $buildFolder -ChildPath "src/spas" 

#execute spa build
Write-Output "******************************************"
Write-Output "SPA APP BUILD - Nimb3s:"
Write-Output "******************************************"

Write-Output "Changed working directory to $($spaDir)"
Set-Location -Path $spaDir

Write-Output "running npm.v.$(npm -v)"

npm run nimb3s:build:prod
