import React, { Component } from 'react';
import Bars from './Bars'
import Piano from './Piano'
import {BubbleSorter} from './Sorting'
import Tone from 'tone'
import './MusicRenderer.css'

class MusicRenderer extends Component {

  constructor(props) {
    super(props)

    this.sorter = null
    this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster()
    this.state = {
      keyCount: 24,
      notes: [],
      activeNotes: [],
    }
  }

  newSortTask = (keyCount, notes, sorter) => {
    this.setState({keyCount: keyCount, notes: notes, activeNotes: []})
    this.sorter = new BubbleSorter(notes, (a,b) => { return (a < b) })

    clearInterval(this.sortStepUpdatingInterval)
    this.sortStepUpdatingInterval = setInterval((() => {
      let [newNotes, activeNotes, finished] = this.sorter.step()
      if (activeNotes.length > 0){
        this.setState({notes: newNotes, activeNotes: activeNotes})
        this.playNotes(activeNotes)
      } 
    }).bind(this), 700)
  }

  render() {
    let stepCount = this.keyToBarValue(this.state.keyCount)
    return (
      <div className="MusicRenderer">
        <Piano height={this.props.height} keyCount={this.state.keyCount} activeNotes={this.state.activeNotes}/>
        <Bars height={this.props.height} max={stepCount}
          list={this.state.notes.map(k => this.keyToBarValue(k))}
          activeItems={this.state.activeNotes.map(k => this.keyToBarValue(k))}
          />
      </div>
    );
  }

  keyToBarValue = (keyNumber) => {
    return keyNumber + Piano.blacksNotesBefore(keyNumber) + 1
  }

  playNotes(notes){
    notes.forEach((n) => {
      this.synth.triggerAttackRelease(this.noteToString(n), "16n");
    })
  }

  noteToString(note) {
    let octave = 2 + (Math.floor(note/12))
    let name = (['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'])[note%12]
    return name+octave
  }
}

export default MusicRenderer;
