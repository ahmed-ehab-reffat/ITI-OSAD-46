#!/usr/bin/bash

LC_COLLATE=C
shopt -s extglob

read -p "Enter String: " str

case $str in
+([a-z]))
  echo "Small characters"
  ;;
+([A-Z]))
  echo "Capital characters"
  ;;
+([0-9]))
  echo "Number"
  ;;
+([A-Za-z]))
  echo "Mixed characters"
  ;;
+([A-Za-z0-9]))
  echo "Mixed characters and Number"
  ;;
"")
  echo "Nothing"
  ;;
*)
  echo "Special Characters"
  ;;
esac
