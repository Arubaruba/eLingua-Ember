/* Visit http://www.yaldex.com/ for full source code
 and get more free JavaScript, CSS and DHTML scripts! */
function printTimeDifference(now, y2k) {

  var result = '';

  var days = '', daysRound = '', hours = '', hoursRound = '',
    minutes = '', minutesRound = '', seconds = '',
    secondsRound = '', sec = '', min = '', hr = '', dy = '';
  days = (y2k - now) / 1000 / 60 / 60 / 24;
  daysRound = Math.floor(days);
  dy = (daysRound == 1) ? " day " : " days ";

  hours = (y2k - now) / 1000 / 60 / 60 - (24 * daysRound);
  hoursRound = Math.floor(hours);
  hr = (hoursRound == 1) ? " hour " : " hours ";

  minutes = (y2k - now) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  minutesRound = Math.floor(minutes);
  min = (minutesRound == 1) ? " minute " : " minutes ";

  seconds = (y2k - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
  secondsRound = Math.round(seconds);
  sec = (secondsRound == 1) ? " second" : " seconds ";

  if (seconds >= 1) {
    result = secondsRound + sec;
  }
  if (minutes >= 1) {
    result = minutesRound + min;
  }
  if (hours >= 1) {
    result = hoursRound + hr;
  }
  if (days >= 1) {
    result = daysRound + dy;
  }
  if (daysRound == 6 && hoursRound == 23) {
    return 'IN PROGRESS NOW';
  } else if (daysRound == 6 && hoursRound >= 24 - 5) {
    return 'Done for this week'
  } else {
    return result + 'remaining';
  }
}