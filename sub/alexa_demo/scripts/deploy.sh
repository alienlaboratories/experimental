#!/usr/bin/env bash

AWS_PROFILE=alienlabs

FUNCTION=${1:-"hello"}

#
# Build.
#

sls webpack

#
# Calls CloudFormation.
# https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions
#

sls deploy
sls deploy --function ${FUNCTION}

#
# Test function.
#

sls invoke --function ${FUNCTION}

#
# Test API.
#

API_URL="https://7u7jsipmfh.execute-api.us-east-1.amazonaws.com/dev/hello"

curl -i -X POST ${API_URL} -H "Content-Type: application/json" -d "{}"

#
# Show logs (from CloudWatch).
#

sls logs --function ${FUNCTION}
