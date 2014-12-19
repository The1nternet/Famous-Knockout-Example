/**
 * Created by tylerjones on 9/13/14.
 */

define([
    "knockout",
    "lodash",
    "app/globals",
    "famous/core/Engine",
    "famous/core/View",
    "famous/views/HeaderFooterLayout",
    "famous/views/Lightbox",
    "famous/modifiers/StateModifier",
    "famous/views/ScrollView",
    "famous/views/ScrollContainer",
    "famous/core/Transform",
    "famous/core/Surface",
    "famous/surfaces/ContainerSurface",
    "famous/transitions/Easing",
    "events/rebind"
], function(ko, _, globals, Engine, View, HeaderFooterLayout, Lightbox, StateModifier, ScrollView, ScrollContainer, Transform, Surface, ContainerSurface, Easing, rebind) {

    var SCROLL_WIDTH = 250;

    var PAGES = null;

    var layout = new HeaderFooterLayout({
        headerSize: 250,
        footerSize: 0,
        direction: 0
    });

    function _getLightboxSize(){
        var self = this;
        var contextSize = globals.context.getSize();
        var lightboxSize = self.options.lightboxOpts.size;
        return [contextSize[0] - SCROLL_WIDTH, lightboxSize[1]];
    }

    function _createScrollview() {
        var self = this;
        var container = new ContainerSurface({
            attributes: {
                id: "nav-list"
            },
            size: self.options.scrollviewOpts.size,
            properties: {
                overflow: 'hidden'
            }
        });
        var surfaces = [];
        var previousActiveItem = null;

        self.scrollview = new ScrollView(self.options.scrollviewOpts);
        self.scrollview.sequenceFrom(surfaces);

        PAGES.forEach(function(value, i){

            var currentPage = PAGES[i];
            var temp = new Surface({
                //content: "" + currentPage.name + "",
                size: [undefined, 50],
                classes: ["nav", "nav-list-item"],
                attributes: {
                    "data-bind": "text: '" + currentPage.name + "'"
                },
                properties: {
                    lineHeight: "50px",
                    textAlign: "left",
                    padding: "0 0 0 10px",
                    borderBottom: "1px solid lightgray",
                    borderRight: "1px solid lightgray"
                }
            });
            temp.on('click', function(){
                if(previousActiveItem) {
                    previousActiveItem.removeClass("active");
                }
                temp.addClass("active");
                previousActiveItem = temp;
                self.currentSection(value.component);
                console.log("CLICKED: " + currentPage.component);
            });
            temp.pipe(self.scrollview);
            surfaces.push(temp);

        });

        container.add(self.scrollview);
        self.scrollviewNode.add(container);
        return container;
    }

    function _createLightbox() {
        var self = this;
        self.lightbox = new Lightbox(self.options.lightboxOpts);

        // cannot scroll a lightbox
        // scrolling has to happen within each item
        // displayed by the lightbox
        self.lightboxNode.add(self.lightbox);

        /*
        this code doesn't work because you cannot scroll a lightbox
        var container = new ContainerSurface({
            size: self.options.lightboxOpts.size,
            properties: {
                overflow: 'hidden'
            }
        });
        var scrollView = new ScrollView({
            size: self.options.lightboxOpts.size
        });
        var scrollItems = [];
        scrollView.sequenceFrom(scrollItems);
        self.lightbox.pipe(scrollView);
        scrollItems.push(self.lightbox);
        container.add(scrollView);
        self.lightboxNode.add(container);
        */

        /*
        var scrollContainer = new ScrollContainer();
        var scrollItems = [];
        scrollContainer.sequenceFrom(scrollItems);
        for(var i = 0; i< 35; i++) {
            var temp = new Surface({
                size: [undefined, 20],
                classes: ['test-item'],
                content: '<p>YO FROM A SURFACE: ' + i + '</p>'
            });
            temp.pipe(scrollContainer);
            scrollItems.push(temp);
        }
        self.lightboxNode.add(scrollContainer);
        */
    }

    function HomeView(pagesArray) {
        var self = this;
        View.apply(self, arguments);
        PAGES = pagesArray;

        self.lightboxModifier = new StateModifier({
            size: [undefined, undefined]
            //origin: [0, 0],
            //align: [0, 0]
        });

        self.lightboxNode = layout.content.add(self.lightboxModifier);

        self.scrollviewModifier = new StateModifier({
            size: [undefined, undefined]
            //origin: [0, 0],
            //align: [0, 0]
        });

        self.scrollviewNode = layout.header.add(self.scrollviewModifier);

        self.add(layout);

        _createScrollview.call(self);
        _createLightbox.call(self);

        self.currentSection = ko.observable(PAGES[0].component);

        rebind.dispatch('#nav-list', self);
    }

    HomeView.prototype = Object.create(View.prototype);
    HomeView.prototype.constructor = HomeView;

    HomeView.DEFAULT_OPTIONS = {
        size: [undefined, undefined],
        lightboxOpts: {
            size: [undefined, undefined],

            // 'in' state
            //inTransform: [Transform.scale(0.001, 0.001, 0.001), Transform.rotateZ(1)],
            inTransform: Transform.thenScale(Transform.multiply(Transform.rotateZ(0.5), Transform.rotateX(0.5)), [0.001,0.001,0.001]),
            //inTransform: Transform.multiply(Transform.multiply(Transform.translate(1000, 0, 0), Transform.scale(0.001,0.001,0.001)), Transform.multiply(Transform.rotateZ(3), Transform.rotateY(2))),
            inOpacity: 0,
            inOrigin: [0.5, 0.5],
            inAlign: [0.5,0.5],

            // 'show' state
            showTransform: Transform.identity,
            showOpacity: 1,
            showOrigin: [0.5, 0.5],
            showAlign: [0.5, 0.5],

            // 'out' state
            outTransform: Transform.thenScale(Transform.rotateZ(-0.5), [0.001, 0.001, 0.001]),
            outOpacity: 0,
            outOrigin: [0.5, 0.5],
            outAlign: [0.5, 0.5],

            // transition parameters
            inTransition: { duration: 550, curve: Easing.outQuad },
            outTransition: { duration: 350, curve: Easing.inQuad },
            overlap: false
        },
        scrollviewOpts: {
            size: [SCROLL_WIDTH, undefined]
        }
    };

    return HomeView;

});
