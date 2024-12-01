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

        // Helper function to find the first digit in a string
        function findFirstDigit(str) {
            for (let i = 0; i < str.length; i++) {
                if (/\d/.test(str[i])) {
                    return str[i];
                }
            }
            return null;
        }

        // Helper function to find the last digit in a string
        function findLastDigit(str) {
            for (let i = str.length - 1; i >= 0; i--) {
                if (/\d/.test(str[i])) {
                    return str[i];
                }
            }
            return null;
        }

        // Process each row
        rows.forEach((row) => {
            if (row.length > 1) {
                const firstDigit = findFirstDigit(row);
                const lastDigit = findLastDigit(row);
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
    } else {
        const totalSum = values.reduce((sum, value) => sum + value, 0);
        console.log('Calibration Values:', values);
        console.log('Total Sum of Calibration Values:', totalSum);
    }
});