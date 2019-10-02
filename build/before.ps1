Write-Output "******************************************"
Write-Output "ENVIRONEMNT VARS:"
Write-Output "******************************************"

Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Build folder: $($buildFolder.Path)"  
Write-Output "PR Commit ID: $($prCommitId)"