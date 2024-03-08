<script setup>
import { onMounted } from 'vue';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Card from './Card.vue';
import geojson from './../data/world-geojson.json'

const props = defineProps({
    data: Array,
})

const tileLayerUrl =
    "https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYm9id2F0Y2hlcngiLCJhIjoiY2xiMGwwZThrMWg3aTNwcW1mOGRucHh6bSJ9.kNHlmRqkRSxYNeipcKkJhw";

const initData = () => {
    // map data visitor to geojson properties
    geojson.features = geojson.features.map((feature) => {
        const data = props.data.find((item) => item.name === feature.properties.name);
        feature.properties.visitors = data ? data.value : 0;
        return feature;
    });
};

onMounted(() => {
    initData();

    // const map set view to world
    const map = L.map("map", { zoomControl: false }).setView([40, 0], 1);
    // add tileLayer to map
    L.tileLayer(tileLayerUrl, {
        maxZoom: 18,
        opacity: 0,
    }).addTo(map);

    map.scrollWheelZoom.disable();
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();

    // add geojson to map
    const geo = L.geoJSON(geojson, {
        style: function (feature) {
            return {
                color: '#fff',
                weight: 0.5,
                fillColor: feature.properties.visitors > 0 ? "#03b6fc" : "#e2e2e2",
                fillOpacity: 0.6,
            };
        },
    }).addTo(map);

    // add hover on each country
    geo.eachLayer((layer) => {
        layer.on("mouseover", function (e) {
            layer.setStyle({
                fillOpacity: 1,
            });
        });
        layer.on("mouseout", function (e) {
            layer.setStyle({
                fillOpacity: 0.6,
            });
        });

        // show tooltip on hover
        layer.bindTooltip(
            `<div class="text-center">${layer.feature.properties.name}<br>${layer.feature.properties.visitors} visitors</div>`,
            {
                direction: "top",
                offset: [0, -10],
                opacity: 1,
                className: "bg-white text-gray-800",
            }
        );

        // add click event to each country
        layer.on("click", function (e) {
            console.log(layer.feature.properties.name);
        });
    });
});

</script>

<template>
    <div class="w-[100%] h-[450px]">
        <div id="map" style="height: 100%; width: 100%"></div>
    </div>
</template>

<style>
.leaflet-container {
    background-color: transparent;
    outline: none;
}
</style>