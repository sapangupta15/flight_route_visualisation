import React, {useState} from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import GL from '@luma.gl/constants';

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    tooltip: {
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 9,
        fontSize: '12px',
        padding: '8px',
        background: '#000',
        color: '#fff',
        minWidth: '160px',
        maxHeight: '240px',
        overflowY: 'hidden'
    }
}));


// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoic2FwYW5ndXB0YSIsImEiOiJjazh3bHl5N3gwZHFlM2RvZWRseTcweTJxIn0.rzqAFw7eJ_4_wrJJUWi8ug"

const mapStyle = 'mapbox://styles/mapbox/light-v8'

const MapVisualization = (props) => {
    const classes = useStyles();
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [hoveredObject, setHoveredObject] = useState(null);

    const INITIAL_VIEW_STATE = {
        latitude: props.data.sourceLatitude,
        longitude: props.data.sourceLongitude,
        zoom: 2,
        maxZoom: 16,
        pitch: 50,
        bearing: 0
    };

    const onHover = ({x, y, object}) => {
        setX(x);
        setY(y);
        setHoveredObject(object);
    }

    const renderTooltip = () => {
        return (
            hoveredObject && (
                <div className={classes.tooltip}
                     style={{left: x, top: y}}>
                    <div>{hoveredObject.properties.name.indexOf('0x') >= 0 ? '' : hoveredObject.properties.name}</div>
                    <div>{hoveredObject.properties.distance ? 'Distance: ' + hoveredObject.properties.distance + 'kms' : ''}</div>
                    <div>{hoveredObject.properties.travelTime ? 'Estimated Time: ' + hoveredObject.properties.travelTime : ''}</div>
                    <div>{hoveredObject.properties.airline ? 'Airline: ' + hoveredObject.properties.airline : ''}</div>
                    <div>{hoveredObject.properties.distance ? 'Journey from:  ' + props.data.source + ' to ' + props.data.destination : ''}</div>
                </div>
            )
        );
    }

    const renderLayers = () => {
        // let flighPathGeoJsonLayer = DATA_URL.FLIGHT_PATH_GEO_JSON

        return [
            new GeoJsonLayer({
                id: 'geojson-layer',
                data: props.data.data,
                pickable: true,
                stroked: false,
                filled: true,
                extruded: true,
                lineWidthScale: 20,
                lineWidthMinPixels: 2,
                getFillColor: [32, 33, 32, 200],
                getLineColor: d => d.properties.color,
                getRadius: d => d.properties.radius,
                getLineWidth: 1,
                getElevation: 30,
                lineJointRounded: true,
                onHover: onHover
            })
        ];
    }

    return (
        <div style={{position:"relative", minHeight: "75vh"}}>
            <DeckGL style={{marginTop: '0'}}
                layers={renderLayers()}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                pickingRadius={5}
                height="100%"
                width="100%"
                parameters={{
                    blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
                    blendEquation: GL.FUNC_ADD
                }}
            >
                <StaticMap
                    reuseMaps
                    mapStyle={mapStyle}
                    preventStyleDiffing={false}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                />
                {renderTooltip}
            </DeckGL>
        </div>
    );
}

export default MapVisualization;