import React, { Component } from 'react';

export default class Piano extends Component {

   static blackNotes = [1,3,6,8,10]

   constructor(props) {
      super(props)
   }
   render() {
      let indicies = Array.apply(null, {length: this.props.keyCount}).map(Number.call, Number)
      let whiteIndicies = indicies.filter((n) => {
         return Piano.blackNotes.indexOf(n%12) === -1
      })
      let blackIndicies = indicies.filter((n) => {
         return Piano.blackNotes.indexOf(n%12) !== -1
      })

      let whiteKeyHeight = this.props.height / whiteIndicies.length 
      return (
         <svg height={this.props.height} width={100}>
         {
            whiteIndicies.map((n) => {
               return this.createKey(n, false, whiteKeyHeight)
            })
         }
         {
            blackIndicies.map((n) => {
               return this.createKey(n, true, whiteKeyHeight)
            })
         }
         </svg>
      );
   }

   createKey(noteNumber, isBlack, whiteKeyHeight) {
      let posY = this.calculatePosY(noteNumber, isBlack, whiteKeyHeight)
      let width = isBlack ? "70%" : "100%"
      let isActive = this.props.activeNotes.indexOf(noteNumber) !== -1
      return (<rect
         x={0} y={posY}
         width={width}
         height={isBlack ? whiteKeyHeight * 2/3 : whiteKeyHeight}
         fill={isActive ? 
            (isBlack ? "hsl(45,100%,40%)" : "hsl(45,100%,60%)") :
            isBlack ? "#000" : "#EEE"}/>)
   }

   calculatePosY(noteNumber, isBlack, whiteKeyHeight){
      let blacksBefore = Piano.blacksNotesBefore(noteNumber)
      let whitesBefore = noteNumber - blacksBefore
      return this.props.height - whiteKeyHeight - 
            (isBlack ?
            (whitesBefore - 1) * whiteKeyHeight
                  + (whiteKeyHeight * (3/8)) :
            whitesBefore * whiteKeyHeight)
   }

   static blacksNotesBefore(noteNumber) {
      return Math.floor(noteNumber/12) * 5
         + Piano.blackNotes.filter((n) => {
         return n < (noteNumber%12)
         }).length
   }
}