$undefined = 'UNDEFINED'
$isCiServerRdpEnabled = $false

#deploy
$prodDeployTarget = 'PRODUCTION'
$developDeployTarget = 'DEVELOP'
$stagingDeployTarget = 'STAGING'
$localhostDeployTarget = 'LOCALHOST'


#context
$isRunningOnBuildServer = IIf $env:APPVEYOR $true $false
$buildDir = IIf $env:APPVEYOR_BUILD_FOLDER $env:APPVEYOR_BUILD_FOLDER (Get-Location).Path

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
$releaseDir = Join-Path -Path $buildDir -ChildPath 'release'
$artifactsDir = Join-Path -Path $buildDir -ChildPath 'artifacts'
$nugetApiKey = IIf $env:NUGET_API_KEY $env:NUGET_API_KEY  "nuget api key missing"
$nugetUrl = IIf $env:NUGET_URL $env:NUGET_URL "nuget url missing"

#projects
$spaDir = Join-Path -Path $buildDir -ChildPath 'src/spas' 
$distDir = Join-Path -Path $spaDir -ChildPath 'dist'

#environment
$envDeployTarget = $localhostDeployTarget

if ($isRunningOnBuildServer -eq $true) {
    if ($isPullRequest -eq $false -and $prBranchDestination -eq 'master') {
        $envDeployTarget = $prodDeployTarget
    } elseif ($isPullRequest -eq $false -and $prBranchDestination -eq 'develop') {
        $envDeployTarget = $developDeployTarget
    } elseif ($prBranchDestination -match '^release/'-or $prBranchDestination -match '^hotfix/') {
        $envDeployTarget = $stagingDeployTarget
    }
}

#firebase
$firebaseToken = IIf $env:FIREBASE_TOKEN $env:FIREBASE_TOKEN "generate a token using: firebase login:ci"

Write-Output ""
Write-Output "Running on build server: $($isRunningOnBuildServer)"
Write-Output "Deploy target: $($envDeployTarget)"
Write-Output ""

Write-Output "DIRECTORIES:"
Write-Output ""
Write-Output "Build folder: $($buildDir)"
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