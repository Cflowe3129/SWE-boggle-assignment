import React, { useState } from 'react';
import {Button} from '@material-ui/core'

class StopButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            state: false,
        }
    }

    render() {

        return (
            <div>
                <Button variant="contained" color="secondary" onClick={() => {
                    console.log("Pressed");
                    this.setState({ state: true });
                    console.log(this.state.state);
                }}> Stop </Button>
            </div>
        )
    }

}

export default StopButton;
