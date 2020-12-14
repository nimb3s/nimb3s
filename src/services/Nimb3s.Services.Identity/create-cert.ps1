$cert = New-SelfSignedCertificate -DnsName "www.nimb3s.com", "www.nimb3s.com" `
    -CertStoreLocation "Cert:\LocalMachine\My" `
    -Provider "Microsoft Strong Cryptographic Provider" `
    -HashAlgorithm "SHA256" `
    -KeyAlgorithm RSA `
    -KeyLength 2048 `
    -NotAfter (Get-Date).AddYears(100)

$secPassword = ConvertTo-SecureString -String 'password1' -Force -AsPlainText
$certPath = "Cert:\LocalMachine\My\$($cert.Thumbprint)"

Export-PfxCertificate -Cert $certPath -FilePath C:\git\nimb3s\src\services\Nimb3s.Services.Identity\identity.pfx -Password $secPassword