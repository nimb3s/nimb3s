Write-Output "******************************************"
Write-Output "SPA APP BUILD - Nimb3s:"
Write-Output "******************************************"

Set-Location -Path $spaDir

Write-Output "Changed working directory to $($spaDir)"
Write-Output "running npm.v.$(npm -v)"

npm run nimb3s:build:prod