#!/bin/bash

# Create temporary directory
mkdir -p temp_footer
cd temp_footer

# Clone only CSS file from repository
curl -O https://raw.githubusercontent.com/12bases/components/main/Footer/Footer.css

# Move file to correct location
mkdir -p ../src/components/layout/Footer
mv Footer.css ../src/components/layout/Footer/

# Clean up
cd ..
rm -rf temp_footer

echo "Footer CSS successfully pulled from GitHub"
