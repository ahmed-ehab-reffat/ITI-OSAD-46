#!/usr/bin/bash

mailfile="/var/mail/$USER"
while true; do
  if [ -s "$mailfile" ]; then
    echo "You have new mail!"
  else
    echo "No new mail."
  fi
  sleep 10
done
