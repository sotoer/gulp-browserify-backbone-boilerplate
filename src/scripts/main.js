
window.$ = require('jquery-browserify');
window._ = require('underscore');
window.Backbone = require('backbone-browserify');
Backbone.setDomLibrary($);

var App = require('./app');

var app = new App();

app.beginLoad();


