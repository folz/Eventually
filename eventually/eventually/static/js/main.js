window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "events/:id": "eventDetails"
    },

    initialize: function () {

        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
    },

    home: function () {
        $("#content").html(new HomeView().render().el);
    },

    eventDetails: function (id) {
        var event = new Event({id: id});
        event.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EventFullView
                // instead of creating new instances
                $('#content').html(new EventView({model: data}).render().el);
            }
        });
    }

});

templateLoader.load(["HomeView", "EventView", "EventListItemView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });
