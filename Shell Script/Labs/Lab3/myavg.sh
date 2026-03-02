#!/usr/bin/bash

read -p "Enter numbers separated by space: " -a arr
sum=0
count=${#arr[@]}
for i in "${arr[@]}"; do
  sum=$((sum + i))
done
avg=$(echo "scale=2; $sum / $count" | bc)
echo "Average is: $avg"
