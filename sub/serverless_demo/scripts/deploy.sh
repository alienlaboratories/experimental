#!/usr/bin/env bash

#
# Build
#

sls webpack

#
# Calls CloudFormation
#

sls deploy
sls deploy --function hello

#
# Test
#

sls invoke --function hello

#
# Show logs (from CloudWatch)
#

sls logs --function hello --tail
