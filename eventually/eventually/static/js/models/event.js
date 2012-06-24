window.Event = Backbone.Model.extend({

    urlRoot:"/api/v1/event/",

    initialize:function () {
        this.reports = new EventCollection();
        this.reports.url = '/api/v1/event/' + this.id + '/reports';
    }

});

window.EventCollection = Backbone.Collection.extend({

    model: Event,

    url:"/api/v1/event/",

    findByName:function () {
        var url = '/api/v1/event/';
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.objects.length);
                self.reset(data.objects);
            }
        });
    }

});
