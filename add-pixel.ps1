$pixelCode = @'
  <!-- Meta Pixel -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','782427339937813');fbq('track','PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=782427339937813&ev=PageView&noscript=1"/></noscript>
  <!-- End Meta Pixel -->
'@

$files = Get-ChildItem "C:\Users\ckear\clipping-site\*.html"
$files += Get-ChildItem "C:\Users\ckear\clipping-site\blog\*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -notmatch 'fbq\(') {
        $updated = $content -replace '(<head[^>]*>)', "`$1`n$pixelCode"
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.Encoding]::UTF8)
        Write-Host "Added pixel: $($file.Name)"
    } else {
        Write-Host "Already has pixel: $($file.Name)"
    }
}
Write-Host "Done."
