App.SignUp = DS.Model.extend({
  ok: DS.attr('boolean'),
  error: DS.attr('number')
});

App.SignUp.FIXTURES = [{
    id: 1,
    ok: true
  }
];

App.GuestIndexController = Ember.Controller.extend({
  fullName      : '',
  emailAddress  : '',
  password      : '',
  repeatPassword: '',
  response      : '',
  actions       : {
    signUp: function () {
      if (this.get('password') != this.get('repeatPassword')) {
        this.set('response', 'Passwords do not match');
      } else {
        var scope = this;
        var unhandledExceptionMessage = 'An unknown error has occurred';
        return this.store.find('SignUp').then(function (resultArray) {
          var result = resultArray.content[0];
          if (result.get('ok') === true) {
            scope.transitionToRoute('guest.sign-in');
          } else {
            scope.set('response', unhandledExceptionMessage);
          }
        }).catch(function (error) {
          // 409 "Conflict"
          if (error.code == 409) {
            scope.set('response', 'That email address is already taken')
          } else {
            scope.set('response', unhandledExceptionMessage);
          }
        });
      }
    }
  }
});