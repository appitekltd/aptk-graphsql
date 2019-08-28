# aptk-graphsql
Extends your Salesforce API with basic GraphQL capabilities, allowing you to run GraphQL queries on your Salesforce data.

## About ##
This is the source code for our free [GraphSQL package](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000G0l6nUAB)

This package adds GraphQL query support directly into Salesforce, allowing you to send complex cross-object queries that would otherwise take multiple API calls to retrieve.

It adds this via a custom RestResource endpoint that parses a GraphQL string query into a JSON-like structure, then runs the needed SOQL queries to get the data and returns it in the same structure.

## Future Features ##
- Fragments
- Field Aliases
- Multiple Queries in a request
- Mutations

## Bugs ##
If you find any issues please let us know! We try our best to keep our free tools updated and in working order, but cannot be held responsible for any issues that occur from using them.