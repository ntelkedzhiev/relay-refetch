// App.js
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { graphql, createRefetchContainer } from "react-relay";

import environment, { withRelay } from "./relay";

class App extends React.Component {
  static contextTypes = {
    relay: PropTypes.shape({
      variables: PropTypes.object
    })
  };

  componentDidMount() {
    console.log("componentDidMount");

    this.props.relay.refetch(
      { filterBy: "beta" },
      null,
      () => console.log("Refetch Done (without delay)"),
      { force: true }
    );

    setTimeout(
      () =>
        this.props.relay.refetch(
          { filterBy: "beta" },
          null,
          () => console.log("Refetch Done (with delay)"),
          { force: true }
        ),
      1500
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const AppQuery = graphql`
  query App_Refetch_Query($filterBy: String) {
    viewer {
      ...App_viewer @arguments(filterBy: $filterBy)
    }
  }
`;

const AppContainer = createRefetchContainer(
  App,
  graphql`
    fragment App_viewer on User
      @argumentDefinitions(filterBy: { type: "String" }) {
      id
      value
    }
  `,
  AppQuery
);

AppContainer.getVariables = () => {
  return { filterBy: "alpha" };
};

export default withRelay(AppContainer, AppQuery);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
