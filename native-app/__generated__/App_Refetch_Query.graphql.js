/**
 * @flow
 * @relayHash 06435de876b13ad7b4776f5932f8858c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type App_viewer$ref = any;
export type App_Refetch_QueryVariables = {|
  filterBy?: ?string
|};
export type App_Refetch_QueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: App_viewer$ref
  |}
|};
export type App_Refetch_Query = {|
  variables: App_Refetch_QueryVariables,
  response: App_Refetch_QueryResponse,
|};
*/


/*
query App_Refetch_Query {
  viewer {
    ...App_viewer_2T86qt
    id
  }
}

fragment App_viewer_2T86qt on User {
  id
  value
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filterBy",
    "type": "String",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "App_Refetch_Query",
  "id": null,
  "text": "query App_Refetch_Query {\n  viewer {\n    ...App_viewer_2T86qt\n    id\n  }\n}\n\nfragment App_viewer_2T86qt on User {\n  id\n  value\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "App_Refetch_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "App_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "filterBy",
                "variableName": "filterBy",
                "type": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "App_Refetch_Query",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "value",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a9bed4090e0e185ca4f9de959b9329d7';
module.exports = node;
