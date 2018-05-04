import React, { Component } from 'react';
import Bars from './Bars'
import Piano from './Piano'
import './App.css'

class App extends Component {

  render() {
    let keyCount = 48
    let stepCount = (keyCount - Piano.blacksNotesBefore(keyCount)) * 2
    return (
      <div className="App">
        <Piano height={800} keyCount={keyCount} activeNotes={[0,2,3,5,7,9,11,12]}/>
        <Bars height={800} max={stepCount} list={[1,2,3,4,5,6,7,8,9,10,11,12,13,34,15,16,37,1,44,45,46,47,stepCount-1]}/>
      </div>
    );
  }
}

export default App;
