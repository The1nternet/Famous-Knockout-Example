define([
    'knockout',
    'text!./family-history.html',
    "famous/core/Surface",
    "events/rebind"
], function(ko, templateMarkup, Surface, rebind) {

    var COMPONENT_CLASS = "family-history-cont";
    var lightbox;
    var message = ko.observable('HELLO FAMILY HISTORY!');

    var body = new Surface({
        size: [undefined, undefined],
        content: templateMarkup,
        classes: [COMPONENT_CLASS, "green-bg"],
        properties: {
//            lineHeight: "200px",
            textAlign: "left",
            padding: "20px"
        }
    });

    function CreateView() {
        lightbox.show(body);
    }

    function FamilyHistory(params) {

        var self = this;
        self.message = message;
        lightbox = params.container;
        CreateView();

        rebind.dispatch('.' + COMPONENT_CLASS, self);

    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    FamilyHistory.prototype.dispose = function() {
    };

    return { viewModel: FamilyHistory, template: '<span style="display: none;"></span>' };

});
