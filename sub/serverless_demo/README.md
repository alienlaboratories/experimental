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
