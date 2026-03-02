#!/usr/bin/bash

mysq() {
  if [ -z "$1" ]; then
    echo "Please provide a number."
  else
    echo $(($1 * $1))
  fi
}
mysq $1
