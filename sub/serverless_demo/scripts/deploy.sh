#!/usr/bin/env bash

AWS_PROFILE=alienlabs

#
# Build.
#

sls webpack

#
# Calls CloudFormation.
#

sls deploy
sls deploy --function hello

#
# Test funciton.
#

sls invoke --function hello

#
# Test API.
#

API_URL="https://7u7jsipmfh.execute-api.us-east-1.amazonaws.com/dev/hello"

curl -i -X POST ${API_URL} -H "Content-Type: application/json" -d "{}"

#
# Show logs (from CloudWatch).
#

sls logs --function hello --tail
