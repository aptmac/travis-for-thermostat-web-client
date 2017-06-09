#!/bin/bash
echo "{ \"url\": \"0.0.0.0:8080/login\", \"realm\": \"FooRealm\", \"clientId\": \"test-user\" }" > ./src/app/components/auth/keycloak.json;
echo "{ \"gatewayUrl\": \"http://0.0.0.0:8888\" }" > ./src/app/shared/config/config.json;