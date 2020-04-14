const convertData = (data) => {
    const sourceAirport = data.source
    const destinationAirport = data.destination
    const returnedRoutes = data.routes
    const shortestRoute = returnedRoutes[0]

    const sourceLatitude = shortestRoute[0].path[0][1]
    const sourceLongitude = shortestRoute[0].path[0][0]

    let mapGeoPoints  = handleRoute(shortestRoute, sourceAirport,
                                                        destinationAirport, true)
    if (returnedRoutes.length === 2) {
        const alternateRoute = returnedRoutes[1]
        let altRouteMapGeoPoints = handleRoute(alternateRoute, sourceAirport, destinationAirport)
        // remove duplicates
        mapGeoPoints = [...new Set([...mapGeoPoints, ...altRouteMapGeoPoints])]
    }
    return {
        "sourceLongitude": sourceLongitude,
        "sourceLatitude": sourceLatitude,
        "source": data.source,
        "destination": data.destination,
        "data": {
            "type": "FeatureCollection",
            "features": mapGeoPoints
        }
    }
}

const handleRoute = (routeDatas, source, destination, shortestRoute=false) => {
    let color =  shortestRoute ? [8, 50, 163] : [189, 143, 17]
    let geoPoints = []
    let routes = []

    routeDatas.forEach(function (routeData)  {
        let route = createRoute(routeData, source, destination, color);
        routes = [...routes, route]
        if (routeData.source_airport === source && routeData.destination_airport === destination) {
            geoPoints = [...geoPoints,
                            createGeoPoint(source, routeData.path[0], true),
                            createGeoPoint(destination, routeData.path[1], true, true)
                ]
        } else if(routeData.source_airport === source) {
            geoPoints = [...geoPoints,
                createGeoPoint(source, routeData.path[0], true),
                createGeoPoint(routeData.destination_airport, routeData.path[1])
            ]
        } else if (routeData.destination_airport === destination) {
            geoPoints = [...geoPoints,
                createGeoPoint(routeData.source_airport, routeData.path[0]),
                createGeoPoint(destination, routeData.path[1], true, true)
            ]
        } else {
            geoPoints = [...geoPoints,
                createGeoPoint(routeData.source_airport, routeData.path[0]),
                createGeoPoint(routeData.destination_airport, routeData.path[1])
            ]
        }
    })

    return [...geoPoints, ...routes]
}

const createGeoPoint = (name, coordinates, majorPoint=false, destination=false) => {
    if (destination) {
        return {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": calculateDestinationPolygon(coordinates)
            },
            "properties": {
                "name": name,
                "radius": majorPoint ? 300000 : 40000
            }
        }
    }
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": coordinates
        },
        "properties": {
            "name": name,
            "radius": majorPoint ? 300000 : 40000
        }
    }
}

const calculateDestinationPolygon = (coordinates) => {
    let latitude = coordinates[1]
    let longitude = coordinates[0]

    let point1 = [longitude + 2, latitude -2]
    let point2 = [longitude + 2, latitude + 2]
    let point3 = [longitude -2, latitude]
    return [[point1, point2, point3]]
}

const createRoute = (routeData, source, destination, lineColor) => {
    return {
        "type": "Feature",
        "properties": {
            "name": routeData.source_airport + ' to ' + routeData.destination_airport,
            "color": lineColor,
            "distance": routeData.distance,
            "travelTime": routeData.est_travel_time,
            "airline": routeData.airline,
            "flightNumber": routeData.flight_number,
            "actualJourney": `Flight from ${source} to ${destination}`
        },
        "geometry": {
            "type": "MultiLineString",
            "coordinates": [routeData.path]
        }
    }
}

export default convertData