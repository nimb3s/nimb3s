

#Set-ExecutionPolicy remoteSigned
$ErrorActionPreference = "Stop";

. Join-Path -Path (Get-Location) -ChildPath $psFuncsScript
. Join-Path -Path (Get-Location) -ChildPath $psVarsScript

. Join-Path -Path (Get-Location) -ChildPath $psBeforeScript

#Get-ChildItem "${psMainDir}\*.ps1" | ForEach-Object {.$_} 
Get-ChildItem -Path (Join-Path (Get-Location).Path ".\build\main") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}

. Join-Path -Path (Get-Location) -ChildPath $psAfterScript