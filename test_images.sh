#!/bin/bash
urls=(
  # Missing ones from goodreads that 403'd:
  "https://covers.openlibrary.org/b/isbn/9781400031702-L.jpg" # Secret history
  "https://covers.openlibrary.org/b/isbn/9780141187204-L.jpg" # Season of migration (alternative isbn)
  "https://covers.openlibrary.org/b/isbn/9780385264731-L.jpg" # Children of alley
  "https://covers.openlibrary.org/b/isbn/9780679734529-L.jpg" # Notes underground
  "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg" # Dune
  "https://covers.openlibrary.org/b/isbn/9780140449389-L.jpg" # 1001 nights
  "https://covers.openlibrary.org/b/isbn/9789774088874-L.jpg" # Utopia
  "https://covers.openlibrary.org/b/isbn/9789771427508-L.jpg" # Renew life
  "https://covers.openlibrary.org/b/isbn/9786038202570-L.jpg" # Because you are god
  "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg" # Evelyn hugo
  "https://covers.openlibrary.org/b/isbn/9789953893351-L.jpg" # Black suits
  "https://covers.openlibrary.org/b/isbn/9789973059850-L.jpg" # Hebrew
  "https://covers.openlibrary.org/b/isbn/9780815609111-L.jpg" # Granada
  "https://covers.openlibrary.org/b/isbn/9789771442112-L.jpg" # Azazeel
  "https://covers.openlibrary.org/b/isbn/9786144195742-L.jpg" # Bilal
  "https://covers.openlibrary.org/b/isbn/9789770931535-L.jpg" # Blue elephant
)

for url in "${urls[@]}"; do
  echo "$url"
  curl -sI -o /dev/null -w "%{http_code}\n" "$url"
done
