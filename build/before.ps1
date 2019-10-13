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

#gitversion
choco install gitversion.portable --pre -y

#directories
#########################
New-Item -ItemType Directory -Force -Path (Join-Path $buildFolder "artifacts")
New-Item -ItemType Directory -Force -Path (Join-Path $buildFolder "release")

#build
#########################
if ($isRunningOnBuildServer -eq $true) {
    Update-AppveyorBuild -Version $gitVersion.FullSemVer
}

Write-Output "******************************************"
Write-Output "BEFORE SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";