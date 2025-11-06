#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Please provide a folder name."
  exit 1
fi

DIR="$1"
mkdir -p "$DIR"

touch "$DIR/function.ts" "$DIR/index.ts" "$DIR/schema.ts" "$DIR/type.ts"

echo "✅ Created module folder: $DIR"
