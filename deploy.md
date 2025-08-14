# Deployment Guide

## Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Next.js project
6. Click "Deploy"

### Option 2: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Link to existing project? No
   - Project name: aave-vs-banks-dashboard
   - Directory: ./
   - Override settings? No

### Option 3: Manual Upload

1. Build the project:
```bash
npm run build
```

2. Go to [Vercel](https://vercel.com)
3. Drag and drop the entire project folder

## Environment Variables

No environment variables are required for basic functionality. The dashboard works out of the box with fallback data.

## Custom Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

## Performance Optimization

The project includes:
- ✅ Static file optimization
- ✅ Image optimization
- ✅ API route caching
- ✅ Responsive design
- ✅ Error boundaries

## Monitoring

Monitor your deployment:
- Analytics: Automatic with Vercel
- Performance: Built-in Vercel metrics
- Errors: Check Vercel function logs

Your dashboard will be live at: `https://your-project-name.vercel.app`
