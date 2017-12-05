import { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "../src/routes";
import { race as raceQuery } from "../src/queries";

@graphql(raceQuery, {
  options: ({ slug }) => ({ variables: { slug } }),
  props: ({ data: { loading, Race = {} } }) => ({
    loading,
    race: Race
  })
})
export default class Race extends Component {
  render() {
    const { loading, race } = this.props;
    return loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>{race.name}</h1>
        <p>{race.description}</p>
      </div>
    );
  }
}
