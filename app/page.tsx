'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    // set it to snow if we're October - March, otherwise default to surf
    if (currentMonth > 8 || currentMonth < 3) {
      router.push('/snow');
    } else {
      router.push('/surf');
    }
  }, [router]);

  return null;
}
