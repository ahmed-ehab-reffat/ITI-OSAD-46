#!/usr/bin/bash

echo "Enter username to talk to:"
read target_user
echo "Waiting for $target_user to log in..."
while ! who | grep -q "^$target_user "; do
  sleep 5
done
talk "$target_user"
