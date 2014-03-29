
var Preloader = {

	imagesTotal: 0,

	imagesLoaded: 0,
	
	onProgress: null,
	
	onComplete: null,

	loadManifest: function(manifest) {
		var i, image, item, _i, _len, _results;
		this.imagesTotal = manifest.length;
		_results = [];
		for (i = _i = 0, _len = manifest.length; _i < _len; i = ++_i) {
			item = manifest[i];
			image = new Image();
			image.onload = $.proxy(this.onInternalProgress, this);
			image.src = item.src;
			_results.push(item.image = image);
		}
		return _results;
	},

	onInternalProgress: function(e) {
		this.imagesLoaded++;
		this.onProgress(this.imagesLoaded / this.imagesTotal);
		if (this.imagesLoaded / this.imagesTotal === 1) {
			return this.onComplete(this.imagesLoaded / this.imagesTotal);
		}
	}

};

module.exports = Preloader;
