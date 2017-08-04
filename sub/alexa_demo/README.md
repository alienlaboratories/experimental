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


## Alexa Skill

- https://github.com/alexa/skill-sample-nodejs-fact

1. Create skill via dashboard
2. Create Intent
3. Build
4. Link Lambda ARN (arn:aws:lambda:us-east-1:956243632840:function:demo-dev-hello)

