# MaInsane Automated Vercel Deployment Script
# Uses live verified Vercel authentication token

$VERCEL_TOKEN = "vcp_***"
$PROJECT_DIR = "C:\Users\aakwa\.gemini\antigravity\scratch\mainsane"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "🚀 DEPLOYING MAINSANE TO VERCEL PRODUCTION" -ForegroundColor Green
Write-Host "Zero Mock Data Policy • Web3 Treasury: 0x32C2c16b8821dE40F1d71FB67b050542F87f58F8" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan

Set-Location $PROJECT_DIR

Write-Host "`n1. Verifying Vercel Authentication..." -ForegroundColor DarkCyan
npx vercel whoami --token $VERCEL_TOKEN

Write-Host "`n2. Triggering Vercel Production Build..." -ForegroundColor DarkCyan
npx vercel deploy --prod --yes --token $VERCEL_TOKEN

Write-Host "`n✅ MaInsane Production Deployment Command Finished." -ForegroundColor Green
