Add-Type -AssemblyName System.Drawing

$publicDir = "D:\Merazul\Code\gemini\antigravity\converter-app\public"

# 1. Create logo.png (512x512)
$logoBmp = New-Object System.Drawing.Bitmap 512, 512
$gLogo = [System.Drawing.Graphics]::FromImage($logoBmp)
$gLogo.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gLogo.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Background rounded rect simulation
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 37, 99, 235)) # Blue 600
$gLogo.FillRectangle($bgBrush, 0, 0, 512, 512)

# Inner accent circle
$accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 79, 70, 229)) # Indigo 600
$gLogo.FillEllipse($accentBrush, 40, 40, 432, 432)

# Draw Currency Symbol '$'
$font = New-Object System.Drawing.Font ("Arial", 220, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

$rect = New-Object System.Drawing.RectangleF 0, 0, 512, 512
$gLogo.DrawString("$", $font, $whiteBrush, $rect, $sf)

$logoPath = Join-Path $publicDir "logo.png"
$logoBmp.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Png)
$gLogo.Dispose()
$logoBmp.Dispose()
Write-Output "Created logo.png at $logoPath"

# 2. Create og-image.png (1200x630)
$ogBmp = New-Object System.Drawing.Bitmap 1200, 630
$gOg = [System.Drawing.Graphics]::FromImage($ogBmp)
$gOg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gOg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Background dark navy
$darkBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 15, 23, 42)) # Slate 900
$gOg.FillRectangle($darkBrush, 0, 0, 1200, 630)

# Card background
$cardBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 30, 41, 59)) # Slate 800
$gOg.FillRectangle($cardBrush, 80, 80, 1040, 470)

# Brand badge
$badgeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 37, 99, 235))
$gOg.FillRectangle($badgeBrush, 140, 140, 100, 100)

$iconFont = New-Object System.Drawing.Font ("Arial", 50, [System.Drawing.FontStyle]::Bold)
$badgeRect = New-Object System.Drawing.RectangleF 140, 140, 100, 100
$gOg.DrawString("$", $iconFont, $whiteBrush, $badgeRect, $sf)

# Title: CurrenFlow
$titleFont = New-Object System.Drawing.Font ("Arial", 56, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$gOg.DrawString("CurrenFlow", $titleFont, $titleBrush, 260, 150)

# Subtitle / Tagline
$subFont = New-Object System.Drawing.Font ("Arial", 28, [System.Drawing.FontStyle]::Bold)
$blueBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 96, 165, 250)) # Blue 400
$gOg.DrawString("Real-Time Mid-Market Currency Converter", $subFont, $blueBrush, 140, 280)

# Description
$descFont = New-Object System.Drawing.Font ("Arial", 20, [System.Drawing.FontStyle]::Regular)
$grayBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 148, 163, 184)) # Slate 400
$gOg.DrawString("160+ World Currencies • 0% Hidden Bank Fees • Official Central Bank Feeds", $descFont, $grayBrush, 140, 340)

# Bottom URL pill
$pillBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 51, 65, 85)) # Slate 700
$gOg.FillRectangle($pillBrush, 140, 420, 320, 50)
$urlFont = New-Object System.Drawing.Font ("Arial", 18, [System.Drawing.FontStyle]::Bold)
$urlRect = New-Object System.Drawing.RectangleF 140, 420, 320, 50
$gOg.DrawString("www.currenflow.com", $urlFont, $whiteBrush, $urlRect, $sf)

$ogPath = Join-Path $publicDir "og-image.png"
$ogBmp.Save($ogPath, [System.Drawing.Imaging.ImageFormat]::Png)
$gOg.Dispose()
$ogBmp.Dispose()
Write-Output "Created og-image.png at $ogPath"
