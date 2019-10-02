Write-Output "******************************************"
Write-Output "SPA Nimb3s: STARTED"
Write-Output "******************************************"

Set-Location -Path $spaDir

Write-Output "Changed working directory to $($spaDir)"
Write-Output "running npm.v.$(npm -v)"

npm run build:install 
npm run nimb3s:build:prod

Write-Output "******************************************"
Write-Output "SPA Nimb3s: ENDED"
Write-Output "******************************************"
Write-Output "";