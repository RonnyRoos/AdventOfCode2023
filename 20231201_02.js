const fs = require('fs');

function getCalibrationValues(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        // Split the text into rows
        const rows = data.split('\n');
        const calibrationValues = [];

        const wordToDigit = {
            'one': '1',
            'two': '2',
            'three': '3',
            'four': '4',
            'five': '5',
            'six': '6',
            'seven': '7',
            'eight': '8',
            'nine': '9'
        };

        // Helper function to find the first digit or word in a string
        function findFirstDigitOrWord(str) {
            for (let i = 0; i < str.length; i++) {
                if (/\d/.test(str[i])) {
                    return str[i];
                }
                for (const word in wordToDigit) {
                    if (str.startsWith(word, i)) {
                        return wordToDigit[word];
                    }
                }
            }
            return null;
        }

        // Helper function to find the last digit or word in a string
        function findLastDigitOrWord(str) {
            for (let i = str.length - 1; i >= 0; i--) {
                if (/\d/.test(str[i])) {
                    return str[i];
                }
                for (const word in wordToDigit) {
                    if (str.endsWith(word, i + 1)) {
                        return wordToDigit[word];
                    }
                }
            }
            return null;
        }

        // Process each row
        rows.forEach((row) => {
            if (row.length > 1) {
                const firstDigit = findFirstDigitOrWord(row);
                const lastDigit = findLastDigitOrWord(row);
                if (firstDigit !== null && lastDigit !== null) {
                    const calibrationValue = parseInt(firstDigit + lastDigit, 10);
                    calibrationValues.push(calibrationValue);
                }
            }
        });

        callback(null, calibrationValues);
    });
}

// Example usage
getCalibrationValues('20231201_01.txt', (err, values) => {
    if (err) {
        console.error(err);
    } else if (values) {
        const totalSum = values.reduce((sum, value) => sum + value, 0);
        console.log('Calibration Values:', values);
        console.log('Total Sum of Calibration Values:', totalSum);
    }
});