import React, { Component } from 'react';
import './Bars.css'

export default class Bars extends Component {
   render() {
      return (
         <div className="Bars">
            {
               this.props.list.map(i => {
                  let isActive = this.props.activeItems.indexOf(i) !== -1
                  return <div className="Bar" style={{
                     backgroundColor:
                        isActive ? 
                        'hsl(45, '
                           + (i / this.props.max * 60+20) + '%, '
                           + (i / this.props.max * 60+20) + '%)' :
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