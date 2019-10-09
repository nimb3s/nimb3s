Function IIf($If, $IfTrue, $IfFalse) {
    If ($If) {If ($IfTrue -is "ScriptBlock") {&$IfTrue} Else {$IfTrue}}
    Else {If ($IfFalse -is "ScriptBlock") {&$IfFalse} Else {$IfFalse}}
}

Function Get-GitTagName($tagName) {
    if ($null -eq $tagName) {
        throw "Git tag missing! Tag your commit when merging develop to master: $tagName"
    }
    Write-Output "11"
    if ($tagName -match "^v") {
    
        try {
            $tagName -replace "^v", '' | ConvertFrom-String -Delimiter '\.' -PropertyNames Major, Minor, Patch
            return $tagName
        }
        catch {
            throw "Failed to parse Git tag name: $($tagName)"    
        }       
    } else {
        throw "Git tag name must start with 'v.' Example: v1.0.0: $($tagName)"
    }
}