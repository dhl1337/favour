(() => {
    angular
        .module('favourApp')
        .directive('navBar', navBar);

    function navBar () {
        var directive = {
            templateUrl: '../app/shared/navbar/navView.html',
            controller: NavController,
            controllerAs: 'navCtrl',
            bindToController: true
        };
        return directive;
    }

    function NavController (loginService, MainService) {
        const vm = this;

        vm.logout = logout;
        vm.currentUser = MainService.currentUser();

        vm.logout = () => loginService.logout()

    }
})();