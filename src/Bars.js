import React, { Component } from 'react'
import './Bars.css'

export default class Bars extends Component {
  render() {
    return (
      <div className="Bars">
        {this.props.list.map((item, index) => {
          let isActive = this.props.activeIndicies.indexOf(index) != -1
          return (
            <div
              className="Bar"
              style={{
                backgroundColor: isActive
                  ? 'hsl(45, ' +
                    (item / this.props.max * 60 + 20) +
                    '%, ' +
                    (item / this.props.max * 60 + 20) +
                    '%)'
                  : 'hsl(200, ' +
                    item / this.props.max * 80 +
                    '%, ' +
                    item / this.props.max * 80 +
                    '%)',
                height: item / this.props.max * this.props.height,
              }}
            />
          )
        })}
      </div>
    )
  }
}
