#!/bin/bash

# Start Astro server
echo "Starting Astro development server..."
npx astro dev --host 0.0.0.0 --port 4321 &
ASTRO_PID=$!

# Wait for Astro to start up
sleep 5

# Start Express server
echo "Starting Express API server..."
NODE_ENV=development npx tsx server/index.ts

# If Express exits, kill Astro
kill $ASTRO_PID