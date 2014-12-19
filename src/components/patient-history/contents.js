/**
 * Created by tylerjones on 11/20/14.
 */

define([
    "knockout",
    "famous/core/view",
    "famous/modifiers/StateModifier",
    "famous/core/Transform",
    "./checkboxesConfig",
    "widgets/checkbox/checkboxGridWidget",
    "widgets/select/selectWidget",
    "widgets/textArea/textAreaWidget"
], function(ko, View, StateModifier, Transform, CheckboxesConfig, CheckboxGridWidget, SelectWidget, TextAreaWidget) {

    var _viewModel;
    var _nameSpace = 'medical'

    function _createForm(){
        var self = this;

        var gridMod = new StateModifier({
            size: [400, 400]
        });
        self.gridNode = self.add(gridMod);
        var form = new CheckboxGridWidget({
            items: CheckboxesConfig
        });
        form.pipe(self._eventOutput);
        self.gridNode.add(form);

        var selectMod = new StateModifier({
            size: [500, 35],
            transform: Transform.translate(400, 0, 0)
        });
        self.selectNode = self.add(selectMod);
        var select = new SelectWidget({
            nameSpace: _nameSpace,
            items: _viewModel[_nameSpace].items,
            selectedItems: _viewModel[_nameSpace].selectedItems,
            currentItem: _viewModel[_nameSpace].currentItem
        });
        select.pipe(self._eventOutput);
        self.selectNode.add(select);

        var textAreaMod = new StateModifier({
            size: [500, 200],
            transform: Transform.translate(400, 35, 0)
        })
        self.textAreaNode = self.add(textAreaMod);
        self.textArea = new TextAreaWidget({
            items: _viewModel.medical.selectedItems
        });
        self.textArea.pipe(self._eventOutput);
        self.textAreaNode.add(self.textArea);
    }

    function Constructor(){
        var self = this;
        View.apply(self, arguments);
        _viewModel = self.options.viewModel;

        self._eventOutput.on('emit-re-render', function() {
            console.log('CONTENTS RE-RENDER');
            self._node.render();
            self.textArea.render();
            self.textAreaNode.render();
        });

        _createForm.call(self);
    }

    Constructor.prototype = Object.create(View.prototype);
    Constructor.prototype.constructor = Constructor;

    Constructor.DEFAULT_OPTIONS = {
        size: [undefined, undefined],
        viewModel: null
    };

    return Constructor;
});
