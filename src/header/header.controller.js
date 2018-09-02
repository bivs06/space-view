export default class headerController {
    constructor($mdSidenav) {
    	this._$mdSidenav = $mdSidenav;
    	
        this.toggleLeftPanel = this.buildToggler();
    }

    buildToggler() {
        return () => {
            this._$mdSidenav('left_panel').toggle();
        };
    }
}