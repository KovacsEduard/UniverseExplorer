### 1. Solar System OpenData
- **URL:** `https://api.le-systeme-solaire.net/rest/bodies/{bolygó}` (pl. `terre`, `mars`)
- **Mit ad:** gravitáció, átlaghőmérséklet (Kelvinben), holdak, keringési idő, sugár.
- **Hogyan használjuk:** bolygóra kattintáskor kérjük le, a Kelvint °C-ra váltjuk. Ha nem elérhető, a kódban lévő helyi adatokat mutatjuk, a címke ilyenkor "helyi adat".

### 2. Where the ISS at?
- **URL:** `https://api.wheretheiss.at/v1/satellites/25544` (25544 az ISS azonosítója)
- **Mit ad:** szélesség, hosszúság, magasság, sebesség.
- **Hogyan használjuk:** 5 másodpercenként (`setInterval`) lekérjük, a pontot a térképre rajzoljuk, az előző pontokból nyomvonalat húzunk. Ha nem elérhető, szimulált pályát számolunk (51,6° dőlésszög, 92,7 perces keringés), és a címke "szimuláció".

### 3. NASA APOD (Astronomy Picture of the Day)
- **URL:** `https://api.nasa.gov/planetary/apod?api_key=KULCS` (opcionálisan `&date=ÉÉÉÉ-HH-NN`)
- **Mit ad:** a nap képe, címe, magyarázata (angolul), dátuma, a média típusa.
- **Hogyan használjuk:** betöltéskor a mai képet kérjük, a "Véletlen nap" gomb véletlen dátumot generál 2016 és tegnapelőtt között. Hiba esetén háromszor újrapróbálja, videós napnál az előnézeti képet mutatja.