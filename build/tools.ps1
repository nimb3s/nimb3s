Write-Output "******************************************"
Write-Output "INSTALLING TOOLS: STARTED"
Write-Output "******************************************"

#Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

$7zipVersion = Get-Package -ProviderName Programs -IncludeWindowsInstaller | Where-Object Name -like '*7-Zip*' | Where-Object  Version -like "*19.0*"

If($7zipVersion.Version -notlike '*19.00.00.0*') {
    choco install 7zip.install   
}

Write-Output "******************************************"
Write-Output "INSTALLING TOOLS: FINISHED"
Write-Output "******************************************"
Write-Output ""