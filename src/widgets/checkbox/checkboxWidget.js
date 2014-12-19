/**
 * Created by tylerjones on 11/20/14.
 */

/*
 * Created by tylerjones on 11/18/14.
 */

define([
    "famous/core/View",
    "famous/core/Surface",
    "famous/modifiers/StateModifier",
    "famous/core/Transform"
], function(View, Surface, StateModifier, Transform){

    function _createLayout(self, settings) {
        var bg = new Surface({
            properties: {
                //backgroundColor: "lightgrey",
                borderBottom: "1px solid darkgrey",
                borderRight: "1px solid darkgrey"
            }
        });
        bg.pipe(self._eventOutput);
        self.bgNode.add(bg);

        var tempContent = settings.name;
        var temp = new Surface({
            content: tempContent,
            properties: {
                padding: "17px 0 0 3px",
                color: "black",
                textAlign: "left",
                lineHeight: "10px",
                fontSize: "11px"
            }
        });
        temp.pipe(self._eventOutput);
        self.textNode.add(temp);

        var box = new Surface({
            classes: ['fa', 'fa-square-o', 'fa-lg'],
            properties: {
                padding: "0 0 0 3px"
            }
        });
        box.pipe(self._eventOutput);
        self.boxMod.add(box);

        var clicked = false;
        self.on('click', function() {
            if(clicked) {
                box.removeClass('fa-check-square-o');
                box.addClass('fa-square-o');
            } else {
                box.removeClass('fa-square-o');
                box.addClass('fa-check-square-o');
            }
            clicked = !clicked;
        });
    }

    function Constructor(settings){
        var self = this;
        View.apply(self, arguments);
        var bgMod = new StateModifier();
        self.bgNode = self.add(bgMod);
        var textMod = new StateModifier({
            size: [114, 44],
            origin: [1, 0.5],
            align: [1, 0.5]
        });
        self.textNode = self.add(textMod);
        var size = self.getSize();
        console.log("THE SIZE IS: " + size);
        var boxMod = new StateModifier({
            size: [16, 11],
            origin: [0, 0.5],
            align: [0, 0.5]
        });
        self.boxMod = self.add(boxMod);
        _createLayout(self, settings);
    }

    Constructor.prototype = Object.create(View.prototype);
    Constructor.prototype.constructor = Constructor;

    Constructor.DEFAULT_OPTIONS = {
        size: [undefined, undefined]
    };

    return Constructor;
});


