Write-Output "******************************************"
Write-Output "POST SCRIPTS: STARTED"
Write-Output "******************************************"

#scripts

Write-Output "******************************************"
Write-Output "POST SCRIPTS: ENDED"
Write-Output "******************************************"
Write-Output "";

if ($isRunningOnBuildServer) {
    Add-AppveyorMessage -Message "Post-Scripts ended" -Category Information
}