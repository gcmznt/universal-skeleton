import { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "../src/routes";
import { allRaces as allRacesQuery } from "../src/queries";

@graphql(allRacesQuery, {
  options: {
    variables: {
      skip: 0,
      first: 10
    }
  },
  props: ({ data: { loading, allRaces = {} } }) => ({
    loading,
    allRaces
  })
})
export default class RaceList extends Component {
  render() {
    const { loading, allRaces } = this.props;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <ul>
        {allRaces.map((race, index) => (
          <li key={race.id}>
            <Link route="race" params={{ name: race.slug }}>
              <a>{race.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
