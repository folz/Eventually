window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "events/:id": "eventDetails",
        "manage/:id": "manage"
    },

    home: function () {
        $("#content").html(new HomeView().render().el);
    },

    eventDetails: function (id) {
        var event = new Event({id: id});
        event.fetch({
            success: function (data) {
                $('#content').html(new EventView({model: data}).render().el);
            }
        });
    },
    
    manage: function(id) {
        var event = new Event({id: id});
        event.fetch({
            success: function(data) {
                $('#content').html(new ManageView({model: data}).render().el);
            }
        });
    }

});

templateLoader.load(["HomeView", "EventView", "EventListItemView", "ManageView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });
