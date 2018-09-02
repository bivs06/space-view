import 'angular';
import headerModule from '../header/header.module';
import leftPanelModule from '../leftPanel/leftPanel.module';
import rightPanelModule from '../rightPanel/rightPanel.module';
import clusterPanelModule from '../clusterPanel/clusterPanel.module';

import coreComponet from './core.component';
import mapService from '../map.service';
import layerManagerService from '../layerManager.service';

const MODULE_NAME = 'core',
	appDependencies = [headerModule, leftPanelModule, rightPanelModule, clusterPanelModule];

angular.module(MODULE_NAME, appDependencies)
	.component('spaceViewCore', coreComponet)
	.service('mapService', mapService)
	.service('layerManagerService', layerManagerService);

export default MODULE_NAME;
