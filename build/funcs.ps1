Function IIf($If, $IfTrue, $IfFalse) {
    if ($If) {if ($IfTrue -is 'ScriptBlock') {&$IfTrue} else {$IfTrue}}
    else {if ($IfFalse -is 'ScriptBlock') {&$IfFalse} else {$IfFalse}}
}
