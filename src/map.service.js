export default class mapService {
	constructor() {

	}

	getMap() {
		return this._map;
	}

	setMap(map) {
		this._map = map;
	}

	getLayers() {
		return this._layers;
	}

	setLayers(layerName, layers) {
		this._layers = this._layers || new Map();
		this._layers.set(layerName, layers)
	}
}
