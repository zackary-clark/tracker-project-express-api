#!/bin/bash

API="http://localhost:4741"
URL_PATH="/maxes"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "max": {
      "date": "2000-1-1"
    }
  }'

echo
