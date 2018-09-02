import { Map as DefaultMap, View} from 'ol';

export default class mapService {
	constructor() {
		this._map = new Map();
	}

    createMap(target, center) {
        return new DefaultMap({
            target: target,
            layers: [],
            view: new View({
                center: center,
                zoom: 2.8,
                minZoom: 2.63,
            })
        });
    }

	getMap(key) {
		return this._map.get(key);
	}

	setMap(map, key) {
		this._map.set(key, map);
	}

	getLayersList() {
		return this._layers;
	}

	setLayersList(layerName, layers) {
		this._layers = this._layers || new Map();
		this._layers.set(layerName, layers)
	}
}
