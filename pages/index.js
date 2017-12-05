import { Link } from "../src/routes";
import withData from "../lib/apollo";
import Cover from "../components/Cover";
import RaceList from "../components/RaceList";

export default withData(() => (
  <main>
    <Cover />
    <img src="/static/images/marvin.jpg" />
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
