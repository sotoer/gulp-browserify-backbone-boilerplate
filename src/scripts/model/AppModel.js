
var Preloader = require('./utils/Preloader');

var AppModel = Backbone.Model.extend({
	url: 'data/site.json',

	assetManifest: [],
	section: null,

    initialize: function() {
        this.on('change', $.proxy(this.onAppModelData,this));
    },

    onAppModelData: function(section) {
        var g, obj;
        // this.off('change', this.onAppModelReady);
        this.off('change');
        for (obj in this.attributes) {
            if (_.isArray(this.attributes[obj])) {
                this.set(obj, new Backbone.Collection(this.attributes[obj]));
            }
            else if (typeof this.attributes[obj] === "object") {
                this.set(obj, new Backbone.Model(this.attributes[obj]));
            }
        }
        g = this.get('global');
        g.set("routeOrigin", window.ROUTE_ORIGIN);
        this.trigger("dataReady", this);
        //this.onAssetsComplete();
        this.createLoadManifest();
    },

    searchAssets: function(object) {
        var _this, a, asset, item, routeOrigin, _results,
        _this = this,
        //routeOrigin = this.get('global').get("routeOrigin");
        _results = [];
        for (item in object) {
            if (item === "assets") {
                _results.push((function() {
                    var _results1;
                    _results1 = [];
                    for (asset in object[item]) {
                        a = {
                            id: asset,
                            src: object[item][asset]
                        };
                        _results1.push(
                            _this.assetManifest.push(a)
                        );
                    }
                    return _results1;
                })());
            }
            else if (typeof object[item] === "object") {
                _results.push(this.searchAssets(object[item]));
            }
            else {
                _results.push(void 0);
            }
        }
        return _results;
    },

    createLoadManifest: function() {
        var m, obj;
        for (obj in this.attributes) {
            if (this.attributes[obj].attributes !== void 0) {
                this.searchAssets(this.attributes[obj].attributes);
            }
            else if (this.attributes[obj].models !== void 0) {
                for (m in this.attributes[obj].models) {
                    this.searchAssets(this.attributes[obj].models[m].attributes);
                }
            }
        }
        if (this.assetManifest.length > 0) {
            return this.initPreload();
        }
        else {
            return this.onAssetsComplete();
        }
    },

    initPreload: function() {
        Preloader.onProgress = $.proxy(this.onAssetsProgress, this);
        Preloader.onComplete = $.proxy(this.onAssetsComplete, this);
        return Preloader.loadManifest(this.assetManifest);
    },

    onAssetsProgress: function(e) {
        var loaded;
        loaded = e;
        return this.trigger('loadProgress', loaded);
    },

    onAssetsComplete: function(e) {
        return this.trigger('loadComplete', this);
    }

});


module.exports = new AppModel();
