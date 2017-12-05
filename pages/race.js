import { Link } from "../src/routes";
import withData from "../lib/apollo";
import Race from "../components/Race";

export default withData(props => (
  <main>
    <nav>
      <Link href="/">
        <a>Back</a>
      </Link>
    </nav>
    <Race slug={props.url.query.name} />
  </main>
));
