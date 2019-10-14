Write-Output "******************************************"
Write-Output "INSTALLING TOOLS: STARTED"
Write-Output "******************************************"

Set-ExecutionPolicy Bypass -Scope Process -Force;
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

Write-Output "******************************************"
Write-Output "INSTALLING TOOLS: FINISHED"
Write-Output "******************************************"
Write-Output ""

if ($isRunningOnBuildServer -eq $true) {
    Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): Tools installed" -Category Information
}