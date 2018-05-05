import React, { Component } from 'react';
import MusicRenderer from './MusicRenderer';
import './App.css'

export default class App extends Component {

   constructor(props){
      super(props)
      this.launchSort = this.launchSort.bind(this)
      this.musicRenderer = React.createRef()
      this.state = {
         size: {
            width: window.innerWidth,
            height: window.innerHeight,
         }
      }
      window.onresize = (w, e) => {
         this.setState({size: {width: window.innerWidth, height: window.innerHeight}})
      }
   }

   launchSort() {
      this.musicRenderer.current.newSortTask(
         25,
         [0,3,7,11,14,17,20,24,2,5,8,12,15,19,23].reverse(),
         null)
   }

   render() {
      return (
         <div className="App">
            <MusicRenderer height={this.state.size.height - 100}
               ref={this.musicRenderer}/>
            <div className="Options" style={{
              height: 100, 
            }}>
               <div className="Input">
               Sort type:
                  <select>
                     <option>BubbleSort</option>
                  </select>
               </div>
               <div className="Input">
                  Number of notes:
                  <input type="number" min="2" max="48"/>
               </div>
               <div className="Input">
                  List of notes:
                  <input type="text"/>
               </div>
               
               <div className="Input">
                  <button onClick={this.launchSort}>Sort!</button>
               </div>
            </div>
         </div>
      )
   }
}