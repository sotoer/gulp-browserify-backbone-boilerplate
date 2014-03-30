

Preloader = require './utils/Preloader'
ModelBase = require './abstract/ModelBase'


class AppModel extends Backbone.Model
    
    
    allowInstantiation = false
    instance = null

    assetManifest = []
    opts = {}

    preloader = new Preloader()
 
    constructor: (opts) ->
        if !allowInstantiation
            throw 'AppModel is a singleton. Use AppModel.getInstance() instead.'
        else
            allowInstantiation = false
            opts = opts
            super(opts)

    AppModel.getInstance = (opts) ->
        if instance is null
            allowInstantiation = true
            instance = new AppModel(opts) 
        instance

      
    initialize: (opts) => 
        @opts = opts
        @url = opts.url
        
        super()
        @on 'change' , @onAppModelData


    onAppModelData: (target) =>
        @off 'change' , @onAppModelReady
        


        for obj of @attributes
            if Array.isArray @attributes[obj] 
                @set obj , new Backbone.Collection(@attributes[obj])
            else if typeof @attributes[obj] is "object"
                @set obj , new Backbone.Model(@attributes[obj])
            

        g = @get('global')
        g.set("routeOrigin" , window.ROUTE_ORIGIN)

        @trigger "dataReady", @
        @createLoadManifest()        



    searchAssets: (object) =>
        
        routeOrigin = @get('global').get("routeOrigin")


        for item of object 
           
            if item is "assets"
                for asset of object[item]
              

                    a =
                        id: asset
                        src: object[item][asset]
                    assetManifest.push(a)



            else if typeof object[item] is "object"
                @searchAssets(object[item])


            


    createLoadManifest: () =>
        
        for obj of @attributes
   
            if @attributes[obj].attributes isnt undefined
                @searchAssets @attributes[obj].attributes
            else if @attributes[obj].models isnt undefined
                for m of @attributes[obj].models
                    @searchAssets @attributes[obj].models[m].attributes

        
        
        if assetManifest.length > 0
            @initPreload()
        else
            @onAssetsComplete()


       
    initPreload: () =>
        preloader.onProgress = @onAssetsProgress
        preloader.onComplete = @onAssetsComplete
        preloader.loadManifest(assetManifest)

        

    onAssetsProgress: (e) =>
        loaded =  e
        @trigger 'loadProgress' , loaded
             
    onAssetsComplete: (e) =>
        @trigger 'loadComplete', @



       

module.exports = AppModel   
