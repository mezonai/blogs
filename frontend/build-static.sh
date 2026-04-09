#!/bin/bash

# Script to build static export for Next.js
# This script builds the Next.js app and exports it as static files

set -e  # Exit on error

echo "🚀 Starting static build process..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "⚠️  Warning: .env file not found. Make sure NEXT_PUBLIC_API_URL is set."
  echo "   You can create .env file with: NEXT_PUBLIC_API_URL=http://localhost:1337"
fi

# Check if NEXT_PUBLIC_API_URL is set
if [ -z "$NEXT_PUBLIC_API_URL" ] && [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

if [ -z "$NEXT_PUBLIC_API_URL" ]; then
  echo "❌ Error: NEXT_PUBLIC_API_URL environment variable is not set."
  echo "   Please set it in .env file or export it before running this script."
  exit 1
fi

echo "✅ Using API URL: $NEXT_PUBLIC_API_URL"
echo ""

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf out

# Build the static export
echo "📦 Building static export..."
npm run build

# Check if build was successful
if [ -d "out" ]; then
  echo ""
  echo "✅ Static build completed successfully!"
  echo "📁 Static files are in the 'out' directory"
  echo ""
  echo "You can now:"
  echo "  - Test locally: npm run test:static"
  echo "  - Deploy the 'out' directory to any static hosting service"
  echo ""
else
  echo "❌ Build failed - 'out' directory was not created"
  exit 1
fi
