#!/bin/bash

# Script to test static build locally
# This script serves the static export using a simple HTTP server

set -e  # Exit on error

echo "🧪 Testing static build..."

# Check if out directory exists
if [ ! -d "out" ]; then
  echo "❌ Error: 'out' directory not found."
  echo "   Please run 'npm run build:static' first to build the static export."
  exit 1
fi

echo "✅ Found 'out' directory"
echo ""

# Check if Python is available (for simple HTTP server)
if command -v py &> /dev/null; then
  echo "🚀 Starting local server on http://localhost:3000"
  echo "   Press Ctrl+C to stop the server"
  echo ""
  cd out
  py -m http.server 3000
elif command -v py &> /dev/null; then
  echo "🚀 Starting local server on http://localhost:3000"
  echo "   Press Ctrl+C to stop the server"
  echo ""
  cd out
  py -m SimpleHTTPServer 3000
elif command -v npx &> /dev/null; then
  echo "🚀 Starting local server on http://localhost:3000"
  echo "   Press Ctrl+C to stop the server"
  echo ""
  cd out
  npx serve -p 3000
else
  echo "❌ Error: No HTTP server found."
  echo "   Please install Python or use 'npx serve' to test the static build."
  exit 1
fi
