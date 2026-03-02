#!/usr/bin/bash

echo "Enter logname (username):"
read username

user_home=$(eval echo ~$username)

echo "--- Full Info for $user_home ---"
ls -alR "$user_home"

echo "--- Copying files to /tmp ---"
mkdir -p /tmp/${username}_backup
cp -rv "$user_home/." /tmp/${username}_backup 2>/dev/null
echo "Backup attempted to /tmp/${username}_backup"

echo "--- Current Processes ---"
ps -u "$username"
