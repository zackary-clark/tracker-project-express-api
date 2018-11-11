#!/bin/bash

API="http://localhost:4741"
URL_PATH="/maxes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "max": {
      "date": "2018-11-11",
      "squat1RM": 315,
      "bench1RM": 225,
      "deadlift1RM": 405,
      "press1RM": 135
    }
  }'

echo
