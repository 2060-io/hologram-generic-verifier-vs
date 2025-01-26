#!/bin/sh

echo "Check that we have NEXT_PUBLIC_PORT vars"
test -n "$NEXT_PUBLIC_PORT"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_PORT#$NEXT_PUBLIC_PORT#g"

echo "Check that we have NEXT_PUBLIC_BASE_URL vars"
test -n "$NEXT_PUBLIC_BASE_URL"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_BASE_URL#$NEXT_PUBLIC_BASE_URL#g"

echo "Check that we have CREDENTIAL_DEFINITION_ID vars"
test -n "$CREDENTIAL_DEFINITION_ID"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_CREDENTIAL_DEFINITION_ID#$CREDENTIAL_DEFINITION_ID#g"

echo "Check that we have SERVICE_AGENT_ADMIN_BASE_URL vars"
test -n "$SERVICE_AGENT_ADMIN_BASE_URL"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_SERVICE_AGENT_ADMIN_BASE_URL#$SERVICE_AGENT_ADMIN_BASE_URL#g"

echo "Starting Nextjs"
exec "$@"