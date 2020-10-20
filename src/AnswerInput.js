import React, { useState } from 'react';

const findAllSolutions = require("./Boggle Implementation/boggle_solver");

function TextInput({ promptText }) {
    const [text, setText] = useState("no text set");

    function getUserInput() {
        const promptResoponse = prompt(promptText)
        console.log(promptResoponse);
        setText(promptResoponse);
        
        // let solutions = findAllSolutions.findAllSolutions([['A', 'Qu'],
        // ['C', 'D']], ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
        //     'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
        //     'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar', 'ab', 'abd', 'dca', 'qac'])
        

    }

    return (
        <div>
            <button onClick={() => getUserInput()}>Enter Word</button>
            {text}
        </div>
    )
}

export default TextInput;