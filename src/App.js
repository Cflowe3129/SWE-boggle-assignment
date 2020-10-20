import React, { useState } from 'react';
import BoggleSolver from './Boggle Implementation/boggle_solver';
// import StartButton from './StartButton';
// import StopButton from './StopButton';
import { Grid, Button, InputLabel, NativeSelect } from '@material-ui/core';
import Timer from 'react-compound-timer'
import * as firebase from 'firebase';
import './App.css';
import TextInput from './AnswerInput';
import googleSignIn from './googleSignIn';


const gridItems1 = {
  0: { size: 3, label: "O" },
  1: { size: 3, label: "I" },
  2: { size: 3, label: "H" },
}

const gridItems2 = {
  0: { size: 3, label: "V" },
  1: { size: 3, label: "O" },
  2: { size: 3, label: "D" },
}

const gridItems3 = {
  0: { size: 3, label: "U" },
  1: { size: 3, label: "S" },
  2: { size: 3, label: "O" },
}



var validAnswers = [];

const findAllSolutions = require("./Boggle Implementation/boggle_solver");


async function getUserInput(promptText, grid, dict) {

  var value = "";
  var trueGrid = [];
  // var grid = Array.from(grid);
  console.log(grid.size)

  for (let i = 1; i <= grid.size; i++) {
    trueGrid.push(grid.grid[i]);
  }
  console.log(trueGrid)
  const promptResoponse = prompt(promptText)
  console.log(promptResoponse);



  let solutions = findAllSolutions.findAllSolutions(trueGrid, dict)

  solutions.forEach(word => {
    let response = promptResoponse.toLowerCase();
    console.log(response)
    if (word === response) {
      console.log("true")
      value = response;
      console.log(value)
    }
  })
  return value;
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startState: false,
      answers: validAnswers,
      word: '',
      correct: [],
      grids: [],
      timer: undefined,
      line1: [],
      line2: [],
      line3: [],
      puzzle: 0,
      highScore: 0,
    }
    this.ref = firebase.firestore();
  }

  async componentDidMount() {

    this.unsubscribe = this.ref.collection('3x3').onSnapshot(async (querySnapshot) => {
      var gridArray = [];
      querySnapshot.forEach((doc) => {
        gridArray.push({
          grid: doc.data().grid,
          dictionary: doc.data().dictionary,
          size: doc.data().size,
          highScore: doc.data().highScore,
        })
      })
      console.log(gridArray[this.state.puzzle].dictionary);
      this.setState({
        grids: gridArray,
        line1: gridArray[this.state.puzzle].grid[1],
        line2: gridArray[this.state.puzzle].grid[2],
        line3: gridArray[this.state.puzzle].grid[3],
        highScore: gridArray[this.state.puzzle].highScore,
      })

      var mapToGrid = [];
      for (let i = 1; i <= gridArray[this.state.puzzle].size; i++) {
        mapToGrid.push(gridArray[this.state.puzzle].grid[i]);
      }
      console.log(mapToGrid)
      let solutions = [];
      solutions = await findAllSolutions.findAllSolutions(mapToGrid, gridArray[this.state.puzzle].dictionary)

      console.log(solutions)
      await solutions.forEach(answer => {
        validAnswers.push(answer + " :")
      })
      this.setState({ answers: validAnswers})
      console.log(this.state.answers)

      this.unsubscribe();
    })

    var trueGrid_Mount = [];
    for (let i = 1; i <= this.state.grids.size; i++) {
      trueGrid_Mount.push(this.state.grids.grid[i]);
    }
    console.log(this.state.grids)



  }

  async updateBoard() {
    validAnswers = []
    this.setState({ word: '', correct: [], timer: 0});
    this.componentDidMount();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

          {/* Timer component */}
          {this.state.state == true && <Timer
            initialTime={0}
            direction="forward"
            timeToUpdate={10}
            checkpoints={[
              {
                time: 0,
                callback: () => alert('countdown finished'),
              },
            ]}
            onStart={() => { this.setState({ timer: Timer.Seconds + Timer.Minutes }) }}
          >
            <div style={{ fontFamily: 'Helvetica Neue' }}>
              <div style={{ fontSize: 32 }}>
                <Timer.Minutes /> minutes
              <div></div>
                <Timer.Seconds /> seconds
              </div>
            </div>
          </Timer>}

          {/* Title and corredt input list */}
          <header className="Header-Title">Boggle Game High Score: {this.state.highScore}</header>
          {this.state.state === true && <p>Correct Answers</p>}
          {this.state.state === true && <p>{this.state.correct}</p>}

          {/* Full answer list and correct answers submitted */}
          {/* {this.state.state == false && <p>Time: {this.state.timer}</p>} */}
          {this.state.state === false && <p>Valid Answers</p>}
          {this.state.state === false && <p>{this.state.answers}</p>}
          {this.state.state === false && <p>Your Correct Answers</p>}
          {this.state.state === false && <p>{this.state.correct}</p>}

          {/* 3 x 3 Grid */}
          {this.state.state === true && <Grid className="Grid" container justify="center" spacing={100}>
            {/* Row 1 */}
            <Grid className="Grid-line" container justify="center" item xs={12} spacing={3}>

              {Object.keys(this.state.line1).map((rowKey) => {
                return (
                  <Grid item key={rowKey} xs={3}>
                    {this.state.line1[rowKey]}
                  </Grid>
                );
              })}
            </Grid>

            {/* Row 2 */}
            <Grid className="Grid-line" container justify="center" item xs={12} spacing={3}>
              {Object.keys(this.state.line2).map((rowKey) => {
                return (
                  <Grid item key={rowKey} xs={3}>
                    {this.state.line2[rowKey]}
                  </Grid>
                );
              })}
            </Grid>

            {/* Row 3 */}
            <Grid className="Grid-line" container justify="center" item xs={12} spacing={3}>
              {Object.keys(this.state.line3).map((rowKey) => {
                return (
                  <Grid item key={rowKey} xs={3}>
                    {this.state.line3[rowKey]}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>}


          {/* <StartButton promptText="Start" />
          <StopButton promptText="Stop" />
          <TextInput promptText="Enter Word" />   */}

          {this.state.state === true && <Button variant="contained" color="white" prompt="Enter Word" onClick={() => {
            getUserInput(prompt, this.state.grids[this.state.puzzle], this.state.grids[this.state.puzzle].dictionary).then(function (result) {
              console.log("Returned");
              console.log(result);
              return result;
            }).then((value) => {
              if (!this.state.correct.includes(value + " ") && (value != "")) {
                this.state.correct.push(value + " ")
                this.setState({ correct: this.state.correct })
                console.log("STATE:" + this.state.correct)
              } else if (value == "") {
                alert("This word is not in the dictionary. Please enter another word")
              } else {
                alert("You have already found this word. Please enter another word")
              }

            })

          }} >Enter Word</Button>}
 
          <div className="Start-Button">
          <div>
              <Button variant="contained" color="primary" onClick={() => {
                googleSignIn();
              }}> SignIn with Google </Button>
            </div>

            <div>
              <Button variant="contained" color="primary" onClick={() => {
                console.log("Pressed");
                console.log(this.state.grids.grid)
                this.setState({ state: true });
                this.updateBoard();
              }}> Start </Button>
            </div>
  
            {<div>
              <InputLabel htmlFor="select">Load Challenge</InputLabel>
              <NativeSelect id="select" onChange={(value) => { console.log(value.target.value); this.setState({puzzle: value.target.value, state: true}); this.updateBoard()
              }}>
                <option value="0">1 </option>
                <option value="1">2 </option>
              </NativeSelect>
            </div>}

          </div>

          <div className="Stop-Button">
            <Button variant="contained" color="secondary" onClick={() => {
              console.log("Pressed");
              this.setState({ state: false });
              
            }}> Stop </Button>
          </div>


        </header>
      </div>
    );
  }

}

export default App;

