#!/usr/bin/bash

menu="
1) ls
2) ls -a
3) exit
"
while true; do
  echo "$menu"
  read -p "Choose an option: " choice

  case $choice in
  1)
    ls
    ;;
  2)
    ls -a
    ;;
  3)
    break
    ;;
  *)
    echo "Invalid option: $choice. Please try again."
    ;;
  esac
done
