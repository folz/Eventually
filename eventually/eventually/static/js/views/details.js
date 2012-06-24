window.EventView = Backbone.View.extend({

    initialize:function () {
        console.log("[EventView] initialize event", this.model.get('id'));
        $("body").attr("id", "eventPage");
    },

    render: function () {
        console.log("[EventView] begin render event", this.model.get('id'));
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

window.EventSummaryView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
