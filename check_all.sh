#!/bin/bash

check_url() {
  local url=$1
  local size=$(curl -sL -D - "$url" -o /dev/null | grep -i Content-Length | tail -n 1 | awk '{print $2}' | tr -d '\r')
  
  if [ -z "$size" ]; then
    # Sometimes Content-Length is missing, check if it's a valid image using file command or just assume true if 200
    local http_code=$(curl -sL -o /dev/null -w "%{http_code}" "$url")
    if [ "$http_code" -eq 200 ]; then
      echo "OK_NO_SIZE"
    else
      echo "BAD"
    fi
  elif [ "$size" -lt 1000 ]; then
    echo "PLACEHOLDER"
  else
    echo "OK ($size)"
  fi
}

isbns=(
  "9780451524935:0451524934" # 1984
  "9781400031702:1400031702" # Secret
  "9781590173029:1590173023" # Season
  "9780385264731:0385264739" # Children
  "9780679734529:067973452X" # Notes
  "9780441172719:0441172717" # Dune
  "9780307739920:0307739922" # Night
  "9780140449389:0140449388" # 1001
  "9789774088874:" # Utopia
  "9780547928227:054792822X" # Hobbit
  "9780735211292:0735211299" # Atomic
  "9780807014295:080701429X" # Search
  "9789771427508:" # Renew
  "9786038202570:" # God
  "9780812968255:0812968255" # Meditations
  "9780141439518:0141439513" # Pride
  "9781501161933:1501161938" # Evelyn
  "9789953893351:" # Black
  "9789973059850:" # Hebrew
  "9780141441146:0141441143" # Jane
  "9781594631931:159463193X" # Kite
  "9781455563920:1455563925" # Pachinko
  "9780815609111:0815609117" # Granada
  "9789771442112:" # Azazeel
  "9780385474542:0385474547" # Things
  "9780439023481:0439023483" # Hunger
  "9780307474278:0307474275" # Vinci
  "9786144195742:" # Bilal
  "9789770931535:" # Elephant
  "9780553418026:0553418025" # Martian
)

for item in "${isbns[@]}"; do
  isbn13=${item%:*}
  isbn10=${item#*:}
  
  echo "--- $isbn13 ---"
  
  ol_url="https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg"
  res=$(check_url "$ol_url")
  if [[ "$res" == OK* ]]; then
    echo "USE: $ol_url ($res)"
    continue
  fi
  
  if [ -n "$isbn10" ]; then
    amz_url="https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg"
    res=$(check_url "$amz_url")
    if [[ "$res" == OK* ]]; then
      echo "USE: $amz_url ($res)"
      continue
    fi
  fi
  
  echo "USE: NONE"
done
