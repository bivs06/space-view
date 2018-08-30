import 'angular';
import headerModule from '../header/header.module';
import leftPanelModule from '../leftPanel/leftPanel.module';

import coreComponet from './core.component';
import mapService from '../map.service';

const MODULE_NAME = 'core',
	appDependencies = [headerModule, leftPanelModule];

angular.module(MODULE_NAME, appDependencies)
	.component('spaceViewCore', coreComponet)
	.service('mapService', mapService);

export default MODULE_NAME;
