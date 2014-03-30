
AppModel = require './model/AppModel'

class App

	constructor: () ->

	start: () =>
		@beginLoad()

	beginLoad: =>

		@model = AppModel.getInstance
			url: if window.DATA_LOCATION then window.DATA_LOCATION else '/data/site.json'

		@model.on 'dataReady' , @initPreloader
		@model.on 'loadProgress' , @preloadProgress
		@model.on 'loadComplete' , @modelReady
		@model.fetch()

	initPreloader: () =>
		console.log 'init preloader'

	preloadProgress: (e) =>
		console.log e

	modelReady: (e) =>
		console.log 'model ready'

module.exports = App;
