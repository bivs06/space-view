import 'angular';
// import '../../resources/img/OBM.svg';
import headerComponet from './header.component';

const MODULE_NAME = 'header',
	appDependencies = [];

angular.module(MODULE_NAME, appDependencies)
	.component('spaceViewHeader', headerComponet);

export default MODULE_NAME;
