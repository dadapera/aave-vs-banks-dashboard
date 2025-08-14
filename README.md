# Aave vs Banks Dashboard

A dynamic dashboard that compares Aave protocol with top U.S. banks by deposit size, featuring real-time data and beautiful visualizations.

![Dashboard Preview](https://i.imgur.com/placeholder.png)

## 🚀 Features

- **Real-time Data**: Fetches live Aave protocol data from DeFiLlama API
- **Bank Rankings**: Displays top U.S. banks by deposit size using Federal Reserve data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Purple gradient design with glass morphism effects
- **Animations**: Smooth animations and hover effects
- **Auto-refresh**: Real-time updates with manual refresh capability
- **Vercel Ready**: Optimized for deployment on Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-optimized
- **APIs**: DeFiLlama (Aave data), Federal Reserve (Bank data)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aave-vs-banks-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 API Endpoints

### `/api/aave`
Fetches Aave protocol data including TVL (Total Value Locked) from DeFiLlama API.

### `/api/banks`
Returns U.S. bank deposit data based on Federal Reserve statistics.

### `/api/dashboard`
Combined endpoint that merges and ranks both Aave and bank data.

## 🚀 Deployment on Vercel

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/aave-vs-banks-dashboard)

### Method 2: Manual Deploy

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to set up your project.

### Environment Variables (Optional)

No environment variables are required for basic functionality. The app works out of the box.

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile**: Optimized table layout with adjusted spacing
- **Tablet**: Balanced view with proper typography scaling
- **Desktop**: Full table view with hover effects and animations

## 🎨 Design Features

- **Purple Gradient Background**: Matches Aave's brand colors
- **Glass Morphism**: Modern translucent table design
- **Smooth Animations**: Staggered fade-in effects for table rows
- **Hover Effects**: Interactive row highlighting
- **Loading States**: Spinner and loading indicators
- **Error Handling**: Graceful error display with retry functionality

## 🔄 Data Sources

- **Aave Data**: Real-time TVL from [DeFiLlama API](https://api.llama.fi)
- **Bank Data**: Based on [Federal Reserve LBR Reports](https://www.federalreserve.gov/releases/lbr/current/)

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
aave-vs-banks-dashboard/
├── app/
│   ├── api/              # API routes
│   │   ├── aave/         # Aave data endpoint
│   │   ├── banks/        # Bank data endpoint
│   │   └── dashboard/    # Combined data endpoint
│   ├── components/       # React components
│   ├── types/           # TypeScript type definitions
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/              # Static assets
├── tailwind.config.js   # Tailwind configuration
├── next.config.js       # Next.js configuration
├── vercel.json          # Vercel deployment config
└── package.json         # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Aave Protocol](https://aave.com/) for the inspiration
- [DeFiLlama](https://defillama.com/) for providing DeFi data
- [Federal Reserve](https://www.federalreserve.gov/) for bank data
- [Vercel](https://vercel.com/) for hosting and deployment platform

## 📞 Support

If you have any questions or need help deploying, please open an issue in the GitHub repository.

---

**Ready to deploy on Vercel!** 🚀
"# aave-vs-banks-dashboard" 
