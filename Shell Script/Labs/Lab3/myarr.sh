#!/usr/bin/bash

read -p "How many elements? " n
for ((i = 0; i < n; i++)); do
  read -p "Enter element $i: " arr[$i]
done
echo "Array elements: ${arr[*]}"
