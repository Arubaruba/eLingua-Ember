App.AdminTutorsRoute = Ember.Route.extend({
  model: function () {
    //
    //    var model = this;
    //    this.store.find('user', 'simplelogin:7').then(function (user) {
    //      model.store.createRecord('schedule-event', {
    //        date: new Date()
    //      }).save().then(function(scheduleEvent) {
    //        user.get('scheduleEvents').then(function(scheduleEvents) {
    //          scheduleEvents.addObject(scheduleEvent);
    //          user.save();
    //        });
    //      });
    //    });


    return this.store.find('user').then(function (result) {
      return result.filterProperty('type', 'tutor');
    });
  }
});