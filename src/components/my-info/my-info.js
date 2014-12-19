define([
    'knockout',
    'text!./my-info.html',
    "famous/core/Surface",
    "events/rebind"
], function(ko, templateMarkup, Surface, rebind) {

    var COMPONENT_CLASS = "my-info-cont";
    var renderController;
    var message = ko.observable('HELLO MY INFO!');

    var body = new Surface({
        size: [undefined, undefined],
        content: templateMarkup,
        classes: [COMPONENT_CLASS, "blue-bg"],
        properties: {
            lineHeight: "200px",
            textAlign: "center"
        }
    });

    function CreateView() {
        renderController.show(body);
    }

    function Form(params) {

        var self = this;
        self.message = message;
        renderController = params.container;
        CreateView();

        rebind.dispatch('.' + COMPONENT_CLASS, self);

    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Form.prototype.dispose = function() {
    };

    return { viewModel: Form, template: '<span style="display: none;"></span>' };

});
