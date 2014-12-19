/**
 * Created by tylerjones on 8/21/14.
 */

define(['knockout', 'lodash', 'signals', 'famous/core/Engine'], function(ko, _, Signal, Engine) {
    var signal = new Signal();
    var boundElements = [];

    var onDispatch  = function(selector, viewModel) {

        if(!_.contains(boundElements, selector)) {
            console.log('BINDING TO: ' + selector);
            var handler = function() {
                console.log(selector + ' BOUND!');
                var el = $(selector)[0];
                if(el) {
                    ko.cleanNode(el);
                    ko.applyBindings(viewModel, el);
                    Engine.removeListener('postrender', handler);
                }
            };
            boundElements.push(selector);
            Engine.on('postrender', handler);
        }
    }

    signal.add(onDispatch);

    return signal;
});
