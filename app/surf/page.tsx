import type { Metadata } from 'next';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';
import data from '../data/surf.json';

export const metadata: Metadata = {
  title: 'Surf Cams - PNW Cams',
  description: 'Live surf webcams across the Pacific Northwest coast',
};

export default function SurfPage() {
  const { links, locations } = data;
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1024px] pt-12 relative">
        <Category links={links} locations={locations} category="surf" />
      </main>
      <Footer />
    </>
  );
}

