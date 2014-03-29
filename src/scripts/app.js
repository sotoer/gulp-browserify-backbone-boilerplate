
var AppModel = require('./model/AppModel');

var App = function() {};

App.prototype.beginLoad = function() {
	// Begind App Load

	AppModel.on('dataReady', this.initPreloader);
	AppModel.on('loadProgress', this.preloadProgress);
	AppModel.on('loadComplete', this.modelReady);
	AppModel.fetch();
};

App.prototype.initPreloader = function() {
	console.log('init preloader');
};

App.prototype.preloadProgress = function(e) {
	console.log(e);
};

App.prototype.modelReady = function(e) {
	console.log('model ready');
};


module.exports = App;
