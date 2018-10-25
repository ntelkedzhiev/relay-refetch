import React from "react";
import { QueryRenderer } from "react-relay";
import { Environment, RecordSource, Store } from "relay-runtime";
import {
  cacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  perfMiddleware,
  progressMiddleware,
  RelayNetworkLayer,
  retryMiddleware,
  urlMiddleware
} from "react-relay-network-modern/es";

const CACHE_SIZE = 50;
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

const networkMiddlewares = [
  cacheMiddleware({
    size: CACHE_SIZE,
    ttl: CACHE_TTL,
    clearOnMutation: false
  }),
  urlMiddleware({
    // Replace localhost with your IP
    url: req => Promise.resolve("http://localhost:3002/graphql")
  }),
  loggerMiddleware({
    logger: (message, ...data) => console.log(message)
  }),
  errorMiddleware({
    logger: (message, ...data) => console.error(message, data)
  }),
  // global.__DEV__ ? perfMiddleware() : null,
  retryMiddleware({
    fetchTimeout: 10000,
    allowMutations: true,
    retryDelays: attempt => Math.pow(2, attempt + 4) * 100,
    // TODO: Investigate where this function can be async
    statusCodes: [502, 503, 504]
  }),
  progressMiddleware({
    onProgress: (current, total) => {
      console.log("Downloaded: " + current + " B, total: " + total + " B");
    }
  })
];

// function fetchQuery(operation, variables) {
//   return fetch("http://192.168.1.52:3001/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       query: operation.text,
//       variables
//     })
//   }).then(response => {
//     return response.json();
//   });
// }

const network = new RelayNetworkLayer(networkMiddlewares);
const environment = new Environment({
  network,
  store: new Store(new RecordSource())
});

export function withRelay(WrappedComponent, Query) {
  return class RelayWrapper extends React.Component {
    render() {
      //env never null
      return (
        <QueryRenderer
          environment={environment}
          query={Query}
          variables={WrappedComponent.getVariables(this.props)}
          render={({ error, props, retry }) => {
            // TODO: Handle logout
            // if viewer == 'guest' (or other logic)
            //  await dispatch.handleLogout();
            //  const resetNavigationStack = NavigationActions.reset({
            //    index: 0,
            //    key: null,
            //    actions: [NavigationActions.navigate({routeName: 'Login'})],
            //  });
            //  this.props.navigation.dispatch(resetNavigationStack);

            if (error) {
              console.error(error);
            }

            // if (!props) {
            //   props = { viewer: null };
            // }

            // if (!props || error) {
            //   return null;
            // }

            return (
              <WrappedComponent
                {...this.props}
                {...props}
                retry={retry}
                error={error}
              />
            );
          }}
        />
      );
    }
  };
}

export default environment;
