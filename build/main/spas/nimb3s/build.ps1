Write-Output "******************************************"
Write-Output "SPA Nimb3s: BUILD STARTED"
Write-Output "******************************************"

$projectDistDir = Join-Path -Path $distDir -ChildPath "apps/nimb3s/*"

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

$nuspecFile = Join-Path -Path $buildFolder -ChildPath "release/Nimb3s.Spa.nuspec"
$nuspecTemplate = Join-Path -Path $buildFolder -ChildPath "nuspec.template"
$lastCommitMessage = git log -1 --pretty=%B
$nimb3sSpaNugetPackageId = IIf $env:NIMB3S_NUGET_PACKAGE_ID $env:NIMB3S_NUGET_PACKAGE_ID "Nimb3s.Spa"
$nimb3sSpaNugetDescription = IIf $env:NIMB3S_NUGET_DESCRIPTION $env:NIMB3S_NUGET_DESCRIPTION  "Nimb3s Single Page App"
$nimb3sSpaNugetTags = IIf $env:NIMB3S_NUGET_TAGS $env:NIMB3S_NUGET_TAGS  "nimb3s angular web spa"
$nimb3sSpaArtifactName = "$($nimb3sSpaNugetPackageId).$($gitVersion.NuGetVersionV2)-$($gitVersion.CommitsSinceVersionSource)"
$artifactNupkg = Join-Path -Path $buildFolder -ChildPath "artifacts/$($nimb3sSpaArtifactName).nupkg"

Write-Output "nusepc template: $($nuspecTemplate)"
Write-Output "nuspec file: $($lastCommitMessage)"

Set-Location -Path $buildFolder

Get-Content ($nuspecTemplate) | ForEach-Object { 
  $_ -replace '@version', -join($gitVersion.NuGetVersionV2, "-", $gitVersion.CommitsSinceVersionSource) `
     -replace "@id", "$($nimb3sSpaNugetPackageId)" `
     -replace "@releaseNotes", $lastCommitMessage `
     -replace "@description", "$($nimb3sSpaNugetDescription)" `
     -replace "@tags", "$($nimb3sSpaNugetTags)" `
     -replace "@files", `
     '
      <file src="..\src\spas\dist\apps\nimb3s\**\*" target="dist" />
     '
} > $nuspecFile

nuget pac (Join-path -Path $releaseDir -ChildPath "$($nimb3sSpaNugetPackageId).nuspec") -OutputDirectory $artifactsDir

if ($isRunningOnBuildServer -eq $true) {
  Push-AppveyorArtifact $artifactNupkg
  Write-Output "trigger new build "
  Write-Output "nuget push $($artifactNupkg) -ApiKey $($env:NUGET_API_KEY) -Source $($env:NUGET_URL)"

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

if ($envDeployTarget -eq $localhostDeployTarget) {
  Write-Output "DEPLOY SKIPPED!!!";
  Write-Output "";

  if ($isRunningOnBuildServer) {
    Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff  K"): Release/Deployed ended: $($nimb3sSpaArtifactName)" -Category Information
  }
  return;
}

$firebaseToken = IIf $env:FIREBASE_TOKEN $env:FIREBASE_TOKEN "generate a token using: firebase login:ci"

Set-Location -Path $spaDir

npm run build:firebase

if ($envDeployTarget -eq $developDeployTarget) {
  firebase use default
} elseif ($envDeployTarget -eq $stagingDeployTarget) {
  firebase use stage
} elseif ($envDeployTarget -eq $prodDeployTarget) {
  firebase use prod
}

firebase deploy --only hosting:nimb3s --message "$($nimb3sSpaNugetPackageId).$($gitVersion.InformationalVersion)" --token $firebaseToken

Write-Output "******************************************"
Write-Output "SPA Nimb3s: DEPLOY ENDED"
Write-Output "******************************************"
Write-Output "";

if ($isRunningOnBuildServer) {
  Add-AppveyorMessage -Message "$(get-date -format "MM/dd/yyy HH:mm:ss.ffff  K"): Release/Deployed ended: $($nimb3sSpaArtifactName)" -Category Information
}