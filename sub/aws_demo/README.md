# AWS Database

## Goals

1. Create a simple database using AWS technologies:
  - DynamoDB: store JSON items by ID.
  - Elasticsearch: index JSON items.
  - Lamdba: subscribe to DynamoDB updates, extract text, then update then Elasticsearch index.

2. Implement simple REST and Node.js APIs.

3. Simple Node.js CLI to administer the database.
  - Reset, backup, recover.
  - Basic stats.


## Getting Started

### Required Tools

~~~~
  # For OS/X.
  brew install node
  brew install yarn
  
  npm install -g npm@4

  npm install -g babel-cli
  npm install -g jest
  npm install -g nodemon
~~~~


### Building and Testing

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


## Tasks

1. Set-up test K8s/AWS environment.

2. Deploy Elasticsearch container service.
    - Create testing scripts to insert/retrieve records.

3. Set-up DynamoDB database (hosted service)
    - Create testing scripts to insert/retrieve records.

4. Set-up test Lambda function that subscribes to DynamoDB updates and logs these items.

5. Implement Node.js API.
