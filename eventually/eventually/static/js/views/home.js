window.HomeView = Backbone.View.extend({

    initialize:function () {
        this.searchResults = new EventCollection();
        this.searchresultsView = new EventListView({model: this.searchResults});
    },

    render:function () {
        $(this.el).html(this.template());
        this.searchResults.findByName();
        this.searchresultsView.render();
        return this;
    },
    
    events: {
        "click .organizer-link": "organizer",
        "click .attendee-link": "attendee",
        "click .social img": "redirect_to_event",
    },
    
    organizer: function() {
        $(".attendee-list").slideUp();
        $(".organizer-list").slideDown();
    },
    
    attendee: function() {
        $(".organizer-list").slideUp();
        $(".attendee-list").slideDown();
    },
    
    redirect_to_event: function() {
        var $active = $("#events .selected")[0];
    }
});
