Write-Output "******************************************"
Write-Output "SPA Nimb3s: STARTED"
Write-Output "******************************************"

$projectDistDir = Join-Path -Path $distDir -ChildPath "apps/nimb3s/*"
$nuspecFile = Join-Path -Path $buildFolder -ChildPath "release/Nimb3s.Spa.nuspec"
$nuspecTemplae = Join-Path -Path $buildFolder -ChildPath "nuspec.template"
$lastCommitMessage = git log -1 --pretty=%B
$artifactZip = Join-Path -Path $buildFolder -ChildPath "artifacts/Nimb3s.Spa.$($buildNumber).zip"
$artifactNupk = Join-Path -Path $buildFolder -ChildPath "artifacts/Nimb3s.Spa.$($buildNumber).nupk"

Set-Location -Path $spaDir

Write-Output "changed working directory to $($spaDir)"
Write-Output "running npm.v.$(npm -v)"
Write-Output "artifact Zip: $($artifactZip)"
Write-Output "nuspec file: $($nuspecFile)"
Write-Output "project dist: $($projectDistDir)"

npm run build:install 
npm run nimb3s:build:prod

Get-Content ($nuspecTemplae) | ForEach-Object { 
  $_ -replace '@version', $buildVersion `
     -replace "@id", "Nimb3s.Spa" `
     -replace "@releaseNotes", $lastCommitMessage `
     -replace "@description", "Nimb3s Single Page App" `
     -replace "@tags", "angular web spa"
} > $nuspecFile

7z a -sae $artifactZip $projectDistDir
7z a -sae $artifactZip $nuspecFile

Move-Item $artifactZip $artifactNupk -Force

If ($isRunningOnBuildServer -eq $true) {
  Push-AppveyorArtifact $artifactNupk

  #nuget push $artifactNupk -ApiKey $env:NUGET_API_KEY -Source $env:NUGET_URL
}

Write-Output "******************************************"
Write-Output "SPA Nimb3s: ENDED"
Write-Output "******************************************"
Write-Output "";