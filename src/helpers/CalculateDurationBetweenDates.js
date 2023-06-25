const moment = require("moment");

module.exports = function(startDate, endDate)
{
    const intervals = ["years", "months", "days"];
    let outputString = [];
    const sDate = moment(startDate);
    const eDate = moment(endDate);

    // Find the difference between the two dates per interval, and then add it to e_date so on the next pass there is no difference in that interval
    // This isolates the next interval (which won't include the previous interval in its diff)
    for (let i = 0; i < intervals.length; i++)
    {
        const diff = sDate.diff(eDate, intervals[i]);
        eDate.add(diff, intervals[i]);

        // Build the array that will become the resulting string
        outputString.push(diff + " " + intervals[i]);
    }

    outputString = outputString.join(", ");
    return outputString;
};