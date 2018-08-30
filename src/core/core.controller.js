import {Map, View,} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {XYZ, Stamen, BingMaps} from 'ol/source';

export default class coreController {
    constructor() {
        new Map({
            target: 'spaceViewMap',
            layers: [
                // new TileLayer({
                //     source: new XYZ({
                //         url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                //     })
                // })

                // new TileLayer({
                //     source: new Stamen({
                //         layer: 'toner'
                //     })
                // })

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
}