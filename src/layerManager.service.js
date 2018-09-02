import '../lib/fontmaki.css';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { get as getProjections } from 'ol/proj/projections';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import DragPan from 'ol/interaction/DragPan';
import SelectCluster from 'ol-ext/interaction/SelectCluster';
import featureAnimation from 'ol-ext/featureanimation/featureAnimation';
import { Cluster, Vector as VectorSource } from 'ol/source';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style';
import Chart from 'ol-ext/style/Chart';
import FontSymbol from 'ol-ext/style/FontSymbol';
import FontMakiDef from 'ol-ext/style/FontMakiDef';

export default class layerManager {
    constructor($compile, $mdSidenav, mapService) {
        this._$compile = $compile;
        this._$mdSidenav = $mdSidenav;
        this._mapService = mapService;
        this.selectedPerspective = '';

        this.statusColor = {
            'cpu': {
                'low': '#43A047',
                'medium': '#FFA726',
                'high': '#D50000'
            },
            'capacity': {
                'low': '#D50000',
                'medium': '#FFA726',
                'high': '#2E7D32'
            }
        };
    }

    addClusterLayer(layerFeaturesList) {
        let featuresList = [];

        layerFeaturesList.forEach((featureObj) => {
            let feature;

            if (featureObj.dataCenters) {
                let features = this._getFeaturesFromLayerObj(featureObj.dataCenters)
                featuresList = featuresList.concat(features);
            } else {
                feature = new Feature({
                    'name': featureObj.name,
                    'status': this.statusColor[this.selectedPerspective][featureObj[this.selectedPerspective]],
                    'featureCount': parseInt(featureObj.featureCount),
                    'labelPoint': new Point([parseInt(featureObj.latitude), parseInt(featureObj.longitude)])
                });
                feature.setGeometryName('labelPoint');
                featuresList.push(feature);
            }
        });

        let source = new VectorSource({
            features: featuresList
        });

        let projection = getProjections('EPSG:3857');

        // Cluster source
        let clusterSource = new Cluster({
            distance: 100,
            source: source,
            projection: projection
        });

        clusterSource.getSource().clear();
        clusterSource.getSource().addFeatures(featuresList);

        // Animated cluster layer
        var clusterLayer = new AnimatedCluster({
            name: 'My Cluster',
            source: clusterSource,
            style: this._getStyle.bind(this)
        });

        let map = this._mapService.getMap('baseMap');
        map.addLayer(clusterLayer);

        this._addInteraction(map, this._getStyle.bind(this));
    }

    _addInteraction(map, style) {
        // Select interaction to spread cluster out and select features
        let selectCluster = new SelectCluster({ // Point radius: to calculate distance between the features
            pointRadius: 30,
            animate: true,
            // Feature style when it springs apart
            featureStyle: (feature, resolution) => {
                let featuresList = feature.get('features');
                let statusColor = featuresList ? featuresList[0].get('status') : '#000000';

                return [new Style({
                    image: new Circle({
                        radius: 11,
                        stroke: new Stroke({
                            color: "#ffffff",
                            width: 1
                        }),
                        fill: new Fill({
                            color: statusColor
                        })
                    })
                })];
            },
            // selectCluster: false,	// disable cluster selection
            // Style to draw cluster when selected
            style: (f, res) => {
                var cluster = f.get('features');
                if (cluster.length > 1) {
                    return style(f, res);
                } else {
                    return [
                        new Style({
                            image: new Circle({
                                stroke: new Stroke({ color: "rgba(0,0,192,0.5)", width: 3 }),
                                fill: new Fill({ color: "#FF0266" }),
                                radius: 10
                            })
                        })
                    ];
                }
            }
        });
        map.addInteraction(selectCluster);

        // On selected => get feature in cluster and show info
        selectCluster.getFeatures().on(['add'], (e) => {
            let cluster = e.element.get('features');
            if (cluster.length === 1) {
                let leftPanel = this._$mdSidenav('left_panel'),
                    rightPanel = this._$mdSidenav('right_panel');
                if (leftPanel.isOpen() && !rightPanel.isOpen()) {
                    leftPanel.toggle();
                }

                rightPanel.toggle();

                let feature = cluster[0];
            } else if (cluster.length > 60) {
                let leftPanel = this._$mdSidenav('left_panel'),
                    rightPanel = this._$mdSidenav('right_panel'),
                    clusterPanel = this._$mdSidenav('cluster_panel');

                leftPanel.isOpen() ? leftPanel.toggle() : rightPanel.isOpen() ? rightPanel.toggle() : null;

                clusterPanel.isOpen() ? null : clusterPanel.toggle();
                this._addUKClusterLayer(cluster.length);
            }
        })

        selectCluster.getFeatures().on(['remove'], (e) => {
            let rightPanel = this._$mdSidenav('right_panel');
            rightPanel.isOpen() ? rightPanel.toggle() : null;
        })
    }

    _removeDrag(map) {
    	var dragPan;
        map.getInteractions().forEach((interaction) => {
            if (interaction instanceof DragPan) {
                dragPan = interaction;
            }
        });
        
        if (dragPan) {
            map.removeInteraction(dragPan);
        }
    }

    _addUKClusterLayer(totalFeaturesCount) {
    	if (this._mapService.getMap('clusterBaseLeft')) {
    		return;
    	}
        let layersList = this._mapService.getLayersList();
        let UKCluster = layersList.get('dataCenters')['dataCenters'][3]['dataCenters'];

        let featuresList = new Array(UKCluster.length),
            projection = getProjections('EPSG:3857'),
            leftMap = this._mapService.getMap('clusterBaseLeft') ? this._mapService.getMap('clusterBaseLeft') : this._mapService.createMap('cluster_panel_left', [0, 0]),
            middleMap = this._mapService.getMap('clusterBaseMiddle') ? this._mapService.getMap('clusterBaseMiddle') : this._mapService.createMap('cluster_panel_middle', [0, 0]),
            rightMap = this._mapService.getMap('clusterBaseRight') ? this._mapService.getMap('clusterBaseRight') : this._mapService.createMap('cluster_panel_right', [0, 0]),
            x = 2200000,
            y = 3200000;

        this._removeDrag(leftMap);
        this._removeDrag(middleMap);
        this._removeDrag(rightMap);

        this._mapService.setMap(leftMap, 'clusterBaseLeft');
        leftMap.getView().setMinZoom(3.2);
        leftMap.getView().setMaxZoom(3.2);
        this._mapService.setMap(middleMap, 'clusterBaseMiddle');
        middleMap.getView().setMinZoom(3.2);
        middleMap.getView().setMaxZoom(3.8);
        this._mapService.setMap(rightMap, 'clusterBaseRight');
        rightMap.getView().setMinZoom(3.2);
        rightMap.getView().setMaxZoom(3.8);

        for (let i = 0; i < totalFeaturesCount; ++i) {
            var coordinates = [3 * x * Math.random() - x, 3 * y * Math.random() - y];
            featuresList[i] = new Feature({
                'name': UKCluster[i].name,
                'status': this.statusColor[this.selectedPerspective][UKCluster[i][this.selectedPerspective]],
                'labelPoint': new Point(coordinates)
            });

            featuresList[i].set('id', i);
            featuresList[i].set('type', Math.floor(Math.random() * 3))
            featuresList[i].setGeometryName('labelPoint');
        }

        let leftPanelFeaturesList = featuresList.splice(0, featuresList.length / 2),
            rightPanelFeaturesList = featuresList.splice(0, featuresList.length / 4),
            middlePanelFeaturesList = featuresList;

        let leftSource = new VectorSource({
                features: leftPanelFeaturesList
            }),
            middleSource = new VectorSource({
                features: middlePanelFeaturesList
            }),
            rightSource = new VectorSource({
                features: rightPanelFeaturesList
            });

        let leftClusterSource = new Cluster({
                distance: 90,
                source: leftSource,
                projection: projection
            }),
            middleClusterSource = new Cluster({
                distance: 100,
                source: middleSource,
                projection: projection
            }),
            rightClusterSource = new Cluster({
                distance: 200,
                source: rightSource,
                projection: projection
            });

        leftClusterSource.getSource().clear();
        middleClusterSource.getSource().clear();
        rightClusterSource.getSource().clear();

        leftClusterSource.getSource().addFeatures(leftPanelFeaturesList);
        middleClusterSource.getSource().addFeatures(middlePanelFeaturesList);
        rightClusterSource.getSource().addFeatures(rightPanelFeaturesList);

        // Animated cluster layer
        let leftPanelClusterLayer = new AnimatedCluster({
                name: 'My Cluster',
                source: leftClusterSource,
                style: this._getUKClusterStyle.bind(this)
            }),
            middlePanelClusterLayer = new AnimatedCluster({
                name: 'My Cluster',
                source: middleClusterSource,
                style: this._getUKClusterStyle.bind(this)
            }),
            rightPanelClusterLayer = new AnimatedCluster({
                name: 'My Cluster',
                source: rightClusterSource,
                style: this._getUKClusterStyle.bind(this)
            });

        leftMap.addLayer(leftPanelClusterLayer);
        this._addInteraction(leftMap, this._getUKClusterStyle.bind(this));

        middleMap.addLayer(middlePanelClusterLayer);
        this._addInteraction(middleMap, this._getUKClusterStyle.bind(this));

        rightMap.addLayer(rightPanelClusterLayer);
        this._addInteraction(rightMap, this._getUKClusterStyle.bind(this));
        // setTimeout(() => {
        // 	map.render();
        // 	map.getLayers().getArray()[0].getSource().changed();
        // }, 1000)
    }

