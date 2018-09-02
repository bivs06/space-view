import TileLayer from 'ol/layer/Tile';
import { BingMaps } from 'ol/source';

export default class coreController {
    constructor($http, mapService, layerManagerService) {
        this._$http = $http;
        this._mapService = mapService;
        this._layerManagerService = layerManagerService;

        this._getLayers();
    }

    $onInit() {
        let map = this._mapService.createMap('spaceViewMap', [0, 2000000]);

        let baseLayer = new TileLayer({
            source: new BingMaps({
                key: 'AnXBanw_ISXuSTWNsbhn2RS7m3lua1M3XTehRuk0Xm3dJT3IlbupeJf_By1I5cGY',
                imagerySet: 'Road'
            })
        });

        map.addLayer(baseLayer);

        this._mapService.setMap(map, 'baseMap');

        // map.on('pointermove', (event) => {
        // 	var coordinates = event.coordinate;
        //     this.positionX = coordinates[0].toFixed(2);
        //     this.positionY = coordinates[1].toFixed(2);
        //     this.zoomLevel = map.getView().getZoom();

        //     console.log('X '+ this.positionX)
        //     console.log('Y '+ this.positionY)
        //     console.log('Zoom '+ this.zoomLevel)
        // })
    }

    _getLayers() {
        this._$http.get('../data/dataCenters.json')
            .then((response) => {
                this._mapService.setLayersList(Object.keys(response.data)[0], response.data);
                this._layerManagerService.addClusterLayer(response.data.dataCenters);
            }, (error) => {
                console.log(error);
            });
    }
}
