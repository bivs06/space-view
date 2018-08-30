import 'angular';
// import '../../resources/img/OBM.svg';
import coreComponet from './header.component';

const MODULE_NAME = 'header',
	appDependencies = [];

angular.module(MODULE_NAME, appDependencies)
	.component('spaceViewHeader', coreComponet);

export default MODULE_NAME;
