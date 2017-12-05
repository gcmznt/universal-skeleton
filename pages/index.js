import { Link } from "../src/routes";
import withData from "../lib/apollo";
import RaceList from "../components/RaceList";

export default withData(() => (
  <main>
    <header>
      <h1>Don't panic!</h1>
    </header>
    <nav>
      <h1>Index</h1>
      <h2>Planets</h2>
      <ul>
        <li>
          <Link href="/earth">
            <a>Earth</a>
          </Link>
        </li>
      </ul>
      <h2>Races</h2>
      <RaceList />
    </nav>
  </main>
));
