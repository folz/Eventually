window.EventView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified

    initialize:function () {
//        this.template = templates['Event'];
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        $('#details', this.el).html(new EventSummaryView({model:this.model}).render().el);
        this.model.reports.fetch({
            success:function (data) {
                if (data.length == 0)
                    $('.no-reports').show();
            }
        });
        $('#reports', this.el).append(new EventListView({model:this.model.reports}).render().el);
        return this;
    }
});

window.EventSummaryView = Backbone.View.extend({

    tagName:"div", // Not required since 'div' is the default if no el or tagName specified

    initialize:function () {
//        this.template = templates['EventSummary'];
        this.model.bind("change", this.render, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
