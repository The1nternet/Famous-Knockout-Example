/*
 * Created by tylerjones on 11/18/14.
 */

define([
    "famous/core/view",
    "famous/core/Surface",
    "famous/surfaces/InputSurface",
    "famous/modifiers/StateModifier",
    "famous/views/GridLayout",
    "./checkboxWidget"
], function(View, Surface, InputSurface, StateModifier, GridLayout, CheckboxWidget){

    function _createContainer() {
        var self = this;

        var items = self.options.items;

        var colNum = 3;
        var rowNum = Math.ceil(items.length / colNum);

        var layout = new GridLayout({
            dimensions: [colNum, rowNum]
        });

        var surfaces = [];

        layout.sequenceFrom(surfaces);

        for(var i = 0; i < items.length; i++) {
            var curCheckbox = items[i];
            var temp = new CheckboxWidget(curCheckbox);
            temp.pipe(self._eventOutput);
            surfaces.push(temp);
        }

        self.textNode.add(layout);
        self.form = layout;
    }

    function CheckboxGridWidget(){
        var self = this;
        View.apply(self, arguments);
        var containerMod = new StateModifier({
            size: self.options.size
        });
        self.textNode = self.add(containerMod);
        self.eventInput = self._eventInput;
        _createContainer.call(self);
    }

    CheckboxGridWidget.prototype = Object.create(View.prototype);
    CheckboxGridWidget.prototype.constructor = CheckboxGridWidget;

    CheckboxGridWidget.DEFAULT_OPTIONS = {
        size: [undefined, undefined],
        items: []
    };

    return CheckboxGridWidget;

});

