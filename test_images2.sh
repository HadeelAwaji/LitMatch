#!/bin/bash
urls=(
  "https://books.google.com/books/publisher/content/images/frontcover/v3yqEAAAQBAJ?fife=w400-h600" # 1984
  "https://books.google.com/books/publisher/content/images/frontcover/A0vTDAAAQBAJ?fife=w400-h600" # Secret History
  "https://books.google.com/books/publisher/content/images/frontcover/B10sEAAAQBAJ?fife=w400-h600" # Dune
  "https://books.google.com/books/publisher/content/images/frontcover/G6o-EAAAQBAJ?fife=w400-h600" # Atomic Habits
  "https://books.google.com/books/publisher/content/images/frontcover/s_2QDwAAQBAJ?fife=w400-h600" # Pride
  "https://books.google.com/books/publisher/content/images/frontcover/2sSFCwAAQBAJ?fife=w400-h600" # Kite Runner
  "https://books.google.com/books/publisher/content/images/frontcover/82XTDgAAQBAJ?fife=w400-h600" # Hunger Games
)

for url in "${urls[@]}"; do
  echo "$url"
  curl -sI -o /dev/null -w "%{http_code}\n" "$url"
done
