An example related to issue described here https://github.com/facebook/relay/issues/2553

## To run:

Replace `localhost` with your IP in native-app/relay.js

```
yarn/npm install (in both /server and /native-app)

yarn/npm run start (in /server)
expo start (in /native-app)
```

### IMPORTANT: The issue can be simulated on the second run of the app since cached query data is needed.

## Observed behavior:

The first refetch request is executed but the component does not rerender nor the callback is called. The second refetch works as expected.

Note: There is a warning that viewer should not be `undefined` but I believe it is not related to the issue at hand.

```
// native-app/App.js
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
```
 

## Log:

```
[XX:XX:XX] componentDidMount
[XX:XX:XX] Run App_Refetch_Query
[XX:XX:XX] Run App_Refetch_Query
[XX:XX:XX] Done App_Refetch_Query in 1249ms
[XX:XX:XX] Done App_Refetch_Query in 1293ms
[XX:XX:XX] Run App_Refetch_Query
[XX:XX:XX] Done App_Refetch_Query in 1022ms
[XX:XX:XX] Refetch Done (with delay)
```
