import React, { Component } from 'react'

export default class SortOptions extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      sortType: 'BubbleSort',
      octaveCount: 3,
      scaleName: 'minor',
    }
  }

  handleChange(e) {
    let stateChange = {}
    stateChange[e.target.name] = e.target.value
    this.setState(stateChange)
  }

  render() {
    return (
      <div
        className="Options"
        style={{
          height: 100,
        }}
      >
        <div className="Input">
          Sort type:
          <select
            name={'sortType'}
            value={this.state.sortType}
            onChange={this.handleChange}
          >
            {['BubbleSort', 'SelectionSort', 'QuickSort'].map(sortName => {
              return <option>{sortName}</option>
            })}
          </select>
        </div>
        <div className="Input">
          Octave count:
          <input
            name={'octaveCount'}
            value={this.state.octaveCount}
            onChange={this.handleChange}
            type="number"
            min="1"
            step="1"
            max="6"
          />
        </div>
        <div className="Input">
          Scale:
          <select
            name={'scaleName'}
            value={this.state.scaleName}
            onChange={this.handleChange}
          >
            {this.props.scales.map(scale => {
              return <option value={scale}>{scale}</option>
            })}
          </select>
        </div>

        <div className="Input">
          <button
            onClick={() => {
              this.props.launchSort(
                this.state.sortType,
                this.state.scaleName,
                this.state.octaveCount
              )
            }}
          >
            Sort!
          </button>
        </div>
      </div>
    )
  }
}
