#!/usr/bin/bash

target=$1

if [ ! -e "$target" ]; then
    echo "Path does not exist."
    exit 1
fi

[ -f "$target" ] && echo "$target is a File"
[ -d "$target" ] && echo "$target is a Directory"

[ -r "$target" ] && echo "Read: Yes" || echo "Read: No"
[ -w "$target" ] && echo "Write: Yes" || echo "Write: No"
[ -x "$target" ] && echo "Execute: Yes" || echo "Execute: No"
