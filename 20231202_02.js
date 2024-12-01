const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '20231202_01.txt');

function parseGameData(input) {
    const games = input.trim().split('\n').map(line => {
        const [idPart, setsPart] = line.split(': ');
        const id = parseInt(idPart.match(/\d+/)[0], 10);
        const sets = setsPart.split('; ').map(set => {
            const cubes = set.split(', ').reduce((acc, cube) => {
                const [count, color] = cube.split(' ');
                acc[color] = parseInt(count, 10);
                return acc;
            }, { red: 0, green: 0, blue: 0 });
            return cubes;
        });
        return { id, sets };
    });
    return games;
}

function findMinimumCubes(game) {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    game.sets.forEach(set => {
        if (set.red > minRed) minRed = set.red;
        if (set.green > minGreen) minGreen = set.green;
        if (set.blue > minBlue) minBlue = set.blue;
    });

    return { red: minRed, green: minGreen, blue: minBlue };
}

function calculatePower(cubes) {
    return cubes.red * cubes.green * cubes.blue;
}

function sumPowersOfMinimumSets(input) {
    const games = parseGameData(input);
    const totalPower = games.reduce((sum, game) => {
        const minCubes = findMinimumCubes(game);
        const power = calculatePower(minCubes);
        return sum + power;
    }, 0);
    return totalPower;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const result = sumPowersOfMinimumSets(data);
    console.log('Sum of the power of minimum sets:', result);
});