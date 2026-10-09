export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6">
      <div className="glass flex flex-col items-center justify-between gap-3 rounded-2xl px-6 py-5 text-sm text-muted sm:flex-row">
        <p className="m-0 font-display text-base uppercase tracking-wide">
          PNW<span className="text-accent">Cams</span>
          <span className="mx-2 text-subtle">·</span>
          <span className="font-sans text-sm normal-case tracking-normal">
            Live conditions across the Pacific Northwest
          </span>
        </p>
        <p className="m-0">
          Powered by{' '}
          <a
            href="http://www.brainbrian.com"
            className="font-medium text-accent-soft no-underline transition-colors hover:text-white"
          >
            brainbrian
          </a>
          <span className="mx-2 text-subtle">•</span>
          <a
            href="https://github.com/brainbrian/pnwcams"
            className="font-medium text-accent-soft no-underline transition-colors hover:text-white"
          >
            Contribute on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
