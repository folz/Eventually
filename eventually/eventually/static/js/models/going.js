window.Going = Backbone.Model.extend({

    urlRoot:"/api/v1/going/",

});

window.EventCollection = Backbone.Collection.extend({

    model: Going,

    url:"/api/v1/going/",

});
