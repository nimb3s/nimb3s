Write-Output "******************************************"
Write-Output "BUILD: STARTED"
Write-Output "******************************************"

#Set-ExecutionPolicy remoteSigned
$ErrorActionPreference = "Continue";

Get-ChildItem -Path (Join-Path (Get-Location).Path ".\build\funcs.ps1") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}
Get-ChildItem -Path (Join-Path (Get-Location).Path ".\build\vars.ps1") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}

Get-ChildItem -Path (Join-Path (Get-Location).Path ".\build\before.ps1") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}
Get-ChildItem -Path (Join-Path (Get-Location).Path ".\build\main") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}
Get-ChildItem -Path (Join-Path (Get-Location).Path ".\build\after.ps1") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}

Write-Output "******************************************"
Write-Output "BUILD: FINISHED"
Write-Output "******************************************"