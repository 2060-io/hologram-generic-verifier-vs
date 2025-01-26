#!/bin/sh

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_PORT#$NEXT_PUBLIC_PORT#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_BASE_URL#$NEXT_PUBLIC_BASE_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_CREDENTIAL_DEFINITION_ID#$CREDENTIAL_DEFINITION_ID#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_SERVICE_AGENT_ADMIN_BASE_URL#$SERVICE_AGENT_ADMIN_BASE_URL#g"

echo "Starting Nextjs"
exec "$@"