# AWS Database

## Goals

- Create a simple database using AWS technologies:
  - DynamoDB: store JSON items.
  - Elasticsearch: index JSON items.
  - Lamdba: subscribe to DynamoDB updates, extract text, and update Elasticsearch index.


## Getting Started

~~~~
  npm install
  npm test
~~~~

For development:

~~~~
  jest --watch
~~~~


## APIs

Items have the following structure:

~~~~
  {
    id: 'ITEM_ID',
    title: 'Some text that can be queried.'
  }
~~~~

Queries have the following structure:

~~~~
  {
    text: 'Case insensitive text to match'
  }
~~~~
