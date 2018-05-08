import React, { Component } from 'react'
import Bars from './Bars'
import Piano from './Piano'
import Tone from 'tone'
import './MusicRenderer.css'

class MusicRenderer extends Component {
  constructor(props) {
    super(props)
    this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster()
    this.executeSortingStep = this.executeSortingStep.bind(this)
    this.sorter = null
    this.state = {
      octaveCount: 4,
      sortingInProgress: false,
      notes: [],
      activeNoteIndicies: [],
    }
  }

  newSortTask = (octaveCount, notes, sorter) => {
    this.sorter = sorter
    if (!this.state.sortingInProgress) {
      setTimeout(this.executeSortingStep, 500)
    }
    this.setState({
      octaveCount: octaveCount,
      notes: notes,
      activeNoteIndicies: [],
      sortingInProgress: true,
    })
  }

  executeSortingStep = () => {
    let [newNotes, activeNoteIndicies, finished] = this.sorter.step()
    this.setState({
      notes: newNotes,
      activeNoteIndicies: activeNoteIndicies,
    })
    this.playNotes(
      newNotes.filter((p, i) => {
        return activeNoteIndicies.indexOf(i) !== -1
      })
    )
    if (!finished && this.state.sortingInProgress) {
      setTimeout(
        this.executeSortingStep,
        300 //[250, 500, 500][Math.floor(Math.random() * 3)]
      )
    } else {
      this.setState({ sortingInProgress: false })
    }
  }

  render() {
    let stepCount = this.keyToBarValue(this.state.octaveCount * 12 + 1)
    return (
      <div className="MusicRenderer">
        <Piano
          height={this.props.height}
          keyCount={this.state.octaveCount * 12 + 1}
          activeNotes={this.state.notes.filter((n, i) => {
            return this.state.activeNoteIndicies.indexOf(i) !== -1
          })}
        />
        <Bars
          height={this.props.height}
          max={stepCount}
          list={this.state.notes.map(k => this.keyToBarValue(k))}
          activeIndicies={this.state.activeNoteIndicies}
        />
      </div>
    )
  }

  keyToBarValue = keyNumber => {
    return keyNumber + Piano.blacksNotesBefore(keyNumber) + 1
  }

  playNotes(notes) {
    notes.forEach(n => {
      this.synth.triggerAttackRelease(
        this.noteToString(n, 3 - Math.round(this.state.octaveCount / 2)),
        '16n'
      )
    })
  }

  noteToString(note, lowestOctave) {
    let octave = lowestOctave + Math.ceil(note / 12)
    let name = [
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
      'A',
      'A#',
      'B',
    ][note % 12]
    return name + octave
  }
}

export default MusicRenderer
