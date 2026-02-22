# AgriTech Platform Deployment Guide

## Cloud Deployment (tarim.ailydian.com)

### Prerequisites
- Cloud hosting account with domain `ailydian.com` configured
- Git repository initialized
- Node.js 18+ installed locally

### Step 1: Initialize Git Repository (if not already done)
```bash
cd /Users/lydian/Desktop/agritech-platform
git init
git add .
git commit -m "Initial commit: AgriTech Platform with Drone Management System"
```

### Step 2: Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/agritech-platform.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy via CLI

#### Install Cloud CLI
```bash
npm install -g [cloud-provider-cli]
```

#### Login to Cloud Provider
```bash
[cloud-login-command]
```

#### Deploy
```bash
cd /Users/lydian/Desktop/agritech-platform
[deploy-command] --prod
```

During deployment, configure:
- **Project Name**: `agritech-platform`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Configure Custom Domain

#### Via Cloud Dashboard:
1. Go to cloud provider dashboard
2. Select your project: `agritech-platform`
3. Go to Settings → Domains
4. Add domain: `tarim.ailydian.com`
5. Provider will supply DNS configuration instructions

#### DNS Configuration:
Add the following DNS records to your domain provider:

**For subdomain tarim.ailydian.com:**
```
Type: CNAME
Name: tarim
Value: [cloud-provider-dns]
```

### Dashboard Access Credentials

```
Email: admin@ailydian.com
Password: LydianAgri2025!
```

---

## Post-Deployment Access

- **Main Platform**: https://tarim.ailydian.com/
- **Dashboard**: https://tarim.ailydian.com/tarim-dashboard
- **Drone Management**: Available in Dashboard → Drone Management tab

---

## Key Features Deployed

### 1. Agricultural Marketplace
- 187M acres coverage
- 117,000+ farms network
- Multi-category product listings
- Real-time inventory management
- Secure checkout with Stripe integration
- Bilingual support (TR/EN)

### 2. Drone Management System
- Real-time flight monitoring
- 4 drone fleet management
- NDVI and multispectral sensor data
- Soil moisture monitoring
- NPK level tracking
- Disease and pest detection
- Flight mission planning
- Live data streaming
- Coverage analytics

### 3. Dashboard Features
- Revenue and order tracking
- Customer management
- Product inventory control
- Real-time analytics
- Secure authentication
- Language toggle (TR/EN)

---

## Production Optimizations

The platform is built with:
- Modern build system (3x faster builds)
- Type-safe programming
- Automatic code splitting
- Image optimization
- Font optimization
- Real-time data updates
- Responsive design
- Security headers

---

## Continuous Deployment

Once connected to GitHub, the platform will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run build checks before deployment

---

## Support & Troubleshooting

### Build Locally
```bash
npm run build
```

### Check Type Safety
```bash
npx tsc --noEmit
```

### Clear Cache
```bash
rm -rf .next && npm run build
```

---

**Platform Version**: 1.0.0
**Domain**: tarim.ailydian.com
