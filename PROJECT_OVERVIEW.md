# Schnee Info - Premium Ski Resort Conditions Platform

A modern, responsive web application for checking ski resort conditions and forecasts. Built with Next.js, React, Tailwind CSS, and Leaflet.

## 🎿 Features

### Core Functionality
- **Smart Search**: Intuitive search interface with auto-suggestions for popular resorts
- **Interactive Map**: Leaflet-powered map showing exact resort location
- **Real-Time Snow Data**: Valley and mountain snow depth with visual indicators
- **5-Day Weather Forecast**: Detailed weather predictions with snowfall probability
- **Live Webcams**: Browse and view live camera feeds from various resort locations
- **Piste Map Viewer**: Interactive piste map with resort statistics
- **Resort Status**: Real-time information on open pistes and operating lifts

### Design Highlights
- **Glassmorphism UI**: Premium, modern design with semi-transparent cards
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Polished transitions and hover effects
- **Professional Typography**: Clean, readable interface with proper visual hierarchy

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 18) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Maps**: Leaflet.js with react-leaflet
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
schnee-info-website/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page with all resort data
│   ├── globals.css            # Global styles and Tailwind directives
│   ├── layout.tsx             # Root layout component
│   └── page.tsx               # Landing page with search
├── components/
│   ├── LiveCams.tsx           # Live webcam viewer component
│   ├── Map.tsx                # Interactive Leaflet map
│   ├── PisteMap.tsx           # Piste map viewer with statistics
│   ├── SnowDepth.tsx          # Snow depth visualization
│   └── WeatherCard.tsx        # Weather forecast component
├── data/
│   └── mockResorts.ts         # Mock resort data (replace with API)
├── public/
│   └── images/                # Static images
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Schnee-Info-Website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔌 API Integration Guide

The application currently uses mock data. To integrate real APIs:

### 1. Weather Data
**Recommended Provider**: OpenWeatherMap

```typescript
// Example implementation in /app/api/weather/route.ts
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
)
```

**Integration Points**:
- `components/WeatherCard.tsx` - Update weather forecast data
- `data/mockResorts.ts` - Replace mock weather data

### 2. Snow Depth Data
**Sources**:
- Resort official APIs (most reliable)
- Snow-forecast.com API
- Web scraping from resort websites

**Integration Points**:
- `components/SnowDepth.tsx` - Update snow depth values
- `data/mockResorts.ts` - Replace mock snow depth

### 3. Live Webcams
**Sources**:
- Feratel.com (European resorts)
- Resort official websites
- Panomax.com, roundshot.com

**Implementation**:
```typescript
// components/LiveCams.tsx already structured to accept URLs
// Update the liveCams array in mockResorts.ts with real URLs
```

### 4. Piste Maps & Status
**Sources**:
- Resort official APIs
- Skiresort.info API
- Bergfex.com API

**Integration Points**:
- `components/PisteMap.tsx` - Update piste status
- `data/mockResorts.ts` - Replace mock statistics

### Example API Route Structure

Create `/app/api/resorts/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const resortId = params.id

  // Fetch data from multiple sources
  const [weatherData, snowData, pisteStatus] = await Promise.all([
    fetchWeatherData(resortId),
    fetchSnowDepth(resortId),
    fetchPisteStatus(resortId),
  ])

  return NextResponse.json({
    id: resortId,
    weather: weatherData,
    snowDepth: snowData,
    stats: pisteStatus,
    // ... other data
  })
}
```

## 🎨 Customization

### Adding New Resorts
Edit `data/mockResorts.ts` and add a new resort object following the `SkiResort` interface.

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles: Use Tailwind utility classes

### Map Customization
In `components/Map.tsx`, you can switch to different tile providers:

```typescript
// Topographic map (better for mountains)
<TileLayer
  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
/>

// Or use Mapbox (requires API key)
<TileLayer
  url="https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}"
/>
```

## 🔐 Environment Variables

Create a `.env.local` file for API keys:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
# Add other API keys as needed
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance Optimizations

- Next.js Image component for optimized images
- Dynamic imports for map component (client-side only)
- Lazy loading of webcam images
- CSS-in-JS with Tailwind for minimal bundle size

## 🚧 Future Enhancements

- [ ] User accounts and favorite resorts
- [ ] Push notifications for snow alerts
- [ ] Historical snow data and trends
- [ ] Comparison tool for multiple resorts
- [ ] Mobile app (React Native)
- [ ] Integration with booking platforms
- [ ] Social sharing features
- [ ] Multi-language support

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

For contribution guidelines, please contact the project maintainer.

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Built with ❄️ by a passionate ski enthusiast and full-stack developer**
