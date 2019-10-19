/**
 * Check if number is even
 * @param {Number} number
 * @returns {Boolean}
 */
const isEven = number => number % 2 === 0;

/**
 * Make hash array from brackets config
 * @param {Array} arr
 * @param {Number} keyIndex
 * @param {Number} valueIndex
 * @returns {Object}
 */
function dispatchBrackets(arr, keyIndex = 0, valueIndex = 1) {
    return arr.reduce(
        (brackets, currentBracket) => ({
            ...brackets,
            ...{
                [currentBracket[keyIndex]]: currentBracket[valueIndex]
            }
        }),
        {}
    );
}

/**
 * Check if brackets correct for given brackets sequence
 * @param {String} str
 * @param {Array{Array{string}}} config
 * @returns {Boolean}
 */
const check = (str, config) => {
    if (str.length === 0 || !isEven(str.length)) return false;

    const makeDispatchingBrackets = dispatchBrackets(config);

    /**
     *
     * @param {String} brackets
     * @returns {Boolean}
     */
    const iterString = brackets => {
        if (brackets.length === 0) return true;

        /**
         *
         * @param {Number} index
         * @returns {Boolean}
         */
        const iterSubString = index => {
            const currentBracket = brackets[index];
            const openBracketType = makeDispatchingBrackets[currentBracket];

            /**
             * @example
             * }{
             */
            if (!openBracketType) return false;

            const nextBracket = brackets[index + 1];

            /**
             * @example
             * {}{}{
             * {
             * {{
             */
            if (openBracketType && !nextBracket) return false;

            const nextOpenBracketType = makeDispatchingBrackets[nextBracket];

            // next bracket is open type
            if (nextOpenBracketType) {
                // special case: ||
                if (nextOpenBracketType === currentBracket) {
                    const newStr = `${brackets.slice(0, index)}${brackets.slice(
                        index + 2,
                        brackets.length
                    )}`;

                    return iterString(newStr);
                }
                return iterSubString(index + 1);
            }

            //close bracket is not correct: {], (}
            if (openBracketType !== nextBracket) return false;

            /**
             * brackets is correct
             * delete them (make new brackets string without them)
             * and call function recursively again
             * @example
             * {{}} -> {}
             * [{[]}] -> [{}]
             */
            const newStr = `${brackets.slice(0, index)}${brackets.slice(
                index + 2,
                brackets.length
            )}`;

            return iterString(newStr);
        };

        return iterSubString(0);
    };

    return iterString(str);
};

module.exports = check;
