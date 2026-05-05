$files = Get-ChildItem "C:\Users\ckear\clipping-site\*.html" + (Get-ChildItem "C:\Users\ckear\clipping-site\blog\*.html") | Where-Object { $_.Name -ne 'index.html' }
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    # Add Discord link if footer-socials exists but no discord.gg link in the socials section
    if ($content -match 'footer-socials' -and $content -notmatch 'discord\.gg/HsKPHU33cU.*social-link|social-link.*discord\.gg/HsKPHU33cU') {
        # Find YouTube social link and add Discord after it
        $updated = $content -replace '(<a href="#" class="social-link">YouTube</a>)', '$1
        <a href="https://discord.gg/HsKPHU33cU" class="social-link" target="_blank" rel="noopener">Discord</a>'
        if ($updated -ne $content) {
            [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.Encoding]::UTF8)
            Write-Host "Fixed footer Discord: $($file.Name)"
        }
    }
}
Write-Host "Done."
