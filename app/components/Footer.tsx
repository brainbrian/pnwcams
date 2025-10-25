export default function Footer() {
  return (
    <footer className="bg-[#305771] h-[100px] mx-auto max-w-[1024px] relative text-center">
      <h2 className="text-white font-oswald text-xl absolute top-1/2 -translate-y-1/2 w-full uppercase">
        Powered by{' '}
        <a
          href="http://www.brainbrian.com"
          className="text-[#b9e3ff] no-underline hover:text-[#5c717f] transition-colors"
        >
          brainbrian
        </a>{' '}
        • Contribute on{' '}
        <a
          href="https://github.com/brainbrian/pnwcams"
          className="text-[#b9e3ff] no-underline hover:text-[#5c717f] transition-colors"
        >
          GitHub
        </a>
      </h2>
    </footer>
  );
}

