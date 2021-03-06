export default class leftPanelController {
    constructor($rootScope, $mdSidenav, $element, layerManagerService, mapService) {
    	this._$rootScope = $rootScope;
        this._$element = $element;
    	this._$mdSidenav = $mdSidenav;
        this._mapService = mapService;
        this._layerManagerService = layerManagerService;

    	this.openLeftMenu = false;

        this.layers = ['Data Centers', 'vCenters', 'Clusters', 'Hosts', 'Virtual Machines'];
        this.perspectives = {
            'cost': 'Cost',
            'capacity': 'Capacity',
            'compliance': 'Compliance',
            'performance': 'Performance',
            'availability': 'Availability'
        };
    }

    $onInit() {
        this._layerManagerService.selectedPerspective = 'cpu';
        setTimeout(() => {
            this._$rootScope.$broadcast('leftPanel:onPerspectiveChange', ['Performance']);
            this.prevSelectedAspectElem = this._$element.find('#capacity')[0];
            this.prevSelectedAspectElem.classList.add('selected-aspect');
        });
    }

    onPerspectiveChange(selectedPerspective, event) {
        let tempPerspective;

        if (selectedPerspective === 'performance' || selectedPerspective === 'availability' || selectedPerspective === 'compliance') {
            tempPerspective = 'cpu';
        } else {
            tempPerspective = 'capacity';
        }

        this._layerManagerService.selectedPerspective = tempPerspective;
        this._$rootScope.$broadcast('leftPanel:onPerspectiveChange', [this.perspectives[selectedPerspective]]);

        this.prevSelectedAspectElem.classList.remove('selected-aspect');
        event.currentTarget.classList.add('selected-aspect');
        this.prevSelectedAspectElem = event.currentTarget;

        let baseMap = this._mapService.getMap('baseMap');

        baseMap.getInteractions().pop();
        baseMap.getLayers().getArray()[1].getSource().changed();
        this._mapService.getMap('baseMap').getLayers().getArray().pop();
        this._layerManagerService.addClusterLayer(this._mapService.getLayersList().get('dataCenters').dataCenters);
        this._mapService.getMap('clusterBaseLeft') ? this._mapService.getMap('clusterBaseLeft').getLayers().getArray()[0].getSource().changed() : null;
        this._mapService.getMap('clusterBaseMiddle') ? this._mapService.getMap('clusterBaseMiddle').getLayers().getArray()[0].getSource().changed() : null;
        this._mapService.getMap('clusterBaseRight') ? this._mapService.getMap('clusterBaseRight').getLayers().getArray()[0].getSource().changed() : null;
    }
}