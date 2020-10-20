/**
 * Christopher Flowers
 * @02856440
 * 
 * Inspiration came from the following github repo
 * https://github.com/Enoumy/boggle/blob/02e43d606b87516a0ab4f25a0e8513aef7a68c66/src/boggle_solver.js
 * 
 * Paired programming with Jurnee Tipton
 * 
 *     run with 'node boggle_solver.js'
 * 
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */



// //boggle grid                
// const grid = [['A', 'Qu'],
// ['C', 'D']];

// //valid words
// const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
//     'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
//     'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar', 'ab', 'abd', 'dca', 'qac'];

//positions of tiles adjacent to the selected tile
const adjacentTiles =   [[-1, -1], [0, -1], [1, -1],
                        [-1, 0], [1, 0],
                        [-1, 1], [0, 1], [1, 1]];


//Node used to create the Trie structure
class Node {
    constructor() {
        this.children = {};
        this.word = "";
        this.parent = null;
        this.end = false;
    }
}


//Class to support tracking visited
class Coordinates {
    constructor() {
        this.coordinates = new Object();
    }

    //adds (x,y) coordinate to the set
    add(x, y) {
        if (!Coordinates.hasOwnProperty.call(this.coordinates, x)) this.coordinates[x] = new Set();
        this.coordinates[x].add(y);
    }

    //deletes (x,y) coordiante from the set
    delete(x, y) {
        if (!Object.hasOwnProperty.call(this.coordinates, x)) return;
        this.coordinates[x].delete(y);
        if (this.coordinates[x].length === 0) delete this.coordinates[x];
    }

    //checks to see if a (x,y) coordinate is already present in the set
    has(x, y) {
        if (!Object.hasOwnProperty.call(this.coordinates, x)) return false;
        return this.coordinates[x].has(y);
    }
}

//conducts a depth first search on the grid
function depthFirstSearch(grid, x, y, trieNode, visited, originalMappings, solutions) {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length || visited.has(x, y)) {
        return;
    }

    if (!Object.hasOwnProperty.call(trieNode.children, grid[x][y].charAt(0))) {
        return;
    }

    trieNode = trieNode.children[grid[x][y].charAt(0)];

    // Checks full length of the grid space in case it has more than 1 character
    let i = 1; // i is declared in the scope of the function to be used later.
    for (; Object.hasOwnProperty.call(trieNode.children, grid[x][y].charAt(i)); i++) {
        trieNode = trieNode.children[grid[x][y].charAt(i)];
    }

    // If it has reached both the end of the cell and the trie's word...
    if (i === grid[x][y].length && trieNode.isEnd) {
        solutions.push(originalMappings[trieNode.word]);
        trieNode.isEnd = false;
    }
    else if (i != grid[x][y].length) {
        trieNode.isEnd = false;
    }

    visited.add(x, y);

    // For each adjacent letter cell...
    for (let direction = 0; direction < adjacentTiles.length; direction++) {

        depthFirstSearch(
            grid,
            x + adjacentTiles[direction][0], // Adjacent tile.
            y + adjacentTiles[direction][1], // Adjacent tile.
            trieNode,
            visited,
            originalMappings,
            solutions
        );
    }
    visited.delete(x, y);
}

//creates a Trie given a list of words
function createTrie(dictionary) {
    let root = new Node();
    for (let word = 0; word < dictionary.length; word++) {
        if (dictionary[word].length >= 3) {
            insertWord(root, dictionary[word]);
        }
    }
    return root;
}



//inserts a word into the Trie given the root node
function insertWord(root, word) {
    let trie = root;
    for (let char = 0; char < word.length; char++) {
        if (!Object.hasOwnProperty.call(trie.children, word[char])) 
        trie.children[word[char]] = new Node();
        trie = trie.children[word[char]];
        // console.log(trie.children)
    }
    trie.isEnd = true;
    trie.word = word;
}

//converts all values in the grid to lowercase
function loweCaseGridConversion(grid) {
    for (let x = 0; x < grid.length; x++)
        for (let y = 0; y < grid[x].length; y++)
            grid[x][y] = grid[x][y].toLowerCase();

}

function loweCaseDictConversion(grid) {
    for (let x = 0; x < grid.length; x++)
        grid[x] = grid[x].toLowerCase();

    
}
//creates a map containing each dictionary value
function createWordMap(array) {
    let originalMappings = new Object();
    for (let i = 0; i < array.length; i++) {
        originalMappings[array[i]] = array[i];
    }
    // console.log(originalMappings)
    return originalMappings;
}


exports.findAllSolutions = function (grid, dictionary) {

    let solutions = [];

    //returns an empty array if the grid or dictionay are empty
    if (grid.length == 0 || dictionary.length == 0) {
        return [];
    }

    //returns an empty array if grid is not a N x N matrix
    for (let i = 0; i < grid.length; i++) {
        if (grid.length != grid[i].length) {
            return solutions = [];
        }
    }
    
    loweCaseGridConversion(grid); //converts letters in the grid to be lower case
    loweCaseDictConversion(dictionary); //converts letters in the dictionary to be lower ca

    //checks to see if Qx; where x is any non-u letter exists
    var result = false;
    let regEx1 = /(q[a-t]{1})|(q[v-z]{1}|(Q[A-T]{1})|(Q[V-Z]{1}))/;
    grid.forEach(line => {
        line.forEach(character => {

            character = character.toLowerCase();
            var test = regEx1.test(character);
            if(test) {
                result = true;
            }
        });
    });

    if(result == true) {
        return [];
    }
    
    var test = false;
    var result2 = false;
    let regEx2 = /([a-p][a-z]{1})|([r-z][a-z]{1})|([A-P][A-Z]{1})|([R-Z][A-Z]{1})/;
    grid.forEach(line => {
        line.forEach(character => {

            character = character.toLowerCase();
            test = regEx2.test(character);
            if (test == true) {
                console.log("here");
                result2 = true;
            }
        });

        return;
        
    });

        if(result2 == true) {
            return [];
        }

    // loweCaseConversion(grid); //converts letters in the grid to be lower case
    // loweCaseConversion(dictionary); //converts letters in the dictionary to be lower ca
    let originalMappings = createWordMap(dictionary);

    let trie = createTrie(dictionary);

    for (let x = 0; x < grid.length; x++)
        for (let y = 0; y < grid[x].length; y++) {
            let visited = new Coordinates();
            depthFirstSearch(grid, x, y, trie, visited, originalMappings, solutions);
        }

    return solutions;
};




exports.findAllSolutions([], []);


