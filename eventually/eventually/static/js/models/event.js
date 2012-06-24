window.Employee = Backbone.Model.extend({

    urlRoot:"/api/v1/event",

    initialize:function () {
        this.reports = new EmployeeCollection();
        this.reports.url = '/api/v1/event/' + this.id + '/reports';
    }

});

window.EmployeeCollection = Backbone.Collection.extend({

    model: Employee,

    url:"/api/v1/event",

    findByName:function (key) {
        var url = (key == '') ? '/api/v1/event' : "/api/v1/event/search/" + key;
        console.log('findByName: ' + key);
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
