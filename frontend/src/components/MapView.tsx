import { useEffect } from "react";
import Feature from "ol/Feature.js";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import Point from "ol/geom/Point.js";
import VectorSource from "ol/source/Vector.js";
import View from "ol/View.js";
import { Icon, Style } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { fromLonLat } from "ol/proj";
import { Attribution, defaults } from "ol/control.js";
import imgUrl from "../assets/location-dot-solid.svg";
import { Box } from "@chakra-ui/react";
import { capitalize } from "../utils/capitalize";

const attribution = new Attribution({
  collapsible: true,
  collapsed: true,
});

type MapViewProps = {
  name: string;
  coordinates: number[];
};
export const MapView = ({ name, coordinates }: MapViewProps) => {
  useEffect(() => {
    /**
     * Icon
     */
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      name,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0, 0],
        src: imgUrl,
        width: 28,
        height: 32,
      }),
    });

    iconFeature.setStyle(iconStyle);

    /**
     * Map Layer
     */
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          style: function (feature) {
            return feature.get("style");
          },
          source: new VectorSource({ features: [iconFeature] }),
        }),
      ],
      target: document.getElementById(name) ?? undefined,
      view: new View({
        center: fromLonLat(coordinates),
        zoom: 7,
      }),
      controls: defaults({ attribution: false }).extend([attribution]),
    });

    /**
     * Tooltip
     */

    const element = document.getElementById(`${name}-tooltip`);

    if (element) {
      let currentFeature: any;

      const displayFeatureInfo = function (
        pixel: number[],
        target: HTMLElement
      ) {
        const feature = target.closest(".ol-control")
          ? undefined
          : map.forEachFeatureAtPixel(pixel, function (feature) {
              return feature;
            });

        if (feature) {
          element.style.left = pixel[0] + "px";
          element.style.top = pixel[1] + "px";
          if (feature !== currentFeature) {
            element.style.visibility = "visible";
            element.innerText = capitalize(feature.get("name"));
          }
        } else {
          element.style.visibility = "hidden";
        }

        currentFeature = feature;
      };

      // display tooltip on hover
      map.on("pointermove", function (evt) {
        if (evt.dragging) {
          element.style.visibility = "hidden";
          currentFeature = undefined;
          return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel, evt.originalEvent.target);
      });
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [name]);

  return (
    <Box
      id={name}
      width="200px"
      height="200px"
      position="absolute"
      top="70px"
      right={0}
    >
      <div
        id={`${name}-tooltip`}
        style={{
          position: "absolute",
          display: "inline-block",
          zIndex: 999,
          backgroundColor: "#4fb093",
          color: "#E6FFFA",
          textAlign: "center",
          borderRadius: "5px",
          border: "2px solid #319795",
          padding: "6px",
          left: "50%",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      ></div>
    </Box>
  );
};
