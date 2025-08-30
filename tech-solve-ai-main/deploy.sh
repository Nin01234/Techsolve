#!/bin/bash

# Deploy to Vercel with environment variables
echo "🚀 Deploying TechSolve AI to Vercel..."

# Set environment variables for Vercel
vercel --env VITE_SUPABASE_URL="https://nzbmhmiozzjzbthdavor.supabase.co" \
       --env VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56Ym1obWlvenpqemJ0aGRhdm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI5NzAsImV4cCI6MjA1MDU0ODk3MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8" \
       --env EMAILJS_SERVICE_ID="service_p1ybkk9" \
       --env EMAILJS_TEMPLATE_ID="template_nrv18sr" \
       --env EMAILJS_PUBLIC_KEY="WfRtj_M_7WpdBFasC" \
       --prod

echo "✅ Deployment completed!"
