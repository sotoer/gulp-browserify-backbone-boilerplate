class PreloaderZed

    @loadedImages = []

    imagesTotal = 0
    imagesLoaded = 0
    @onProgress 
    @onComplete

    constructor: ->


    loadManifest: (manifest) =>

        imagesTotal = manifest.length

        for item,i in manifest           

            image = new Image()
            image.onload = @onInternalProgress
            image.src = item.src
            item.image = image
            

    onInternalProgress: (e) =>
        imagesLoaded++
        @onProgress imagesLoaded/imagesTotal

        if imagesLoaded/imagesTotal is 1
            @onComplete imagesLoaded/imagesTotal




    



module.exports = PreloaderZed