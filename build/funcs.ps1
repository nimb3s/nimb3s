Function IIf($If, $IfTrue, $IfFalse) {
    if ($If) {if ($IfTrue -is 'ScriptBlock') {&$IfTrue} else {$IfTrue}}
    else {if ($IfFalse -is 'ScriptBlock') {&$IfFalse} else {$IfFalse}}
}

function Build-Site(
    $siteName, # "Nimb3s"
    $spaDirecotry, # $spaDir
    $siteRootDirectory, # "apps/nimb3s/*"
    $distDirectory, # 
    $npmInstallScript, # build:install 
    $npmSiteBuildScript # nimb3s:build:prod
) {
    Write-Output "******************************************"
    Write-Output "SPA $($siteName): BUILD STARTED"
    Write-Output "******************************************"

    $projectDistDir = Join-Path -Path $distDirectory -ChildPath $siteRootDirectory
    
    Write-Output "changed working directory to $($spaDirecotry)"
    Write-Output "running npm.v.$(npm -v)"
    Write-Output "project dist: $($projectDistDir)"
    
    Set-Location -Path $spaDirecotry
    
    npm run $npmInstallSCript
    npm run $npmSiteBuildScript
    
    Write-Output "******************************************"
    Write-Output "SPA $($siteName): BUILD ENDED"
    Write-Output "******************************************"
    Write-Output "";
}

function Release-Site(

) {
    Write-Output "";
}

function Deploy-Site() {
    Write-Output "";
}