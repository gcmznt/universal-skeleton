import gql from "graphql-tag";

export const allRaces = gql`
  query allRaces($first: Int!, $skip: Int!) {
    allRaces(orderBy: name_DESC, first: $first, skip: $skip) {
      id
      name
      slug
    }
  }
`;

export const race = gql`
  query Race($slug: String!) {
    Race(slug: $slug) {
      id
      name
      slug
      description
    }
  }
`;
