# Getting started

https://serverless.com/framework/docs/providers/aws/guide/quick-start/

~~~~
  serverless create --template aws-nodejs --path test
  cd test
  
  serverless deploy -v
  serverless deploy function -f hello

  serverless invoke -f hello -l
  serverless logs -f hello -t

  serverless remove
~~~~

# Using Docker to deploy the stack

## Dependencies

* Docker
* A `.env` file with both `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables for an IAM user with the `ElasticsearchDemo` policy attached.

### Building the container image

`docker build --rm --tag serverless .`

## Using the `serverless` CLI
### Deploying a project

`docker run --env-file .env --rm -v $(pwd):/serverless serverless deploy`

### Deploying a function without updating all the stack

`docker run --env-file .env --rm -v $(pwd):/serverless serverless deploy function --function FUNCTION_NAME`

### Destroying a deployed project and all its resources on AWS

`docker run --env-file .env --rm -v $(pwd):/serverless serverless remove`

### Invoking a function

`docker run --env-file .env --rm -v $(pwd):/serverless serverless invoke --function FUNCTION_NAME [--data 'DATA'] [--log]`

### Checking the logs of a function

`docker run --env-file .env --rm -v $(pwd):/serverless serverless logs --function FUNCTION_NAME --tail`
