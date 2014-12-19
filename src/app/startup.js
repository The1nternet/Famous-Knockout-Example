define(['jquery', 'knockout', 'events/rebind', 'bootstrap', 'knockout-projections'], function($, ko, rebind) {

    var self = this;
    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
    ko.components.register('master-page', { require: 'components/master-page/master' });
    ko.components.register('home-page', { require: 'components/home-page/home-component' });
    ko.components.register('my-info-page', { require: 'components/my-info/my-info' });
    ko.components.register('help-page', { require: 'components/help/help' });
    ko.components.register('patient-history', { require: 'components/patient-history/patient-history' });
    ko.components.register('family-history', { require: 'components/family-history/family-history' });

    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
//    ko.applyBindings({ route: router.currentRoute });
    ko.applyBindings();

    function onRebind() {
//        ko.cleanNode($('#page-container')[0]);
//        ko.applyBindings(self, $('#page-container')[0]);
    }

    rebind.add(onRebind);

});
