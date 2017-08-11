# Getting started

## Serverless

https://serverless.com/framework/docs/providers/aws/guide/quick-start

~~~~
  serverless create --template aws-nodejs --path test
  cd test
  
  serverless deploy -v
  serverless deploy function -f hello

  serverless invoke -f hello -l
  serverless logs -f hello -t

  serverless remove

  serverless offline
  curl -s -v localhost:3000/users/create
~~~~


### Testing

https://alexa.amazon.com/spa/index.html#cards (Your Skills: shows up automatically)






https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill#testing-an-aws-lambda-function




## Alexa Skill





### Alexa Node SDK

https://developer.amazon.com/alexa (Developer Portal)







https://github.com/alexa/skill-sample-nodejs-fact










TODO(burdon): Flash briefing
TODO(burdon): Register with developer portal.
TODO(burdon): Set-up Alexa app for testing.
TODO(burdon): Register device with developer account.
https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill#h2_register
- https://github.com/alexa/skill-sample-nodejs-fact

1. Create skill via dashboard
2. Create Intent
3. Build
4. Link Lambda ARN (arn:aws:lambda:us-east-1:956243632840:function:demo-dev-hello)




- https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill





TODO(burdon): ALEXA FUND
