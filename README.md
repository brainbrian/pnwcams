# PNW Cams

![Vercel](https://vercelbadge.vercel.app/api/brainbrian/pnwcams)

Live webcams for surf and snow conditions across the Pacific Northwest.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

I built this site as a tool for myself to see webcams around the Pacific Northwest that I check on a regular basis. I hope you find it useful.

– [Brian](http://www.brainbrian.com)

## Features

- 🏄 **Surf Cams**: Live webcams from BC to Oregon coast
- ⛷️ **Snow Cams**: Live webcams from PNW ski resorts and mountains
- 🌡️ **Weather Data**: Real-time weather conditions for each location
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Built with Tailwind CSS
- ⚡ **Fast Performance**: Next.js App Router with TypeScript

## 🚀 Quick Start

1.  **Clone the repo**

2.  **Install dependencies**

    ```shell
    cd pnwcams/
    npm install
    ```

3.  **Start development server**

    ```shell
    npm run dev
    ```

    Site is now running at http://localhost:3000

    The app will automatically redirect to `/surf` or `/snow` based on the current month:
    - October - March → Snow Cams
    - April - September → Surf Cams

4.  **Build for production**

    ```shell
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
- **React 19**: Latest React features
- **TypeScript**: Type-safe code
- **Tailwind CSS 4**: Utility-first styling

## Weather APIs

- **Surf**: OpenWeatherMap API (proxied through Next.js API routes)
- **Snow**: NOAA/forecast.weather.gov API (proxied through Next.js API routes)

## Deployment

Deployed on Vercel with automatic deployments from the main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
