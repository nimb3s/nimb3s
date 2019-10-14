Write-Output "******************************************"
Write-Output "POST SCRIPTS: STARTED"
Write-Output "******************************************"

#enable rdp
$blockRdp = $isCiRdpEnabled;

if($blockRdp) {
    Invoke-Expression ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/appveyor/ci/master/scripts/enable-rdp.ps1'))
}

Write-Output "******************************************"
Write-Output "POST SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";

if ($isRunningOnBuildServer -eq $true) {
    Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff"): Post-Scripts ended" -Category Information
}