/* Visit http://www.yaldex.com/ for full source code
 and get more free JavaScript, CSS and DHTML scripts! */
function printTimeDifference(now, y2k) {

  var result = '';

  var days = '', daysRound = '', hours = '', hoursRound = '',
    minutes = '', minutesRound = '', seconds = '',
    secondsRound = '', sec = '', min = '', hr = '', dy = '';
  seconds = (y2k - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
  if (seconds >= 1) {
    secondsRound = Math.round(seconds);
    sec = (secondsRound == 1) ? " second" : " seconds ";
    result = secondsRound + sec;
  }
  minutes = (y2k - now) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  if (minutes >= 1) {
    minutesRound = Math.floor(minutes);
    min = (minutesRound == 1) ? " minute " : " minutes ";
    result = minutesRound + min;
  }
  hours = (y2k - now) / 1000 / 60 / 60 - (24 * daysRound);
  if (hours >= 1) {
    hoursRound = Math.floor(hours);
    hr = (hoursRound == 1) ? " hour " : " hours ";
    result = hoursRound + hr;
  }
  days = (y2k - now) / 1000 / 60 / 60 / 24;
  if (days >= 1) {
    daysRound = Math.floor(days);
    dy = (daysRound == 1) ? " day " : " days ";
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