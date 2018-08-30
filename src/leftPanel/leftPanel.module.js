import 'angular';
import leftPanelComponet from './leftPanel.component';

const MODULE_NAME = 'leftPanel',
	appDependencies = [];

angular.module(MODULE_NAME, appDependencies)
	.component('leftPanel', leftPanelComponet);

export default MODULE_NAME;
