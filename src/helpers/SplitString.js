module.exports = function(string, length, splitter)
{
    const strings = [];

    // While the string is actually longer than the length defined.
    while (string.length > length)
    {
        // Find the index of the final splitter within the confines of the desired length
        let pos = string.substring(0, length).lastIndexOf(splitter);

        // If we can't find this splitter anywhere within these confines, set the position to the total length
        // If we can, set the position to its location
        pos = pos <= 0 ? length : pos;

        // Push the contents of these confines to the array
        strings.push(string.substring(0, pos));

        // SEE ME: I'm heavily puzzled by the commented out code.
        // I don't really get why it was included as it can result in pieces of your string being erased.
        // Just cut the substring based on the current position? Why would you want it to be different from the end of the previous string?
        // Very strange!
        // I'll keep this here just in case I actually have it all wrong and the internet person is actually very smart all along.

        // Get the next index of the splitter, starting from pos (the end of the previous segment)
        /* let index = string.indexOf(splitter, pos) + 1;

        // I don't really get this bit but it determines where the next substring starts
        if (index < pos || index > pos + length)
        {
            index = pos;
        }*/

        // string = string.substring(index);
        string = string.substring(pos);
    }

    // If there is anything left, push it
    if (string)
    {
        strings.push(string);
    }

    return strings;
};