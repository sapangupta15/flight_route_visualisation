### THis project has been built using React and uses Mapbox GL for map visualisations.

##### Users can select departure country, departure airport, arrival country, arrival airport and max number of allowed halts. The routes, if available will be shown on mao. Bluw represents shortest route and yellow represents backup route

#### Build
Run this command to build docker file:
```bash
$ docker build -t flights-ui . 
``` 

#### To run the app, run this command:
```bash
$ docker run -it --rm  -p 3001:3000 flights-ui:latest
``` 

#### The pp is now available at: http://localhost:3001
