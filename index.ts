/* eslint-disable no-console */
/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */
import { GeoBox, GeoCoordinates, GeoPointLike } from "@here/harp-geoutils";
import { MapControls, MapControlsUI } from "@here/harp-map-controls";
import { CopyrightElementHandler, MapView, PickResult } from "@here/harp-mapview";
import { GeoJsonDataProvider, VectorTileDataSource } from "@here/harp-vectortile-datasource";
import { apikey } from "./resources/scripts/config";
//import * as geojson from "../resources/geoman.json";
import * as pointjson from "./resources/json/nokia_4g_towers_points.json";
import * as geojson from "./resources/json/nokiaPoly.json";
//import logo from "../harp.gl-example/resources/icons/cellTower.svg";
import Logo from "../harp.gl-example/resources/icons/cellTower.svg";



export namespace GeoJsonCustomShaderExample {
    interface FeatureProperties {
        /**
         * The bounding box of the feature
         * [west, south, east, north]
         */
        bbox?: [number, number, number, number];

        [name: string]: any;
    }

    const imageString = "./resources/icons/CellTower.svg";
    
    // Get the bounding box for polygon geoJson
    const getGeoBox = () => {
        for (var i = 0; i < geojson.features.length; i++) {
            const ring2 = geojson.features[i].geometry.coordinates[0];
            //console.log(ring2);
            const geoBox = new GeoBox(
                GeoCoordinates.fromGeoPoint(ring2[0] as GeoPointLike),
                GeoCoordinates.fromGeoPoint(ring2[0] as GeoPointLike)
            );
            //console.log(geoBox);
            ring2.forEach(geoPoint =>
                geoBox.growToContain(GeoCoordinates.fromGeoPoint(geoPoint as GeoPointLike))
            );
            const { west, south, east, north } = geoBox;
            const properties: FeatureProperties = geojson.features[i].properties;
            properties.bbox = [west, south, east, north];
        }
        // return geoBoxArray;
    };

    getGeoBox();
    class CustomShaderApp {
        readonly mapView: MapView;

