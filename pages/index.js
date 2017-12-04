import Link from "next/link";

export default () => (
  <main>
    <header>
      <h1>Don't panic!</h1>
    </header>
    <nav>
      <Link href="/earth">
        <a>Earth</a>
      </Link>
    </nav>
  </main>
);
