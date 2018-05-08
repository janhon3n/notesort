import React, { Component } from 'react'
import MusicRenderer from './MusicRenderer'
import './App.css'
import { BubbleSorter } from './Sorting/BubbleSorter'
import { SelectionSorter } from './Sorting/SelectionSorter'
import { QuickSorter } from './Sorting/QuickSorter'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.scales = {
      minor: [0, 2, 3, 5, 7, 8, 10],
      major: [0, 2, 4, 5, 7, 9, 11],
      chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      pentatonic: [0, 2, 4, 7, 9],
    }

    this.launchSort = this.launchSort.bind(this)
    this.musicRenderer = React.createRef()
    this.state = {
      isStarted: false,
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      sortType: 'BubbleSort',
      scale: 'minor',
      octaveCount: 4,
    }
    window.onresize = (w, e) => {
      this.setState({
        size: { width: window.innerWidth, height: window.innerHeight },
      })
    }
  }

  createNotes() {
    let scale = this.scales[this.state.scale]
    let notes = []
    let i = 0
    while (
      notes.length === 0 ||
      notes[notes.length - 1] < this.state.octaveCount * 12
    ) {
      notes.push(scale[i % scale.length] + Math.floor(i / scale.length) * 12)
      i++
    }
    return shuffleArray(notes)
  }

  launchSort() {
    let notes = this.createNotes()
    this.musicRenderer.current.newSortTask(
      this.state.octaveCount,
      notes,
      this.createSorter(this.state.sortType, notes)
    )
  }

  createSorter(sortType, notes) {
    let sf = (a, b) => {
      return a < b
    }
    switch (sortType) {
      case 'BubbleSort':
        return new BubbleSorter(notes, sf)
      case 'SelectionSort':
        return new SelectionSorter(notes, sf)
      case 'QuickSort':
        return new QuickSorter(notes, sf)
      default:
        return null
    }
  }

  render() {
    return (
      <div className="App">
        <MusicRenderer
          height={this.state.size.height - 100}
          ref={this.musicRenderer}
        />
        <div
          className="Options"
          style={{
            height: 100,
          }}
        >
          <div className="Input">
            Sort type:
            <select
              onChange={e => {
                this.setState({ sortType: e.target.value })
              }}
            >
              {['BubbleSort', 'SelectionSort', 'QuickSort'].map(sortName => {
                return <option>{sortName}</option>
              })}
            </select>
          </div>
          <div className="Input">
            Octave count:
            <input
              onChange={e => {
                this.setState({ octaveCount: e.target.value })
              }}
              value={this.state.octaveCount}
              type="number"
              min="1"
              step="1"
              max="6"
            />
          </div>
          <div className="Input">
            Scale:
            <select
              onChange={e => {
                this.setState({ scale: e.target.value })
              }}
            >
              {Object.keys(this.scales).map(scale => {
                return <option value={scale}>{scale}</option>
              })}
            </select>
          </div>

          <div className="Input">
            <button
              onClick={() => {
                this.launchSort()
              }}
            >
              Sort!
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
