import { Link } from "../src/routes";

export default () => (
  <main>
    <header>
      <h1>Don't panic!</h1>
    </header>
    <nav>
      <h1>Index</h1>
      <h2>Planets</h2>
      <ul>
        <li>
          <Link href="/earth">Earth</Link>
        </li>
      </ul>
      <h2>Races</h2>
      <ul>
        <li>
          <Link route="race" params={{ name: "Humans" }}>
            Humans
          </Link>
        </li>
        <li>
          <Link route="race" params={{ name: "Krikkiters" }}>
            Krikkiters
          </Link>
        </li>
        <li>
          <Link route="race" params={{ name: "Vogons" }}>
            Vogons
          </Link>
        </li>
      </ul>
    </nav>
  </main>
);
