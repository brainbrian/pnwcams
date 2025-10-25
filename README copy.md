# PNW Cams - Next.js v16

Live webcams for surf and snow conditions across the Pacific Northwest.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## Features

- 🏄 **Surf Cams**: Live webcams from BC to Oregon coast
- ⛷️ **Snow Cams**: Live webcams from PNW ski resorts and mountains
- 🌡️ **Weather Data**: Real-time weather conditions for each location
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Built with Tailwind CSS
- ⚡ **Fast Performance**: Next.js App Router with TypeScript

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

The app will automatically redirect to `/surf` or `/snow` based on the current month:
- October - March → Snow Cams
- April - September → Surf Cams

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/
│   └── weather/          # Weather API proxy routes
│       ├── surf/
│       └── snow/
├── components/           # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Camera.tsx
│   ├── Cameras.tsx      # Scroll-snap carousel
│   ├── TitleCard.tsx
│   ├── TitleCardLinks.tsx
│   ├── Location.tsx
│   └── Category.tsx
├── data/                 # JSON data files
│   ├── surf.json
│   └── snow.json
├── hooks/                # Custom React hooks
│   └── useWeather.ts
├── lib/                  # Utility functions
│   └── utils.ts
├── types/                # TypeScript type definitions
│   └── index.ts
├── surf/                 # Surf page
│   └── page.tsx
├── snow/                 # Snow page
│   └── page.tsx
├── layout.tsx            # Root layout
├── page.tsx              # Home (redirect)
└── globals.css           # Global styles
```

## Technologies

- **Next.js 16**: App Router, API Routes, Server Components
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **React 19**: Latest React features

## Weather APIs

- **Surf**: OpenWeatherMap API (proxied through Next.js API routes)
- **Snow**: NOAA/forecast.weather.gov API (proxied through Next.js API routes)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Credits

Built by [brainbrian](http://www.brainbrian.com)

See [MIGRATION.md](./MIGRATION.md) for details on the Gatsby to Next.js migration.
