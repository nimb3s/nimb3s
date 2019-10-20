Write-Output "******************************************"
Write-Output "PRE SCRIPTS: STARTED"
Write-Output "******************************************"
Write-Output "";


# if ($isCiRdpEnabledBeforeBuildStarts -eq $true -and $isCiRdpEnabledBeforeBuildEnds -eq $true) {
#     Write-Output "CI RDP SESSION WILL NOT BE ENABLED!!!: Either enable RDP before build starts or before it ends. Not both" 
# }

if ($isCiRdpEnabledBeforeBuildStarts -eq $true -and $isCiRdpEnabledBeforeBuildEnds -eq $false) {
    Invoke-Expression ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/appveyor/ci/master/scripts/enable-rdp.ps1'))
}

#tools
#########################

#choco
Set-ExecutionPolicy Bypass -Scope Process -Force
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

#nuget command line
choco install nuget.commandline

#gitversion
choco install gitversion.portable --pre -y

#directories
#########################
New-Item -ItemType Directory -Force -Path (Join-Path $buildDir "artifacts")
New-Item -ItemType Directory -Force -Path (Join-Path $buildDir "release")

#build
#########################
if ($isRunningOnBuildServer -eq $true) {
    Update-AppveyorBuild -Version $gitVersion.FullSemVer
}

Write-Output "******************************************"
Write-Output "PRE SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";
