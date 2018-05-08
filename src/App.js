import React, { Component } from 'react'
import MusicRenderer from './MusicRenderer'
import './App.css'
import { BubbleSorter } from './Sorting/BubbleSorter'
import { SelectionSorter } from './Sorting/SelectionSorter'
import { QuickSorter } from './Sorting/QuickSorter'
import SortOptions from './SortOptions'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.scales = {
      minor: [0, 2, 3, 5, 7, 8, 10],
      major: [0, 2, 4, 5, 7, 9, 11],
      chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      pentatonic: [0, 2, 4, 7, 9],
      jazz: [0, 3, 5, 6, 7, 10],
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

  createNotes(scaleName, octaveCount) {
    let scale = this.scales[scaleName]
    let notes = []
    let i = 0
    while (notes.length === 0 || notes[notes.length - 1] < octaveCount * 12) {
      notes.push(scale[i % scale.length] + Math.floor(i / scale.length) * 12)
      i++
    }
    return shuffleArray(notes)
  }

  launchSort(sortType, scaleName, octaveCount) {
    let notes = this.createNotes(scaleName, octaveCount)
    this.musicRenderer.current.newSortTask(
      octaveCount,
      notes,
      this.createSorter(sortType, notes)
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
        <div className="SortAndMusicSection">
          <MusicRenderer
            height={this.state.size.height - 100}
            ref={this.musicRenderer}
          />
          <div
            style={{
              backgroundColor: '#EEE',
              padding: '15px',
            }}
          >
            <h2>Music options</h2>
          </div>
        </div>
        <SortOptions
          height={100}
          launchSort={this.launchSort}
          scales={Object.keys(this.scales)}
        />
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
