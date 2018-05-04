import React, { Component } from 'react';
import './Bars.css'

export default class Bars extends Component {
   render() {
      return (
         <div className="Bars">
            {
               this.props.list.map(i => {
                  return <div className="Bar" style={{
                     backgroundColor:
                        'hsl(200, '
                           + (i / this.props.max * 80) + '%, '
                           + (i / this.props.max * 80) + '%)',
                     height: i / this.props.max * this.props.height,
                  }}/>
               })
            }
         </div>
      );
   }
}