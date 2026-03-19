#!/bin/bash
urls=(
  "https://images.gr-assets.com/books/1348990566l/5470.jpg" # 1984
  "https://images.gr-assets.com/books/1451554281l/29044.jpg" # Secret History
  "https://images.gr-assets.com/books/1360067341l/130193.jpg" # Season of Migration
  "https://images.gr-assets.com/books/1336040854l/17600.jpg" # Children of the Alley
  "https://images.gr-assets.com/books/1327903636l/178186.jpg" # Notes from Underground
  
  "https://images.gr-assets.com/books/1436732693l/117.jpg" # Dune
  "https://images.gr-assets.com/books/1387124618l/9361589.jpg" # Night Circus
  "https://images.gr-assets.com/books/1332766323l/93101.jpg" # 1001 Nights
  "https://images.gr-assets.com/books/1327918512l/6325514.jpg" # Utopia
  "https://images.gr-assets.com/books/1546071216l/5907.jpg" # Hobbit
  
  "https://images.gr-assets.com/books/1535115320l/40121378.jpg" # Atomic Habits
  "https://images.gr-assets.com/books/1535419394l/4069.jpg" # Man's Search
  "https://images.gr-assets.com/books/1388710899l/6122602.jpg" # Renew Life
  "https://images.gr-assets.com/books/1458999818l/29606886.jpg" # Because You Are God
  "https://images.gr-assets.com/books/1421618636l/30659.jpg" # Meditations
  
  "https://images.gr-assets.com/books/1320399351l/1885.jpg" # Pride
  "https://images.gr-assets.com/books/1661036566l/32620332.jpg" # Evelyn
  "https://images.gr-assets.com/books/1353147575l/16155986.jpg" # Black Suits
  "https://images.gr-assets.com/books/1355418195l/16086780.jpg" # Hebrew
  "https://images.gr-assets.com/books/1557343311l/10210.jpg" # Jane Eyre
  
  "https://images.gr-assets.com/books/1579036753l/77203.jpg" # Kite Runner
  "https://images.gr-assets.com/books/1462393298l/29983711.jpg" # Pachinko
  "https://images.gr-assets.com/books/1344409395l/1105470.jpg" # Granada
  "https://images.gr-assets.com/books/1429074092l/3151806.jpg" # Azazeel
  "https://images.gr-assets.com/books/1352082529l/37781.jpg" # Things Fall
  
  "https://images.gr-assets.com/books/1586722975l/2767052.jpg" # Hunger Games
  "https://images.gr-assets.com/books/1579621267l/968.jpg" # Da Vinci
  "https://images.gr-assets.com/books/1484083437l/33367839.jpg" # Bilal
  "https://images.gr-assets.com/books/1346765799l/16035171.jpg" # Blue Elephant
  "https://images.gr-assets.com/books/1413706054l/18007564.jpg" # Martian
)

for url in "${urls[@]}"; do
  status=$(curl -sI -o /dev/null -w "%{http_code}" "$url")
  echo "$status : $url"
done
