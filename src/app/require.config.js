// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "famous":               "bower_modules/famous/src",
        "lodash":               "bower_modules/lodash/dist/lodash",
        "handlebars":           "bower_modules/handlebars/handlebars"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "handlebars": {
            exports: "Handlebars",
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        }
    }
};
