import { withData } from "next-apollo";
import { HttpLink } from "apollo-link-http";

export default withData({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cj8d1a6hi053j0165fzbf5o4b"
  })
});
