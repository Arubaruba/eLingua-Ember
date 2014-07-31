//request mocks
var mocks = {
  '/db/_session': {
    GET: function() {
      return {
        outcome: 'success',
        result: JSON.stringify({'userCtx': {name: 'a@a.a'}})
      }
    },
    POST: function(stringifiedData) {
      var data = JSON.parse(stringifiedData);
      if (data.name && data.password) {
        return {
          outcome: 'success',
          result: JSON.stringify({'userCtx': {name: 'a@a.a'}})
        }
      } else {
        throw('login attempted (PUT _session) with malformatted JSON');
      }
    }
  }
};