import type { Metadata } from 'next';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';
import data from '../data/snow.json';

export const metadata: Metadata = {
  title: 'Snow Cams - PNW Cams',
  description: 'Live snow webcams across Pacific Northwest ski resorts and mountains',
};

export default function SnowPage() {
  const { links, locations } = data;
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <Category links={links} locations={locations} category="snow" />
      </main>
      <Footer />
    </>
  );
}

