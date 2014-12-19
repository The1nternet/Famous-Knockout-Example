/**
 * Created by tylerjones on 12/3/14.
 */

define([
    "knockout",
    "handlebars",
    "lodash",
    "famous/core/view",
    "famous/modifiers/StateModifier",
    "famous/core/Surface",
    "famous/core/Transform",
    "text!./selectWidget.html"
], function(ko, Handlebars, _, View, StateModifier, Surface, Transform, templateHtml){

    var _items;
    var _currentItem;
    var _selectedItems;
    function _createLayout(){
        var self = this;

        var bgMod = new StateModifier({
            size: [undefined, undefined]
        });
        self.bgNode = self.add(bgMod);
        var bg = new Surface({
            properties: {
                border: '1px solid black',
                backgroundColor: 'red'
            }
        });
        bg.pipe(self._eventOutput);
        self.bgNode.add(bg);

        var selectMod = new StateModifier({
            size: [150, 20]
        });
        self.selectNode = self.add(selectMod);
        var template = Handlebars.compile(templateHtml);
        var selectContainer = new Surface({
            content: template({nameSpace: self.options.nameSpace}),
            properties: {
                padding: '5px'
            }
        });
        selectContainer.pipe(self._eventOutput);
        self.selectNode.add(selectContainer);

        var buttonMod = new StateModifier({
            size: [75, 25],
            transform: Transform.translate(100, 5, 0)
        });
        self.buttonNode = self.add(buttonMod);
        var button = new Surface({
            content: 'add',
            properties: {
                border: '1px solid black',
                backgroundColor: 'white',
                padding: '5px'
            }
        });
        button.on('click', function(event){
            var item = _currentItem();
            if(item && !_.contains(_selectedItems(), item)){
                _selectedItems.push(item);
            }
            console.log('BUTTON CLICKED!!!');
        });
        button.pipe(self._eventOutput);
        self.buttonNode.add(button);
    }

    function Constructor(){
        var self = this;
        View.apply(self, arguments);

        _items = self.options.items;
        _currentItem = self.options.currentItem;
        _selectedItems = self.options.selectedItems;

        _createLayout.call(self);
    }

    Constructor.prototype = Object.create(View.prototype);
    Constructor.prototype.constructor = Constructor;

    Constructor.DEFAULT_OPTIONS = {
        size: [50, 10],
        nameSpace: '',
        items: null,
        selectedItems: null,
        currentItem: null
    };

    return Constructor;

});
