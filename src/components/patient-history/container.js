define([
    "famous/core/view",
    "famous/core/Surface",
    "famous/views/ScrollContainer",
    "famous/modifiers/StateModifier",
    "./contents"
], function(View, Surface, ScrollContainer, StateModifier, Contents){

    var _className = '';
    var _viewModel;

    function _createContainer() {
        var self = this;

        var pageMod = new StateModifier({});
        self.pageNode = self.add(pageMod);
        self.scrollContainer = new ScrollContainer();
        self.scrollContainer.container.setClasses([_className]);
        self.scrollContainer.pipe(self._eventOutput);
        var scrollItems = [];
        self.scrollContainer.sequenceFrom(scrollItems);
        self.contents = new Contents({
            viewModel: _viewModel
        });
        self.contents.pipe(self.scrollContainer);
        scrollItems.push(self.contents);
        self.pageNode.add(self.scrollContainer);
    }

    function Constructor(){
        var self = this;
        View.apply(self, arguments);
        _className = self.options.className;
        _viewModel = self.options.viewModel;
        _createContainer.call(self);
    }

    Constructor.prototype = Object.create(View.prototype);
    Constructor.prototype.constructor = Constructor;

    Constructor.DEFAULT_OPTIONS = {
        className: '',
        viewModel: null
    };

    return Constructor;
});

