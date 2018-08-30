import './header.scss';
import './header.template.html';
import coreController from './header.controller';

export default {
	controller: coreController,
	templateUrl: 'header.template.html',
	bindings: {
		title: '@?'
	}
};
