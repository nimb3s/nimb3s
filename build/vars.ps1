$developBranchPrefix = "-rc"
$masterBranchPrefix = ""
#env vars
$platform = IIf $env:PLATFORM  $env:PLATFORM  "localhost"
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildFolder = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location)

$prCommitId = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT (git rev-parse --verify HEAD)

$prBranchSource = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH $env:APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH 'UNKNOWN'
$prBranchDestination = IIf $env:APPVEYOR_REPO_BRANCH $env:APPVEYOR_REPO_BRANCH 'UNKNOWN'
$buildVersion = IIf $env:APPVEYOR_BUILD_VERSION $env:APPVEYOR_BUILD_VERSION  $prCommitId
$buildTagName = IIf $env:APPVEYOR_REPO_TAG_NAME  $env:APPVEYOR_REPO_TAG_NAME  'UNKNOWN'

#determine master build version
if ($prBranchSource -eq 'develop' -and $prBranchDestination -eq "master") {
    $currentGitTag = Get-GitTagName $buildTagName
} elseif ($prBranchSource -match "^feature/") {
    $ErrorActionPreference = "SilentlyContinue";
    $previousGitTag = Get-GitTagName (git describe --abbrev=0 --tags $(git rev-list --tags --skip=1 --max-count=1))   
    $ErrorActionPreference = "Stop";

    if ($null -ne $previousGitTag) {
        if([int]$currentGitTag.Major -gt [int]$previousGitTag.Major) {
            Write-Output "wetf"
        }
    }
}

if ($prBranchDestination -match 'develop') {
    $buildVersion = "$($prCommitId)-rc"
} elseif ($prBranchDestination -match 'master') {
    if ($null -eq $buildTagName) {
        throw ""
        $host.SetShouldExit(1)
    }
} 

$buildNumber = IIf $env:APPVEYOR_BUILD_NUMBER $env:APPVEYOR_BUILD_NUMBER  "0.0.0"

#release
$releaseDir = Join-Path -Path $buildFolder -ChildPath "release"
$artifactsDir = Join-Path -Path $buildFolder -ChildPath "artifacts"

#projects
$spaDir = Join-Path -Path $buildFolder -ChildPath "src/spas" 
$distDir = Join-Path -Path $spaDir -ChildPath "dist"

Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Platform: $($platform)"
Write-Output "Build folder: $($buildFolder)"
Write-Output "Release dir: $($releaseDir)"
Write-Output "Artifacts dir: $($artifactsDir)"
Write-Output "Dist dir: $($distDir)"
Write-Output "SPA Dir: $($spaDir)"
Write-Output "PR Commit ID: $($prCommitId)"
Write-Output "PR branch source: $($prBranchSource)"
Write-Output "PR branch destination: $($prBranchDestination)"
Write-Output "Build number: $($buildNumber)"
Write-Output "Build version: $($buildVersion)"
Write-Output "Build tag name: $($buildTagName)"
Write-Output "Develop prefix: $($developBranchPrefix)"
Write-Output "Master prefix: $($masterBranchPrefix)"
