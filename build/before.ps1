Write-Output "******************************************"
Write-Output "BEFORE SCRIPTS: STARTED"
Write-Output "******************************************"
Write-Output "";

#tools
#########################

#choco
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

#nuget command line
choco install nuget.commandline

#directories
#########################
New-Item -ItemType Directory -Force -Path (Join-Path $buildFolder "artifacts")
New-Item -ItemType Directory -Force -Path (Join-Path $buildFolder "release")

Write-Output "******************************************"
Write-Output "BEFORE SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";