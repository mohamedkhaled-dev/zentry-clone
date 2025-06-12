# optimize-videos.ps1
Write-Host "Video Optimization Script" -ForegroundColor Green
Write-Host "This creates NEW files and keeps your originals safe!" -ForegroundColor Yellow

# Create optimized directory if it doesn't exist
$optimizedDir = "public\videos\optimized"
if (!(Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir
    Write-Host "Created optimized directory" -ForegroundColor Green
}

# Function to optimize a single video
function Optimize-Video {
    param (
        [string]$inputFile,
        [string]$outputFile,
        [string]$quality,
        [string]$scale
    )
    
    Write-Host "Processing: $inputFile" -ForegroundColor Cyan
    
    # Create MP4 version
    $mp4Output = $outputFile -replace '\.[^.]+$', '.mp4'
    ffmpeg -i $inputFile -c:v libx264 -preset slow -crf $quality -vf "scale=$scale" -c:a aac -b:a 128k -movflags +faststart -y $mp4Output
    
    # Create WebM version
    $webmOutput = $outputFile -replace '\.[^.]+$', '.webm'
    ffmpeg -i $inputFile -c:v libvpx-vp9 -crf ($quality + 5) -b:v 0 -vf "scale=$scale" -c:a libopus -b:a 128k -y $webmOutput
    
    # Create poster image
    $posterOutput = $outputFile -replace '\.[^.]+$', '-poster.jpg'
    ffmpeg -i $inputFile -ss 00:00:01 -vframes 1 -q:v 2 -y $posterOutput
    
    Write-Host "Created: $mp4Output, $webmOutput, $posterOutput" -ForegroundColor Green
}

# Process Hero Videos (higher quality)
Write-Host "`nOptimizing Hero Videos..." -ForegroundColor Yellow
$heroVideos = Get-ChildItem "public\videos\original\hero-*.mp4"
foreach ($video in $heroVideos) {
    $outputName = Join-Path $optimizedDir $video.Name
    Optimize-Video -inputFile $video.FullName -outputFile $outputName -quality 23 -scale "-2:1080"
}

# Process Feature Videos (balanced quality)
Write-Host "`nOptimizing Feature Videos..." -ForegroundColor Yellow
$featureVideos = Get-ChildItem "public\videos\original\feature-*.mp4"
foreach ($video in $featureVideos) {
    $outputName = Join-Path $optimizedDir $video.Name
    Optimize-Video -inputFile $video.FullName -outputFile $outputName -quality 28 -scale "-2:720"
}

Write-Host "`nOptimization Complete!" -ForegroundColor Green
Write-Host "Original videos are safe in: public\videos\original" -ForegroundColor Yellow
Write-Host "Optimized videos are in: public\videos\optimized" -ForegroundColor Yellow