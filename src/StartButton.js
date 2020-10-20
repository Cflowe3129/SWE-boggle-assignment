import React from 'react';
import { Button } from '@material-ui/core'

// function changeStartState(startState) {
//     console.log("Pressed");
//     this.setState({ startState: true })
//     console.log(this.state.startState);
// }

class StartButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            state: false,
        }
    }

    render() {

        return (
            <div>
                <Button variant="contained" color="primary" onClick={() => {
                    console.log("Pressed");
                    this.setState({ state: true });
                    console.log(this.state.state);
                }}> Start </Button>
            </div>
        )
    }

}

export default StartButton;
