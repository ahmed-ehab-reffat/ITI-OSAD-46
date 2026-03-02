#!/usr/bin/bash

read -p "Enter String: " str

case $str in
[a-z])
  echo "Small characters"
  ;;
[A-Z])
  echo "Capital characters"
  ;;
[0-9])
  echo "Number"
  ;;
"")
  echo "Nothing"
  ;;
*)
  echo "Special Characters"
  ;;
esac
