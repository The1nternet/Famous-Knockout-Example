define([
    'knockout',
    "famous/core/Surface",
    "events/rebind",
    "./container"
], function(ko, Surface, rebind, PageContainer) {

    var COMPONENT_CLASS = "patient-history-cont";
    var parentLightbox;

    function CreateView() {
        var self = this
        var body = new PageContainer({
            className: COMPONENT_CLASS,
            viewModel: self
        });
        body.pipe(parentLightbox);
        parentLightbox.show(body);
    }

    function PatientHistory(params) {
        var self = this;
        self.medical = {
            items: ko.observableArray(['cloption 1', 'cloption 2', 'cloption 3', 'cloption 4']),
            selectedItems: ko.observableArray(),
            currentItem: ko.observable()
        };
        parentLightbox = params.container;
        CreateView.call(self);

        rebind.dispatch('.' + COMPONENT_CLASS, self);
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    PatientHistory.prototype.dispose = function() {
    };

    return { viewModel: PatientHistory, template: '<span style="display: none;"></span>' };

});
