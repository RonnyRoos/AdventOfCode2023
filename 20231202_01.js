const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '20231202_01.txt');

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

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

function isGamePossible(game, maxRed, maxGreen, maxBlue) {
    return game.sets.every(set =>
        set.red <= maxRed && set.green <= maxGreen && set.blue <= maxBlue
    );
}

function sumPossibleGameIDs(input, maxRed, maxGreen, maxBlue) {
    const games = parseGameData(input);
    const possibleGames = games.filter(game => isGamePossible(game, maxRed, maxGreen, maxBlue));
    console.log('Possible games:', possibleGames);
    const sumOfIDs = possibleGames.reduce((sum, game) => sum + game.id, 0);
    return sumOfIDs;
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const result = sumPossibleGameIDs(data, maxRed, maxGreen, maxBlue);
    console.log('Sum of possible game IDs:', result);
});