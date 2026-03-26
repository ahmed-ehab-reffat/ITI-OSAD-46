#!/usr/bin/bash

options=""
while getopts "laidR" opt; do
  case $opt in
    l) options="$options -l" ;;
    a) options="$options -a" ;;
    i) options="$options -i" ;;
    d) options="$options -d" ;;
    R) options="$options -R" ;;
    *) echo "Invalid option"; exit 1 ;;
  esac
done

shift $((OPTIND-1))

dir=${1:-.}

ls $options "$dir"
