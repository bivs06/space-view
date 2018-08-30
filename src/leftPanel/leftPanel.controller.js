export default class leftPanelController {
    constructor($scope, $mdSidenav) {
    	this._$scope = $scope;
    	this._$mdSidenav = $mdSidenav;

    	this.openLeftMenu = false;
    	this.showOpenPanelBtn = true;


        this.toggleLeftPanel = this.buildToggler();

        // function buildToggler(componentId) {
        // 	this.showOpenPanelBtn = option === 'close' ? true : false;
        //     return function() {
        //         $mdSidenav(componentId).toggle();
        //     };
        // }


        // $scope.toggle = angular.noop;
        // $scope.isOpen = function() {
        //     return false;
        // };
    }

    buildToggler() {
        return () => {
            this._$mdSidenav('left').toggle();
        };
    }

    onLeftPanelToggle(option) {
    	this.showOpenPanelBtn = option === 'close' ? true : false;
    }

    // toggleLeftPanel() {
    // 	// this.showOpenPanelBtn = option === 'close' ? true : false;
    // 	return function() {
    // 		this._$mdSidenav('left').toggle();
    // 	}
    // 	// function buildToggler(componentId) {
    //  //        return function() {
    //  //            $mdSidenav('left').toggle();
    //  //        };
    //  //    }
    // }
}