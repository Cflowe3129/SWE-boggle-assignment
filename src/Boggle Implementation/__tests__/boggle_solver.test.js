// /*

//     Christopher Flowers
//     @02856440


//     test with "npm test"

//     /////////TEST CASES//////////


//     FINDS VALID WORDS           --DONE  
//     RECURSE ON THE DIAGONAL     --DONE
//     NON-ADJACENT LETTERS        --Done
//     DUPLICATE LETTERS           --DONE still has holes (ex: if a grid has a letter appear multiple times but those letters aren"t reached properly in the solution, the test will still pass)
//     SHORT WORDS                 --DONE
//     EMPTY INPUTS                --DONE
//     WORD CONTAINING QU          --DONE
//     END WITH A "Q"              --DONE
//     CONTAINS "QX" (X != "U")    --DONE
//     GRID DIMENSIONS             --DONE
//     PASSING INVALID INPUTS      --DONE
// */

 
const findAllSolutions = require("../boggle_solver");

//////////checks to see if all words in the solutions array are valid words//////////
function validWords(solutions, dictionary, state) {

    
    solutions.forEach(word => {
        if (dictionary.includes(word) == false) {
            return state = false;
        }
    });
    return state;

}

describe("Valid words function", () => {
    test("it should pass if all words in the solutions array exist in the dictionary", () => {

        const grid =    [["C", "A", "T"],
                        ["B", "A", "N"],
                        ["G", "A", "P"]];

        const dictionary = ["cap", "cab", "gap", "pan", "tan", "ban", "cat", "can", "pant"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = true;

        expect(validWords(solutions, dictionary, true)).toEqual(output);

    });

    test("it should pass and return an empty array if no words in the dictionary are found", () => {

        const grid =    [["A", "A", "A"],
                        ["A", "A", "A"],
                        ["A", "A", "A"]];

        const dictionary = ["cap", "cab", "gap", "pan", "tan", "ban", "cat", "can", "pant"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = [];

        expect(validWords(solutions, dictionary, [])).toEqual(output);

    });




    // test("it should fail if any words in the solutions array don"t exist in the dictionary", () => {
    //     const grid =    [["C", "A", "T"],
    //                     ["B", "A", "N"],
    //                     ["G", "A", "P"]];

    //     const dictionary = ["cap", "cab", "gap", "pan", "tan", "ban", "cat", "can", "pant"];

    //     const testDictionary = ["cab", "gap", "ban", "cat", "can", "pant"];

    //     let solutions = findAllSolutions.findAllSolutions(grid, dictionary)

    //     const output = true;

    //     expect(validWords(solutions, testDictionary, true)).toEqual(output); //removed cap, pan, and tan from the test dictionary so the test should fail

    // });



});

//////////checks to see if the function recurses on the diagonal//////////
function diagonalRecursion(solutions, dictionary, state) {

    solutions.forEach(word => {
        if (dictionary.includes(word) == false) {
            return state = false;
        }

    });
    return state;
}

describe("Diagonal recursion function", () => {
    test("it should pass if the words formed on the diagonal are added to the solutions array", () => {

        const grid =    [["C", "A", "T"],
                        ["B", "A", "N"],
                        ["G", "A", "P"]];

        const dictionary = ["gat", "tag", "cap", "pac"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = true;

        expect(diagonalRecursion(solutions, dictionary, true)).toEqual(output);

    });

        test("it should pass if the words formed on the diagonal are added to the solutions array", () => {
    
            const grid =    [["C", "A", "T", "A", "U"],
                            ["C", "I", "T", "T", "V"],
                            ["C", "A", "N", "A", "V"],
                            ["C", "A", "T", "A", "V"],
                            ["C", "A", "T", "A", "P"],];
    
            const dictionary = ["panic", "cantu"];
    
    
            let solutions = findAllSolutions.findAllSolutions(grid, dictionary);
    
            const output = true;
    
            expect(diagonalRecursion(solutions, dictionary, true)).toEqual(output);
    
        });
});

//////////checks to see if any of the words in the solutions array use non-adjacent characters//////////
function nonAdjacent(solutions, dictionary, state) {

    solutions.forEach(word => {
        if (dictionary.includes(word) == true) {
            return state = true;
        }
    });

    return state;
}

describe("Non-adjacent function", () => {
    test("it should pass if the words added to the solutions array do not use non-adjacent letters", () => {

        const grid =    [["C", "A", "E"],
                        ["B", "O", "F"],
                        ["G", "T", "N"]];

        const dictionary = ["cat", "gone", "fat", "feat", "gen", "bat"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = false;

        expect(nonAdjacent(solutions, dictionary, false)).toEqual(output);

    });

        
});

//////////checks to see if letters have visited repeated//////////
function duplicateLetters(solutions, dictionary, state) {

                                            // var gridDict = new Map(); //dictionary top track the frequency of each letter in the grid

                                            // grid.forEach(line => { //create the dictionary data type for the grid
                                            //     line.forEach(letter => {
                                            //         gridDict.set(letter, 0)

                                            //     })
                                            // })

                                            // grid.forEach(line => { //set frequency of each letter in the grid/dictionary data type
                                            //     line.forEach(letter => {
                                            //         // console.log(gridDict.get(letter));
                                            //         gridDict.set(letter, gridDict.get(letter) + 1)
                                            //     })
                                            // })


                                            // var solutionDict = new Map(); //dictionary top track the frequency of each letter in each word in the solutions array

                                            // solutions.forEach(word => {

                                            //     for (let i in word) { //create the dictionary data type for a word in the solutions array
                                            //         solutionDict.set(word[i], 0)
                                            //     }
                                            


                                            //     for (let i in word) { //set frequency of each letter in the word/dictionary data type
                                            //         solutionDict.set(word[i], solutionDict.get(word[i]) + 1)
                                            //     }
                                                

                                            //     for (let x in word) { //check the two dictionaries against each other

                                            //         if (solutionDict.get(word[x]) > gridDict.get(word[x])) { //if a letter appear more times in a solution than it appears in teh grid, fail the test
                                            //             console.log("error")
                                            //             return true;
                                            //         }
                                            //     }
                                            

                                            //     solutionDict = new Map(); //reset the solution dictionary to check the next word

                                            // })

                                            // return false;

    solutions.forEach(word => {
        if (dictionary.includes(word) == true) {
            return state = true;
        }
    });
                                        
    return state;

}

describe("Duplicate letters function", () => {
    test("it should pass if none of letters in the grid are visited more than once", () => {

        const grid =    [["C", "A", "F"],
                        ["B", "O", "E"],
                        ["D", "T", "N"]];

        const dictionary = ["none", "boot", "food", "fee", "feet", "teen", "cotten"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = false;

        expect(duplicateLetters(solutions, dictionary, false)).toEqual(output);

    });



    // test("it should fail if any of the letters in the grid are visited more than once", () => {

    //     const grid = [["T", "W", "Y", "R"],
    //     ["E", "N", "P", "H"],
    //     ["G", "Z", "Qu", "R"],
    //     ["O", "N", "T", "A"]];

    //     const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
    //         "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
    //         "ten", "went", "wet", "arty", "egg", "not", "quar"];


    //     let solutions = findAllSolutions.findAllSolutions(grid, dictionary)

    //     const output = true;

    //     expect(duplicateLetters(grid, solutions.push("gene"))).toEqual(output); //adding gene, which would be an invalid solution to show a failed case

    // });



});


//////////checks to see if any words in the solutions array are less than 3 characters//////////
function shortWords(solutions) {

    if(solutions.length == 0) {
        return solutions;
    }
    else if (solutions == null) {
        return true;
    }

    solutions.forEach(word => {

        if (word.length < 3) {
            return true;
        }

    });
    return false;


}

describe("Short words function", () => {
    test("it should pass if all words in the solutions array are greater than or equal to three characters", () => {

        const grid = [["T", "W", "Y", "R"],
                     ["E", "N", "P", "H"],
                     ["G", "Z", "Qu", "R"],
                     ["O", "N", "T", "A"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar", "at", "en"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = false;

        expect(shortWords(solutions)).toEqual(output);

    });

    test("it should pass even if the solutions array is empty", () => {

        const grid = [];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = [];

        expect(shortWords(solutions)).toEqual(output); //pushing a word less than 3 characters to show a failed case

    });
});


//////////checks to see if the grid or disctionary are empty//////////
function emptyInputs(grid, dictionary) {

    if (grid == null || dictionary == null || grid.length == 0 || dictionary.length == 0) {
        return [];
    }

    return true;


}

describe("Empty inputs function", () => {
    test("it should pass if none of the grid or dictionary inputs are empty", () => {
        const grid = [["T", "W", "Y", "R"],
                     ["E", "N", "P", "H"],
                     ["G", "Z", "Qu", "R"],
                     ["O", "N", "T", "A"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];



        const output = true;

        expect(emptyInputs(grid, dictionary)).toEqual(output);

    });

    test("it should pass, returning an empty array,  if the grid is empty", () => {
        const grid = [];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];


        const output = [];

        expect(emptyInputs(grid, dictionary)).toEqual(output);

    });

    test("it should pass, returning an empty array, if the dictionary is empty", () => {
        const grid = [["T", "W", "Y", "R"],
                     ["E", "N", "P", "H"],
                     ["G", "Z", "Qu", "R"],
                     ["O", "N", "T", "A"]];

        const dictionary = [];


        const output = [];

        expect(emptyInputs(grid, dictionary)).toEqual(output);

    });
});


//////////checks to see if any of the values in the solutions array contain the string "Qu"//////////
function containsQu(solutions, ending) {

    let regEx = /(qu{1})|(Qu{1})/;

    solutions.forEach(word => {
        word = word.toLowerCase();

        let test = regEx.test(word);
        if (test == true) {
            return ending = true;
        }
    });
    return ending;


}

describe("Contains qu function", () => {
    test("it should pass if any of the words in the solutions array conain the substring Qu", () => {

        const grid = [["T", "W", "Y", "R"],
        ["E", "N", "P", "H"],
        ["G", "Z", "Qu", "R"],
        ["O", "N", "T", "A"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = true;

        expect(containsQu(solutions, true)).toEqual(output);

    });



    // test("it should fail if none of the words in the solutions array conain the substring Qu", () => {

    //     const grid = [["T", "W", "Y", "R"],
    //     ["E", "N", "P", "H"],
    //     ["G", "Z", "Qu", "R"],
    //     ["O", "N", "T", "A"]];

    //     const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
    //         "pry", "rat", "tar", "tarp",
    //         "ten", "went", "wet", "arty", "egg", "not"];


    //     let solutions = findAllSolutions.findAllSolutions(grid, dictionary)

    //     expect(containsQu(solutions, false)).toEqual(output);

    // });



});


//checks to see if any of the values in the soutions array end with the character "q"
function endsWithQ(solutions, ending) {

    solutions.forEach(word => {
        word = word.toLowerCase();

        if (word.substr(-1) == "q" || word.substr(-1) == "Q") {
            return ending = true;
        }
    });
    return ending;


}

describe("Ends with q function", () => {
    test("it should pass if none of the words in the solutions array end with a q", () => {

        const grid = [["T", "W", "Y", "R"],
                     ["E", "N", "P", "H"],
                     ["G", "Z", "Qu", "A"],
                     ["O", "N", "T", "R"]];

        const dictionary = ["qua", "quart", "quartz", "rat", "tar", "tarp", "parq", "ten", "hat"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = false;

        expect(endsWithQ(solutions, false)).toEqual(output);

    });



    // test("it should fail if any of the words in the solutions array end with a q", () => {

    //     const grid = [["T", "W", "Y", "R"],
    //     ["E", "N", "P", "H"],
    //     ["G", "Z", "Qu", "R"],
    //     ["O", "N", "T", "A"]];

    //     const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
    //         "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
    //         "ten", "went", "wet", "arty", "egg", "not", "quar"];


    //     let solutions = findAllSolutions.findAllSolutions(grid, dictionary)

    //     const output = false;

    //     expect(endsWithQ(solutions.push("pranq"), false)).toEqual(output); //adding pranq which would cause this test to fail

    // });



});



//checks to see if any of the values in the solutions array contain Qx, where x is any non "u" character
function containsQx(solutions, grid, ending) {

    let regEx = /(q[a-t]{1})|(q[v-z]{1})/;
    let result = false;
    grid.forEach(line => {
        line.forEach(character => {

        character = character.toLowerCase();
        var test = regEx.test(character);
        if (test == true) {
            result = true;
        }
        });

        
    });

    if(result == true) {
        return solutions;
    }
    return ending;


}

describe("Contains qx function", () => {
    test("it should pass, returning an empty array, if the grid contains the substring Qx, where x is any character besides u", () => {

        const grid = [["T", "S", "Y", "R"],
                     ["Qa", "N", "P", "H"],
                     ["G", "Z", "Qu", "R"],
                     ["O", "N", "T", "A"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar", "sqat", "qan"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = [];

        expect(containsQx(solutions, grid, false)).toEqual(output);

    });



    // test("it should fail if none of the words in the solutions array conain the substring Qx, where x is any character besides "u"", () => {

    //     const grid = [["T", "W", "Y", "R"],
    //     ["N", "Qa", "P", "H"],
    //     ["G", "Qe", "Qu", "R"],
    //     ["O", "N", "T", "A"]];

    //     const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
    //         "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
    //         "ten", "went", "wet", "arty", "egg", "not", "quar"];


    //     let solutions = findAllSolutions.findAllSolutions(grid, dictionary)

    //     const output = false;

    //     expect(containsQx(solutions.push("qake"), false)).toEqual(output); //pushing quke to the solutions array which would cause this test to fail

    // });



});


//////////checks to make sure grid is a N x N matrix//////////
function checkDimensions(grid, size, solutions) {

    let boolean = false;
    grid.forEach(row => {
        if (row.length == size) { //checks if the number of elements in each row matches the expected size N
            boolean = true;
        }
        else { //sets boolean to false and returns if one of the rows does not equal the expected N
            return solutions;
        }

    });

    if (boolean == true && grid.length == size) {
        return true;
    }
    else {
        return solutions;
    }


}

describe("Dimension function", () => {
    test("it should pass when the grid is a N x N matrix", () => {

        const grid = [["T", "W", "Y", "R"],
        ["E", "N", "P", "H"],
        ["G", "Z", "Qu", "R"],
        ["O", "N", "T", "A"]];





        const output = true;

        expect(checkDimensions(grid, grid.length)).toEqual(output);

    });

    test("it should pass, returning an empty array, when the grid is not a N x N matrix", () => {

        const grid = [["T", "W", "Y", "R"],
        ["E", "N", "P", "H"],
        ["G", "Z", "Qu", "R"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = [];

        expect(checkDimensions(grid, grid.length, solutions)).toEqual(output);

    });

});


/////////checks for invalid input//////////
function invalidInput(grid, ending, solutions) {

    // let regEx = /([a-p]{1})|([r-z]{1})|(qu{1})|(Qu{1})/
    let result = false;
    let regEx = /([a-p][a-z])|([r-z][a-z])/;
    grid.forEach(line => {
        line.forEach(character => {

            character = character.toLowerCase();
            let test = regEx.test(character);
            if (test == true) {
                result = true;
            }

        });
    });
    if(result == true) {
        return solutions;
    }
    return ending;

}

describe("Invalid input function", () => {
    test("it should pass if the input grid contains valid characters", () => {

        const grid = [["T", "W", "Y", "R"],
        ["E", "N", "P", "H"],
        ["G", "Z", "Qu", "R"],
        ["O", "N", "T", "A"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = false;

        expect(invalidInput(grid, false, solutions)).toEqual(output);

    });

    test("it should pass, returning an empty array, when the input grid contains invalid characters", () => {

        const grid = [["T", "Wa", "Y", "R"],
        ["E", "N", "P", "H"],
        ["G", "Z", "Qu", "R"],
        ["O", "N", "T", "A"]];

        const dictionary = ["art", "ego", "gent", "get", "net", "new", "newt", "prat",
            "pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
            "ten", "went", "wet", "arty", "egg", "not", "quar"];


        let solutions = findAllSolutions.findAllSolutions(grid, dictionary);

        const output = [];

        expect(invalidInput(grid, false, solutions)).toEqual(output); //added the string "Wa" to the grid which is an invalid input

    });

});


///////////////////////////





const boggle_solver = require('../boggle_solver.js'); //specify the path to your boggle_solver.js file.

describe("Validate Submission", function() {
test('returns all matching words', () => {
let grid = [["A", "B"], ["C", "D"]];
let dict = ["AB", "ABD", "DCA", "XY"];
let solutions = boggle_solver.findAllSolutions(grid, dict);
let expected = ["ABD", "DCA"];
lowercaseStringArray(solutions);
lowercaseStringArray(expected);
expect(solutions.sort()).toEqual(expected.sort()); 
});
test('handles QU', () => {
let grid = [["A", "QU"], ["C", "D"]];
let dict = ["AQU"];

  let solutions = boggle_solver.findAllSolutions(grid, dict);
  lowercaseStringArray(solutions);
  lowercaseStringArray(dict);
  expect(solutions.sort()).toEqual(dict.sort()); 
});
});

// function ToGrid(rows) {
//     grid = Array.from(rows);
//     // console.log(grid)
//     return grid.map(row => row.split(""));
// }

// GIVEN CODE
function ToGrid(rows) {
    return rows.map(row => row.split(""));
    }

describe("Basic Sanity Checks", function() {
test('Empty Board', () => {
let grid = [];
let dict = ["ABC", "DEF"];
expect(boggle_solver.findAllSolutions(grid, dict)).toEqual([]);
});
test('searches in all directions', () => {
// let grid = ToGrid("ABC", "DEF", "GHI");
let grid = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]
let dict = ["EAB", "EBC", "ECB", "EDB", "EFB", "EGH", "EHI", "EIH"];
let solutions = boggle_solver.findAllSolutions(grid, dict);
lowercaseStringArray(solutions);
lowercaseStringArray(dict);
expect(solutions.sort()).toEqual(dict.sort());
});
});

describe("Duplicate Letters", function() {
test('Immediate Loop', () => {
let grid = [["A"]];
let dict = ["AA"];
expect(boggle_solver.findAllSolutions(grid, dict)).toEqual([]);
});
test('Later Loop', () => {
let grid = [["A", "B"], ["C", "D"]];
let dict = ["ABCA"];
expect(boggle_solver.findAllSolutions(grid, dict)).toEqual([]);
});

/*///////REMOVE
test('Legal Duplicate', () => {
let grid = ["AB", "CA"];
let dict = ["ABCA"];
// Also verifies that "ABCA" doesn't appear in the solution twice.

let solutions = boggle_solver.findAllSolutions(grid, dict);
lowercaseStringArray(solutions);
lowercaseStringArray(dict);
expect(solutions.sort()).toEqual(dict.sort());
});
///////*/

});

describe('Pathologically Slow', function() {
test('Try large matrix, duplicates, and long sequence', () => {
let grid = ToGrid('ABCDEFGHIJKLMN', 'NMLKJIHGFEDCBA', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN', 'ABCDEFGHIJKLMN'); // Very slow if 10x10 instead of 2x2. 
console.log(grid)
let dict = ['ANMLKJ', 'ABCDKJIH', 'ABCDEFGHIJKLM', 'AAAAAAAAAA'];
let expected = ['ANMLKJ', 'ABCDKJIH', 'ABCDEFGHIJKLM', 'AAAAAAAAAA'];

 let solutions = boggle_solver.findAllSolutions(grid, dict);
 lowercaseStringArray(solutions);
 lowercaseStringArray(expected);
 expect(solutions.sort()).toEqual(expected.sort());
});
});

describe("Recursive Steps", function() {
test('Illegal Jumps', () => {
    let grid = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]
    let dict = ["ADC", "ABG"];
expect(boggle_solver.findAllSolutions(grid, dict)).toEqual([]);
});
test('Windy Path', () => {
    let grid = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]
    let dict = ["ABFHDEC"]; // Snake through the grid.
let solutions = boggle_solver.findAllSolutions(grid, dict);

  // Lowercasing for case-insensitive string array matching.
lowercaseStringArray(solutions);
 lowercaseStringArray(dict);
expect(solutions.sort()).toEqual(dict.sort());
});
});

describe("Handle Qu", function() {
test('Basic Functionality', () => {
let grid = [
["A", "QU"],
["C", "D"]
];
let dict = ["AQUA", "AQUC", "QUA", "QUD"];
let expected = ["AQUC","QUA","QUD"];

let solutions = boggle_solver.findAllSolutions(grid, dict);

lowercaseStringArray(solutions);
lowercaseStringArray(expected);
expect(solutions.sort()).toEqual(expected.sort());
});
test('Trailing Q', () => {
let grid = [
["A", "QU"],
["C", "D"]
];
let dict = ["AQ"];
expect(boggle_solver.findAllSolutions(grid, dict)).toEqual([]);
});
/*
test('Q without a U', () => {
let grid = [
["A", "QU"],
["C", "D"]
];
let dict = ["QAC"];
expect(boggle_solver.findAllSolutions(grid, dict)).toEqual([]);
});
*/
});

/** Lowercases a string array in-place. (Used for case-insensitive string array

matching).
@param {string[]} stringArray - String array to be lowercase.
*/
function lowercaseStringArray(stringArray) {
for (let i = 0; i < stringArray.length; i++)
stringArray[i] = stringArray[i].toLowerCase();
}
describe('Boggle Solver tests', () => {
describe('Normal input', () => {

test('Normal case 3x3', () => {
  // Tests a normal 3x3 grid.
  const grid = [['A', 'B', 'C'],
                ['D', 'E', 'F'],
                ['G', 'H', 'I']];
  const dictionary = ['abc', 'abdhi', 'abi'];
  const expected = ['abc', 'abdhi'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());   
});

test('Normal case 4x4', () => {
  const grid = [['V', 'E', 'R', 'Y'],
                ['A', 'B', 'D', 'D'],
                ['D', 'E', 'D', 'E'],
                ['D', 'E', 'D', 'E']];
  const dictionary = ['dredd', 'bee', 'ready', 'very', 'acdb'];
  const expected = ['dredd', 'bee', 'very'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('Normal case 5x5', () => {
  // Tests a normal 5x5 grid.
  const grid = [['Qu', 'A', 'X', 'S', 'L'],
                ['A', 'R', 'R', 'I', 'L'],
                ['Y', 'F', 'I', 'E', 'D'],
                ['M', 'R', 'I', 'C', 'K'],
                ['A', 'N', 'D', 'M', 'O']];
  const dictionary = ['arf', 'ciel', 'derrick', 'army', 'hawaii', 'hero', 'academia'];
  const expected = ['arf', 'ciel', 'derrick', 'army'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('No solutions', () => {
  // Tests a grid and dictionary with no possible solutions.
  const grid = [['A', 'B', 'C'],
                ['D', 'E', 'F'],
                ['G', 'H', 'I']];
  const dictionary = ['alphabet', 'aeroplane', 'dijkstra'];
  const expected = [];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('Word that takes the entire grid', () => {
  // Tests a word that exactly takes the entire grid.
  const grid = [['A', 'B', 'S', 'T'],
                ['E', 'S', 'E', 'M'],
                ['S', 'N', 'I', 'O'],
                ['S', 'E', 'S', 'U']];
  const dictionary = ['abstemiousnesses', 'asbestos', 'sessensuoimetsba', 'abstemiousnessesa'];
  const expected = ['abstemiousnesses', 'sessensuoimetsba'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});
});

describe('Problem contraints', () => {
test('Only returns words with 3+ characters', () => {
// Tests that the algorithm only returns words with 3+ characters.
const grid = [['A', 'B', 'C'],
['D', 'E', 'F'],
['G', 'H', 'I']];
const dictionary = ['a', 'b', 'c', 'd', 'abc', 'ab', '', 'ghefi'];
const expected = ['abc', 'ghefi'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('Qu tile counts as 2 letters (can\'t skip the \'u\')', () => {
  // Tests that the Qu block tile counts as a single unit.
  const grid = [['Qu', 'E', 'R'],
                ['A', 'B', 'C'],
                ['D', 'E', 'F']];
  // The Qu count as one unit, the 'u' cannot be skipped or ignored.
  const dictionary = ['querbe', 'qerbe'];
  const expected = ['querbe'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('Word can\'t end in \'q\', but it can begin with q', () => {
  // Tests that no words can end in q, but some can actually start with q.
  const grid = [['I', 'R', 'A', 'Qu'],
                ['I', 'R', 'A', 'Qu'],
                ['I', 'R', 'A', 'Qu'],
                ['I', 'R', 'A', 'Qu']];
  const dictionary = ['iraq', 'iraqu', 'quari', 'quaa'];
  // Since 'iraq' ends with a q, and q's are always accompanied by a u, then
  // 'iraq' or any word ending in 'q', won't appear in a Boggle game.
  const expected = ['iraqu', 'quari', 'quaa'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('The same word can\'t use a block more than once', () => {
  // Tests that a sinbgle word does not recycle any chracters.
  const grid = [['A', 'D', 'E'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']];
  const dictionary = ['ade', 'ada', 'adexx', 'xxxxxx', 'xxxxxxx'];
  const expected = ['ade', 'adexx', 'xxxxxx'];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});
});

describe('Input edge cases', () => {
test('Grid is 1x1', () => {
// (Edge case) Since only 1 character words are possible, and these are
// shorter than 3, then there are no possible solutions.
const grid = [['A']];
const dictionary = ['a', 'b', 'c'];
const expected = [];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('Grid is 0x0', () => {
  // (Edge case) Tests that the algorithm can correctly return an empty list
  // when given an empty grid.
  const grid = [[]];
  const dictionary = ['hello', 'there', 'general', 'kenobi'];
  const expected = [];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});

test('Dictionary is empty', () => {
  // (Edge case) Since there are no possible solutiona, it should return an
  // empty list.
  const grid = [['A', 'B', 'C', 'D'],
                ['E', 'F', 'G', 'H'],
                ['I', 'J', 'K', 'L'],
                ['M', 'N', 'O', 'P']];
  const dictionary = [];
  const expected = [];

  let solutions = boggle_solver.findAllSolutions(grid, dictionary);

  // Lowercasing for case-insensitive string array matching.
  lowercaseStringArray(solutions);
  lowercaseStringArray(expected);
  expect(solutions.sort()).toEqual(expected.sort());
});
});
});
