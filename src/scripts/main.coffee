
window.$ = require 'jquery-browserify'
window._ = require 'underscore'
window.Backbone = require 'backbone-browserify'
Backbone.setDomLibrary($)

App = require './app'

$(document).ready ->
	app = new App()
	app.start()


