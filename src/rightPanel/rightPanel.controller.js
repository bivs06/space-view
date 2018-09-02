export default class rightPanelController {
    constructor($scope, $mdSidenav) {
        this._$scope = $scope;
        this._$mdSidenav = $mdSidenav;

        this.openRightMenu = false;
        this.toggleRightPanel = this.buildToggler();
    }

    $onInit() {
    	this._$scope.$on('leftPanel:onPerspectiveChange', (event, data) => {
        	this.selectedPerspective = data[0];
        });

        this.featureDetailsList = [{
            'status': '#D50000',
            'featureName': 'CPU Usage',
            'currentValue': '95%'
        }, {
            'status': '#2E7D32',
            'featureName': 'Memory Usage',
            'currentValue': '25%'
        }, {
            'status': '#2E7D32',
            'featureName': 'Avg. I/O Latency',
            'currentValue': '12'
        }, {
            'status': '#D50000',
            'featureName': 'CPU Ready Percentage',
            'currentValue': '93%'
        }, {
            'status': '#D50000',
            'featureName': 'Snapshot Count',
            'currentValue': '12'
        }, {
            'status': '#2E7D32',
            'featureName': 'Network Packet Rate',
            'currentValue': '332'
        }, {
            'status': '#f0f0f0',
            'featureName': 'System Up Time',
            'currentValue': '3 Days 12 hrs'
        }]
    }

    buildToggler() {
        return () => {
            let leftPanel = this._$mdSidenav('left_panel'),
                rightPanel = this._$mdSidenav('right_panel');
            if (leftPanel.isOpen() && !rightPanel.isOpen()) {
                leftPanel.toggle();
            }

            rightPanel.toggle();
        };
    }
}