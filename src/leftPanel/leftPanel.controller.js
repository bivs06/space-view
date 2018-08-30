export default class leftPanelController {
    constructor($scope, $mdSidenav) {
    	this._$scope = $scope;
    	this._$mdSidenav = $mdSidenav;

    	this.openLeftMenu = false;
    	this.showOpenPanelBtn = true;

        this.layers = ['Data Centers', 'vCenters', 'Clusters', 'Hosts', 'Virtual Machines']

        this.toggleLeftPanel = this.buildToggler();
    }

    buildToggler() {
        return () => {
            this._$mdSidenav('left').toggle();
        };
    }

    onLeftPanelToggle(option) {
    	this.showOpenPanelBtn = option === 'close' ? true : false;
    }
}