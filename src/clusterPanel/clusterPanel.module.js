import 'angular';
import clusterPanelComponet from './clusterPanel.component';

const MODULE_NAME = 'clusterPanel',
	appDependencies = [];

angular.module(MODULE_NAME, appDependencies)
	.component('clusterPanel', clusterPanelComponet);

export default MODULE_NAME;
