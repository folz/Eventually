window.EventListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (event) {
            $(self.el).append(new EventListItemView({model:event}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (event) {
            console.log(event);
            $(this.el).append(new EventListItemView({model:event}).render().el);
        }, this);
        $('#events').append(this.el);
        console.log('[EventListView] ending render()', this);
        return this;
    },
    
});

window.EventListItemView = Backbone.View.extend({

    tagName:"li",
    
    className: "nearby-event",

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

});