    _getStyle(feature, resolution) {
        let styleCache = {},
            featuresList = feature.get('features'),
            size = featuresList.length,
            style = styleCache[size],
            clustorFillColor;

        if (size > 1) {
            clustorFillColor = this.statusColor[this.selectedPerspective][this._checkStatus(featuresList)];
        } else {
            clustorFillColor = featuresList[0].get('status');
        }

        let radius = size < 5 ? 12 : size <10 ? 15 : size < 20 ? 20 : size < 1000 ? 30 : 40;

        return [new Style({
            image: new FontSymbol({
                form: 'poi',
                gradient: false,
                fontSize: 1,
                radius: radius,
                rotation: 0,
                rotateWithView: false,
                offsetY: false,
                fill: new Fill({
                    color: clustorFillColor
                }),
                stroke: new Stroke({
                    color: 'red',
                    width: 1
                })
            }),
            text: new Text({
                text: size.toString(),
                fill: new Fill({
                    color: '#fff'
                })
            })
        })]
    };

    _getUKClusterStyle(feature, resolution) {
        let features = feature.get('features');
        let size = features.length,
            styleCache = {};

        // if (size > 1) {
        //     clustorFillColor = this.statusColor[this.selectedPerspective][this._checkStatus(featuresList)];
        // } else {
        //     clustorFillColor = featuresList[0].get('status');
        // }
        // Feature style
        if (size === 1) {
            return this._featureStyle(feature);
        } else { // ClusterStyle
            let data = [1, 2, 3];
            for (let i = 0, f; f = features[i]; i++) data[f.get('type')]++;
            let style = styleCache[data.join(',')];
            if (!style) {
                let radius = Math.min(size + 7, 20);
                style = styleCache[data.join(',')] = new Style({
                    image: new Chart({
                        type: 'pie',
                        radius: (radius * 2),
                        data: data,
                        colors: ['#5C6BC0', '#C5CAE9', '#8C9EFF'],
                        rotateWithView: true,
                        stroke: new Stroke({
                            color: "rgba(0,0,0,0)",
                            width: 0
                        })
                    }),
                    text: new Text({
                        font: '20px sans-serif',
                        text: size.toString(),
                        fill: new Fill({
                            color: '#fff'
                        })
                    })

                });
            }
            return [style];
        }
    };

    // Style for the features
    _featureStyle(f) {
        var form = ['linux', 'windows', 'kvm'];
        var features = f.get('features');
        var size = features.length;
        var styleCache = {};
        if (features) {
            var type = features[0].get('type');
            var style = styleCache[type];
            if (!style) {
                // var color = features[0].get('status');
                var color = '#8C9EFF';
                style = styleCache[type] = new Style({
                    image: new FontSymbol({
                        form: 'circle',
                        radius: 20,
                        color: color,
                        fill: new Fill({
                            color: color
                        }),
                        stroke: new Stroke({
                            color: '#fff',
                            width: 1
                        })
                    }),
                    text: new Text({
                        font: '20px sans-serif',
                        text: size.toString(),
                        fill: new Fill({
                            color: '#ffffff'
                        })
                    })
                });
            }
            return [style];
        } else return [new Style({
            // Draw a link beetween points (or not)
            stroke: new Stroke({
                color: "#fff",
                width: 1
            })
        })];
    }

    _checkStatus(featuresList) {
        let count = {
            'low': 0,
            'medium': 0,
            'high': 0
        };

        featuresList.forEach((featureObj) => {
            count[featureObj[this.selectedPerspective]]++;
        });

        let avg = (count.low + count.medium + count.high) / 3;

        return (avg < 3) ? 'low' : (avg >= 8) ? 'high' : 'medium';
    }

    _getFeaturesFromLayerObj(featuresList) {
        let tempFeaturesList = [];

        featuresList.forEach((featureObj) => {
            if (featureObj.subDataCenters) {
                let features = this._getFeaturesFromLayerObj(featureObj.subDataCenters);
                tempFeaturesList = tempFeaturesList.concat(features);
            } else {
                let tempFeature = new Feature({
                    'name': featureObj.name,
                    'status': this.statusColor[this.selectedPerspective][featureObj[this.selectedPerspective]],
                    'featureCount': parseInt(featureObj.featureCount),
                    'labelPoint': new Point([parseInt(featureObj.latitude), parseInt(featureObj.longitude)])
                });
                tempFeature.setGeometryName('labelPoint');
                tempFeaturesList.push(tempFeature);
            }
        })

        return tempFeaturesList;
    }
}