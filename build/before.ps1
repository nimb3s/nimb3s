Write-Output "******************************************"
Write-Output "BEFORE SCRIPTS: STARTED"
Write-Output "******************************************"
Write-Output "";

#tools
Get-ChildItem -Path (Join-Path (Get-Location).Path ".\tools.ps1") -Recurse -File -Force -ErrorAction SilentlyContinue | ForEach-Object {.$_.FullName}
if (-not (test-path "$env:ProgramFiles\7-Zip\7z.exe")) {throw "$env:ProgramFiles\7-Zip\7z.exe needed"} 
set-alias 7z "$env:ProgramFiles\7-Zip\7z.exe"  

Write-Output "******************************************"
Write-Output "BEFORE SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";