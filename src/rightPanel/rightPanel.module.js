import 'angular';
import rightPanelComponet from './rightPanel.component';

const MODULE_NAME = 'rightPanel',
	appDependencies = [];

angular.module(MODULE_NAME, appDependencies)
	.component('rightPanel', rightPanelComponet);

export default MODULE_NAME;
