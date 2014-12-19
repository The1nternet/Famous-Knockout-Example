define([
    "knockout",
    "jquery",
    "text!./home.html",
    "events/rebind",
    "famous/core/Surface",
    "./homeView"
], function(ko, $, homeTemplate, rebind, Surface, home) {
    var renderController;

    var PAGES = [
        {
            name: 'Patient History',
            component: 'patient-history'
        },
        {
            name: 'Family History',
            component: 'family-history'
        },
        {
            name: 'Social History',
            component: 'social-history'
        },
        {
            name: 'Allergies | Meds',
            component: 'allergies'
        },
        {
            name: 'Health Review',
            component: 'health-review'
        },
        {
            name: 'Problems/Meds/Labs',
            component: 'problems-meds'
        },
        {
            name: 'Visits Detail',
            component: 'visits-detail'
        },
        {
            name: 'Download/Transmit',
            component: 'download-transmit'
        },
        {
            name: 'Messaging',
            component: 'messaging'
        }
    ];

    var body = new home(PAGES);

    function CreateView() {
        renderController.show(body);
    }

    function HomeComponentViewModel(params) {
        var self = this;
        self.body = body.lightbox;
        self.currentSection = body.currentSection;
        renderController = params.container;
        CreateView();
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    HomeComponentViewModel.prototype.dispose = function() {
    };

    return { viewModel: HomeComponentViewModel, template: homeTemplate };
});
