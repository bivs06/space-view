import {Map, View,} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {XYZ, Stamen, BingMaps} from 'ol/source';

export default class coreController {
    constructor($http, mapService) {
    	this._$http = $http;
    	this._mapService = mapService;

    	this._getLayers();
    }

    $onInit() {
        let map = this._createMap();
        this._mapService.setMap(map);
    }

    _createMap() {
    	return new Map({
            target: 'spaceViewMap',
            layers: [
                new TileLayer({
                    source: new BingMaps({
                        key: 'AnXBanw_ISXuSTWNsbhn2RS7m3lua1M3XTehRuk0Xm3dJT3IlbupeJf_By1I5cGY',
                        imagerySet: 'Road'
                    })
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2.8
            })
        });
    }

    _getLayers() {
    	this._$http.get('../data/dataCenters.json')
    		.then((response) => {
    			this._mapService.setLayers(Object.keys(response.data)[0], response.data);
    		}, (error) => {
    			console.log(error);
    		});

    	this._$http.get('../data/vCenters.json')
    		.then((response) => {
    			this._mapService.setLayers(Object.keys(response.data)[0], response.data);
    		}, (error) => {
    			console.log(error);
    		});

    	this._$http.get('../data/clusters.json')
    		.then((response) => {
    			this._mapService.setLayers(Object.keys(response.data)[0], response.data);
    		}, (error) => {
    			console.log(error);
    		});

    	this._$http.get('../data/hosts.json')
    		.then((response) => {
    			this._mapService.setLayers(Object.keys(response.data)[0], response.data);
    		}, (error) => {
    			console.log(error);
    		});

    }
}