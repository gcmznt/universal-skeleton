import { Link } from "../src/routes";

export default props => (
  <main>
    <nav>
      <Link href="/">
        <a>Back</a>
      </Link>
    </nav>
    <h1>{props.url.query.name}</h1>
  </main>
);
