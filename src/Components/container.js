import React, { Component } from 'react'
import Map from './mapcomponent'


class Container extends Component{

  constructor(){
    super()
    this.state = {}
    this.fetch_trip()
  }

  //fetches an array of stringified json-files that has been created by the backend containing all of the trips(527)
  fetch_trip(){
    fetch('/api/files')
      .then(res => res.json())
      .then(trip => {
        this.setState({
          coords:trip
        })
      })
      .catch(err => console.log(err.message))
  }


  render(){
    return(
      <div>
        {typeof this.state.coords !== 'undefined' ?   <div>
                <div style={{ width: '100vw',height: '100vh'}}>
                  <Map coords={this.state.coords}/>
                </div>
              </div> : null}
        </div>

    )}
}

export default Container
