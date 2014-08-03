moduleFor('controller:guest.index', 'Guest Index Controller');

test("Sign Up", function () {

  var application = this.subject();

  visit("/guest/index");

  fillIn('#fullName', 'Andreas Stocker');
  fillIn('#emailAddress', 'andreas@stockers.org');
  fillIn('#password', '1239999');
  fillIn('#repeatPassword', '12341234');

  click('form button');

  andThen(function () {
    equal(currentRouteName(), 'guest.index', 'Signed up will be blocked when passwords are not equal');

    fillIn('#password', '12341234');

    click('form button');

    andThen(function () {
      notEqual(currentRouteName(), 'guest.index', 'Signed up success');
    });
  });
});
