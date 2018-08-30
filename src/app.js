import 'angular';
import 'angular-aria';
import 'angular-material';
import 'v-accordion';
import 'v-accordion/dist/v-accordion.css';
import 'angular-material/angular-material.css';
import coreModule from './core/core.module';

const MODULE_NAME = 'spaceView',
	appDependencies = ['ngAria', 'ngMaterial', 'ngAnimate', 'vAccordion', coreModule];

let app = angular.module(MODULE_NAME, appDependencies);

angular.element(document)
	.ready(() => {
		angular.bootstrap('body', [MODULE_NAME]);
	});

export default app;