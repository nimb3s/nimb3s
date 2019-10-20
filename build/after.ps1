Write-Output "******************************************"
Write-Output "POST SCRIPTS: STARTED"
Write-Output "******************************************"

#enable rdp
if($isCiRdpEnabledBeforeBuildEnds -eq $true -and $isCiRdpEnabledBeforeBuildStarts -eq $false) {
    $blockRdp = $isCiRdpEnabledBeforeBuildEnds;
    Invoke-Expression ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/appveyor/ci/master/scripts/enable-rdp.ps1'))
}

Write-Output "******************************************"
Write-Output "POST SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";
