define([
    "knockout",
    "jquery",
    "text!./master.html",
    "text!./quick-nav.html",
    "app/router",
    "app/globals",
    "events/rebind",
    "famous/core/Engine",
    "famous/core/Surface",
    "famous/core/Scene",
    "famous/core/Transform",
    "famous/utilities/Timer",
    "famous/modifiers/StateModifier",
    "famous/views/RenderController",
    "famous/views/Lightbox",
    "famous/views/HeaderFooterLayout",
    "famous/transitions/Easing"
], function(ko, $, masterTemplate, quickNav, router, globals, rebind, Engine, Surface, Scene, Transform, Timer, StateModifier, RenderController, Lightbox, HeaderFooterLayout, Easing) {
    var message = ko.observable("'ello");
    var count = 0;

    var mainContext;
    var lightbox;

    var header = new Surface({
        size: [undefined, 50],
        name: 'container-1',
        content: quickNav,
        classes: ["cont-header"],
        properties: {
            id: 'container-1',
            name: 'container-1',
            lineHeight: "40px",
            textAlign: "left",
            borderBottom: "1px solid black"
        }
    });

    var footer = new Surface({
        size: [undefined, 20],
        classes: ["cont-footer"],
        content: "&nbsp;  &copy; 2014 Phoenix Ortho, LLC",
        properties: {
            fontSize: "small",
            borderTop: "1px solid black",
            textAlign: "center"
        }
    });

    var layout = new HeaderFooterLayout({
        headerSize: 50,
        footerSize: 20
    });

    header.on('click', function() {
        count++;
        message('CLICKED: ' + count);
    });

    Lightbox.DEFAULT_OPTIONS = {

        // 'in' state
        //inTransform: Transform.scale(0.001, 0.001, 0.001),
        inTransform: Transform.thenScale(Transform.translate(1000, 0, 0), [0.8, 0.8, 1]),
        inOpacity: 0,
        inOrigin: [0.5, 0.5],
        inAlign: [0.5, 0.5],

        // 'show' state
        showTransform: Transform.identity,
        showOpacity: 1,
        showOrigin: [0, 0],
        showAlign: [0, 0],

        // 'out' state
        //outTransform: Transform.scale(0.001, 0.001, 0.001),
        outTransform: Transform.thenScale(Transform.translate(-1000, 0, 0), [0.8, 0.8, 1]),
        outOpacity: 0,
        outOrigin: [0.5, 0.5],
        outAlign: [0.5, 0.5],

        // transition parameters
        inTransition: { duration: 500, curve: Easing.outQuad },
        outTransition: { duration: 350, curve: Easing.inQuad },
        overlap: false
    };

    function CreateView() {
        mainContext = Engine.createContext($('#home-page')[0]);
        lightbox = new Lightbox();

        layout.header.add(header);

        var lightboxModifier = new StateModifier({
            size: [undefined, undefined],
            origin: [0, 0],
            align: [0, 0]
        });

        layout.content.add(lightboxModifier).add(lightbox);

        layout.footer.add(footer);

        mainContext.add(layout);

        globals.context = mainContext;

        return mainContext;
    }

    function MasterViewModel() {
        var self = this;
        self.message = message;
        var route = router.currentRoute();
        console.log('ROUTE: ' + JSON.stringify(route));
        CreateView();

        self.body = lightbox;
        self.currentPage = router.currentRoute;

//        rebind.dispatch('#master-page', self);
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    MasterViewModel.prototype.dispose = function() {
    };

    return { viewModel: MasterViewModel, template: masterTemplate };
});
