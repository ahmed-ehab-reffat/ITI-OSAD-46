#!/usr/bin/bash

users=$(cut -d: -f1 /etc/passwd)
for user in $users; do
  mail -s "Notification" "$user" <mtemplate
done
