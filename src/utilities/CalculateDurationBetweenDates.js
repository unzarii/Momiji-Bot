const moment = require("moment");

module.exports = function(start_date, end_date)
{
  const intervals = ["years", "months", "days"];
  let output_string = [];
  const s_date = moment(start_date);
  const e_date = moment(end_date);

  // Find the difference between the two dates per interval, and then add it to e_date so on the next pass there is no difference in that interval
  // This isolates the next interval (which won't include the previous interval in its diff)
  for (let i = 0; i < intervals.length; i++)
  {
    const diff = s_date.diff(e_date, intervals[i]);
    e_date.add(diff, intervals[i]);

    // Build the array that will become the resulting string
    output_string.push(diff + " " + intervals[i]);
  }

  output_string = output_string.join(", ");
  return output_string;
};