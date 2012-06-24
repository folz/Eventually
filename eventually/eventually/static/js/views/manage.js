window.ManageView = Backbone.View.extend({

    initialize:function () {
        console.log("[ManageView] initialize event", this.model.get('id'));
        $("body").attr("id", "managerPage");
    },

    render: function () {
        console.log("[ManageView] begin render event", this.model.get('id'));
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