        constructor(container: HTMLCanvasElement | string) {
            const canvas =
                typeof container === "string"
                    ? (document.getElementById(container) as HTMLCanvasElement)
                    : container;

            this.mapView = new MapView({
                canvas,
                target: [24.78280387878418, 60.204047014976714],
                zoomLevel: 12.0,
                theme: {
                    extends: "resources/berlin_tilezen_effects_streets.json",
                    styles: {
                        geojson: [
                            {
                                layer: "geojson",
                                when: ["==", ["geometry-type"], "Polygon"],
                                renderOrder: 10000,
                                technique: "shader",
                                primitive: "mesh",
                                textureCoordinateType: "feature-space",
                                transparent: true,
                                params: {
                                    vertexShader: `
                                    varying vec2 vUv;
                                    void main()
                                    {
                                        vUv = uv;
                                        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
                                    }
                                    `,
                                    fragmentShader: `
                                    varying vec2 vUv;
                                    uniform vec2 u_resolution;
                                    uniform vec2 u_mouse;
                                    uniform float u_time;
                                    void main() {                                
                                        vec2 u_c = vec2(0.5,0.5);
                                        float distanceFromLight = length(vUv - u_c);
                                        gl_FragColor = mix(vec4(1.0,0.0,0.0,1.0), vec4(0.429,1.0,0.0,.0), distanceFromLight*2.0);
                                    }
                                    
                                        `
                                }
                            },
                            {
                                when: ["==", ["geometry-type"], "Point"],
                                renderOrder: 10001,
                                technique: "labeled-icon",
                                size: 16,
                                text: ["get", "id"],
                                imageTexture: "custom-icon",
                                iconScale: 0.8,
                                screenHeight: 32,
                                distanceScale: 1,
                                iconYOffset: 25,
                                color: "#ffffff"
                            }
                        ]
                    },
                    images: {
                        "custom-icon": {
                            url: imageString,
                            preload: true
                        }
                    },
                    imageTextures: [
                        {
                            name: "custom-icon",
                            image: "custom-icon"
                        }
                    ]
                }
            });

            CopyrightElementHandler.install("copyrightNotice", this.mapView);

            const mapControls = new MapControls(this.mapView);
            mapControls.maxTiltAngle = 55;

            const ui = new MapControlsUI(mapControls, { zoomLevel: "input" });
            canvas.parentElement!.appendChild(ui.domElement);

            const adjustSize = () => {
                this.mapView.resize(window.innerWidth, window.innerHeight);
            };

            this.addBaseMap();
            this.addEvRange();
            this.addPoints();

            adjustSize();

            window.addEventListener("resize", adjustSize);


            /*
                ////////////
                MOUSE EVENTS
                ////////////
            */
            canvas.addEventListener("mousedown", event => {
                lastCanvasPosition = getCanvasPosition(event, canvas);
            });
            canvas.addEventListener("touchstart", event => {
                if (event.touches.length !== 1) {
                    return;
                }
                lastCanvasPosition = getCanvasPosition(event.touches[0], canvas);
            });

            canvas.addEventListener("mouseup", event => {
                const canvasPos = getCanvasPosition(event, canvas);
                if (isPick(canvasPos)) {
                    handlePick(this.mapView, canvasPos.x, canvasPos.y);
                }
            });
            canvas.addEventListener("touchend", event => {
                if (event.changedTouches.length !== 1) {
                    return;
                }
                const canvasPos = getCanvasPosition(event.changedTouches[0], canvas);
                if (isPick(canvasPos)) {
                    handlePick(this.mapView, canvasPos.x, canvasPos.y);
                }
            });
            let lastCanvasPosition: { x: number; y: number } | undefined;
            function getCanvasPosition(
                event: MouseEvent | Touch,
                canvas: HTMLCanvasElement
            ): { x: number; y: number } {
                const { left, top } = canvas.getBoundingClientRect();
                return { x: event.clientX - Math.floor(left), y: event.clientY - Math.floor(top) };
            }
            // Trigger picking event only if there's (almost) no dragging.
            function isPick(eventPosition: { x: number; y: number }) {
                const MAX_MOVE = 5;
                return (
                    lastCanvasPosition &&
                    Math.abs(lastCanvasPosition.x - eventPosition.x) <= MAX_MOVE &&
                    Math.abs(lastCanvasPosition.y - eventPosition.y) <= MAX_MOVE
                );
            }

            // snippet:datasource_object_picking_2.ts
            const element = document.getElementById("mouse-picked-result") as HTMLPreElement;
            let current: PickResult | undefined;

            const handlePick = (mapViewUsed: MapView, x: number, y: number) => {
                let usableIntersections = mapViewUsed
                    .intersectMapObjects(x, y)
                    .filter(item => item.userData !== undefined);
                const pickResults = this.mapView.intersectMapObjects(x, y);
                console.log(pickResults);
                if (pickResults.length > 1) {
                    console.log("Results are " + pickResults.length);
                }
                if (usableIntersections.length > 1) {
                    usableIntersections = usableIntersections.filter(item => item !== current);
                    console.log(usableIntersections.length);
                }

                if (usableIntersections.length === 0) {
                    // Hide helper box
                    //element.style.visibility = "hidden";
                    console.log("not Usable");
                    return;
                }

                // Get userData from the first result;
                current = usableIntersections[0];

                if (current.userData?.name !== undefined) {
                    mapViewUsed.setDynamicProperty("selection", [current.userData.name]);
                }


            }
        }

        start() {}

        // Add the API key

        private addBaseMap() {
            const dataSource = new VectorTileDataSource({
                baseUrl: "https://vector.hereapi.com/v2/vectortiles/base/mc",
                authenticationCode: apikey
            });
            this.mapView.addDataSource(dataSource);
        }

        // Add the PointJson to the map

        private addPoints() {
            const dataSource = new VectorTileDataSource({
                dataProvider: new GeoJsonDataProvider("geojson", pointjson as any),
                styleSetName: "geojson"
            });
            this.mapView.addDataSource(dataSource)
        }

        // Add the geoJson rectangles to make the heatmap

        private addEvRange() {
            const datasource = new VectorTileDataSource({
                dataProvider: new GeoJsonDataProvider("geojson", geojson as any),
                styleSetName: "geojson"
            });
            this.mapView.addDataSource(datasource);
        }




        
        
    }





    async function main() {
        const mapView = new CustomShaderApp("mapCanvas");
        mapView.start();
    }

    main();
}
