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

});
