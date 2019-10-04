Write-Output "******************************************"
Write-Output "SPA Nimb3s: BUILD STARTED"
Write-Output "******************************************"

#vars
$projectDistDir = Join-Path -Path $distDir -ChildPath "apps/nimb3s/*"

#release
$nuspecFile = Join-Path -Path $buildFolder -ChildPath "release/Nimb3s.Spa.nuspec"
$nuspecTemplate = Join-Path -Path $buildFolder -ChildPath "nuspec.template"
$lastCommitMessage = git log -1 --pretty=%B

$nimb3sNugetPackageId = IIf $env:NIMB3S_NUGET_PACKAGE_ID $env:NIMB3S_NUGET_PACKAGE_ID "Nimb3s.Spa"
$nimb3sNugetDescription = IIf $env:NIMB3S_NUGET_DESCRIPTION $env:NIMB3S_NUGET_DESCRIPTION  "Nimb3s Single Page App"
$nimb3sNugetTags = IIf $env:NIMB3S_NUGET_TAGS $env:NIMB3S_NUGET_TAGS  "nimb3s angular web spa"
$artifactNupkg = Join-Path -Path $buildFolder -ChildPath "artifacts/$($nimb3sNugetPackageId).$($buildVersion).nupkg"

Write-Output "changed working directory to $($spaDir)"
Write-Output "running npm.v.$(npm -v)"
Write-Output "project dist: $($projectDistDir)"

Set-Location -Path $spaDir

npm run build:install 
npm run nimb3s:build:prod

Write-Output "******************************************"
Write-Output "SPA Nimb3s: BUILD ENDED"
Write-Output "******************************************"
Write-Output "";

Write-Output "******************************************"
Write-Output "SPA Nimb3s: RELEASE STARTED"
Write-Output "******************************************"
Write-Output "";
Write-Output "nusepc template: $($nuspecTemplate)"
Write-Output "nuspec file: $($lastCommitMessage)"

Set-Location -Path $buildFolder

Get-Content ($nuspecTemplate) | ForEach-Object { 
  $_ -replace '@version', $buildNumber `
     -replace "@id", "$($nimb3sNugetPackageId)" `
     -replace "@releaseNotes", $lastCommitMessage `
     -replace "@description", "$($nimb3sNugetDescription)" `
     -replace "@tags", "$($nimb3sNugetTags)" `
     -replace "@files", `
     '
      <file src="..\src\spas\dist\apps\nimb3s\**\*" target="dist" />
     '
} > $nuspecFile

nuget pac (Join-path -Path $releaseDir -ChildPath "$($nimb3sNugetPackageId).nuspec") -OutputDirectory $artifactsDir

If ($isRunningOnBuildServer -eq $true) {
  Push-AppveyorArtifact $artifactNupkg

  nuget push $artifactNupkg -ApiKey $env:NUGET_API_KEY -Source $env:NUGET_URL
}

Write-Output "******************************************"
Write-Output "SPA Nimb3s: RELEASE ENDED"
Write-Output "******************************************"
Write-Output "";

Write-Output "******************************************"
Write-Output "SPA Nimb3s: DEPLOY STARTED"
Write-Output "******************************************"
Write-Output "";

Write-Output "******************************************"
Write-Output "SPA Nimb3s: DEPLOY ENDED"
Write-Output "******************************************"
Write-Output "";
