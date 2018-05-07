import React, { Component } from 'react'
import MusicRenderer from './MusicRenderer'
import './App.css'
import { BubbleSorter } from './Sorting/BubbleSorter'
import { SelectionSorter } from './Sorting/SelectionSorter'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.launchSort = this.launchSort.bind(this)
    this.musicRenderer = React.createRef()
    this.state = {
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      sortType: 'BubbleSort',
    }
    window.onresize = (w, e) => {
      this.setState({
        size: { width: window.innerWidth, height: window.innerHeight },
      })
    }
  }

  launchSort() {
    this.musicRenderer.current.newSortTask(
      25 + 24,
      shuffleArray(
        [0, 3, 7, 11, 14, 17, 20, 24, 2, 5, 8, 12, 15, 19, 23].concat(
          [3, 7, 11, 14, 17, 20, 24, 2, 5, 8, 12, 15, 19, 23].map(i => i + 24)
        )
      ),
      this.createSorter(this.state.sortType)
    )
  }

  createSorter(sortType) {
    let sf = (a, b) => {
      return a < b
    }
    switch (sortType) {
      case 'BubbleSort':
        return new BubbleSorter([], sf)
      case 'SelectionSort':
        return new SelectionSorter([], sf)
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
              <option>BubbleSort</option>
              <option>SelectionSort</option>
            </select>
          </div>
          <div className="Input">
            Number of notes:
            <input type="number" min="2" max="48" />
          </div>
          <div className="Input">
            List of notes:
            <input type="text" />
          </div>

          <div className="Input">
            <button onClick={this.launchSort}>Sort!</button>
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
