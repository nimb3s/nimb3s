$undefined = 'UNDEFINED'

#deploy
$prodDeployTarget = 'PRODUCTION'
$developDeployTarget = 'DEVELOP'
$stagingDeployTarget = 'STAGING'
$localhostDeployTarget = 'LOCALHOST'


#context
$platform = IIf $env:PLATFORM  $env:PLATFORM  $localhostDeployTarget
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildFolder = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location)
$currentBranch = (git rev-parse --abbrev-ref HEAD)

#pull request
$isPullRequest = $false
$prCommitId = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT $env:APPVEYOR_PULL_REQUEST_HEAD_COMMIT (git rev-parse --verify HEAD)
$prBranchSource = IIf $env:APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH $env:APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH $undefined
$prBranchDestination = IIf $env:APPVEYOR_REPO_BRANCH $env:APPVEYOR_REPO_BRANCH $undefined

if ($prBranchSource -ne $undefined) {
    $isPullRequest = $true
}

#build meta data
$buildNumber = IIf $env:APPVEYOR_BUILD_NUMBER $env:APPVEYOR_BUILD_NUMBER  '0.0.0'
$buildStartedByTag = IIf $env:APPVEYOR_REPO_TAG $env:APPVEYOR_REPO_TAG $undefined
$buildTagName = IIf $env:APPVEYOR_REPO_TAG_NAME  $env:APPVEYOR_REPO_TAG_NAME  $undefined
$gitVersion = gitversion | ConvertFrom-Json

#release
$releaseDir = Join-Path -Path $buildFolder -ChildPath 'release'
$artifactsDir = Join-Path -Path $buildFolder -ChildPath 'artifacts'

#projects
$spaDir = Join-Path -Path $buildFolder -ChildPath 'src/spas' 
$distDir = Join-Path -Path $spaDir -ChildPath 'dist'

#environment
$envDeployTarget = $localhostDeployTarget

if ($isRunningOnBuildServer -eq $true) {
    if ($prBranchDestination -eq 'master' -or $currentBranch -eq 'master') {
        $envDeployTarget = $prodDeployTarget
    } elseif ($prBranchDestination -eq 'develop' -or $currentBranch -match '^feature/') {
        $envDeployTarget = $developDeployTarget
    } elseif ($prBranchDestination -match '^release/'-or $currentBranch -match '^hotfix/') {
        $envDeployTarget = $stagingDeployTarget
    }
}

Write-Output ""
Write-Output "Platform: $($platform)"
Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Current branch: $($currentBranch)"
Write-Output "Deploy target: $($envDeployTarget)"
Write-Output ""

Write-Output "DIRECTORIES:"
Write-Output ""
Write-Output "Build folder: $($buildFolder)"
Write-Output "Release dir: $($releaseDir)"
Write-Output "Artifacts dir: $($artifactsDir)"
Write-Output "Dist dir: $($distDir)"
Write-Output "SPA Dir: $($spaDir)"
Write-Output ""

Write-Output "PULL REQUEST:"
Write-Output ""
Write-Output "PR is pull request: $($isPullRequest)"
Write-Output "PR Commit ID: $($prCommitId)"
Write-Output "PR branch source: $($prBranchSource)"
Write-Output "PR branch destination: $($prBranchDestination)"
Write-Output ""

Write-Output "BUILD:"
Write-Output ""
Write-Output "Build number: $($buildNumber)"
Write-Output "Build tag name: $($buildTagName)"
Write-Output "Build started by pushed tag name: $($buildStartedByTag)"
Write-Output "Git Version:"
$gitVersion | Select-Object *
Write-Output ""

