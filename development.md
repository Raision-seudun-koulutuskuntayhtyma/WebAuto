Development branch is intended to be a base for developping the next version of our software. Do not make any commits directly to this brach. Create a new branch from development instead. Write your own code to that branch and make commits. After review build master will merge your brach to development branch. 

Terms to be used when creating keys for app.js and corresponding handlebars files:

| Key | Purpose | UI term in Finnish |
|---|---|---|
numberPlate | Registration number of the vehicle | rekisterinumero
user | Name of the person using a vehicle | käyttäjä
status | If the vehicle is in use: free or occupied | vapaa, ajossa
purpose | The reason for a ride | ajon tarkoitus 
manufacturer | Manufacturer of the vehicle ie. brand | merkki
model | A car model | malli
seats | Number of passengers allowed in the vehicle | henkilömäärä
gearType | Transmission type automatic or manual | vaihteisto: automaatti, käsivaihteet
timeTaken | Timestamp when a vehicle has been taken from the garage | otto
timeReturned | Timestamp when a vehicle has been returned to the garage | palautus
gpsPosition | Coordinates for a vehicle from Fleet Management software | sijainti
diary | Table containing information about the vehicle and driver at certain moment | ajopäiväkirja
