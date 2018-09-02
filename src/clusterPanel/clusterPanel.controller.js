export default class clusterPanelController {
    constructor($scope, $mdSidenav) {
        this._$scope = $scope;
        this._$mdSidenav = $mdSidenav;

        this.toggleClusterPanel = this.buildToggler();
    }

    $onInit() {
        this._$scope.$on('leftPanel:onPerspectiveChange', (event, data) => {
            this.selectedPerspective = data[0];
        });
    }

    buildToggler() {
        return () => {
            let leftPanel = this._$mdSidenav('left_panel'),
                rightPanel = this._$mdSidenav('right_panel'),
                clusterPanel = this._$mdSidenav('cluster_panel');
            
            leftPanel.isOpen() ? leftPanel.toggle() : rightPanel.isOpen() ? rightPanel.toggle() : null;

            clusterPanel.toggle();
        };
    }
}