/**
 * Created by tylerjones on 12/4/14.
 */

define([
    "knockout",
    "lodash",
    "famous/core/view",
    "famous/modifiers/StateModifier",
    "famous/core/Surface",
    "famous/core/Transform",
    "famous/utilities/Timer",
    "famous/views/ScrollContainer",
    "famous/core/RenderNode"
], function(ko, _, View, StateModifier, Surface, Transform, Timer, ScrollContainer, RenderNode) {

    var _context;

    function _createLayout(){
        var self = this;

        self.scrollContainer = new ScrollContainer();
        self.scrollContainer.sequenceFrom(self.scrollItems);
        self.scrollContainer.pipe(self._eventOutput);
        self.add(self.scrollContainer);
    }

    function _addItem(i, itemValue){
        var temp = new Surface({
            size: [undefined, 35],
            content: itemValue,
            properties: {
                color: 'black',
                border: '1px solid black',
                backgroundColor: 'white',
                padding: '5px'
            }
        });
        temp._i = i;
        temp.on('click', (function(valueToRemove) {
            return function(){
                _context.items.remove(valueToRemove);
            }
        })(itemValue));
        temp.pipe(_context.scrollContainer);
        _context.scrollItems.push(temp);
    }

    function _removeItem(index){
        _context.scrollItems.splice(index, 1);

        for(var i = 0; i < _context.scrollItems.length; i++) {
            _context.scrollItems[i]._i = i;
        }
    }

    function _syncCollections(items){
        console.log('selected items:');
        console.log(items);
        for(var i = 0; i < items.length; i++){
            if(items[i].status === 'added') {
                _addItem(items[i].index, items[i].value);
            } else if(items[i].status === 'deleted'){
                _removeItem(items[i].index)
            }
        }
    }

    function Constructor(){
        var self = this;
        View.apply(self, arguments);

        self.items = self.options.items;
        self.items.subscribe(_syncCollections, null, 'arrayChange');
        self.scrollItems = [];

        _context = self;

        _createLayout.call(self);
    }

    Constructor.prototype = Object.create(View.prototype);
    Constructor.prototype.constructor = Constructor;

    Constructor.DEFAULT_OPTIONS = {
        size: [undefined, undefined],
        items: null
    };

    return Constructor;
});
