$files = Get-ChildItem "C:\Users\ckear\clipping-site\*.html" | Where-Object { $_.Name -ne 'index.html' }
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $updated = $content -replace 'href="/logo\.png"', 'href="logo.png"'
    if ($updated -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed: $($file.Name)"
    }
}
Write-Host "Done."
