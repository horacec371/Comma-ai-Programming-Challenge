import React, { Component } from 'react'
import { Marker, InfoWindow, Polyline } from 'react-google-maps';

import SimulationSettings from './SimulationWindow/simulation'


class CustomPolyline extends Component{

  constructor(){
    super()
    this.state = {
      isOpen:false,
      offset:'100%',
      color:this.getRandomColor(),
      zIndex:0
      }
    this.interval = null
}

  // Callback functions that update the state of the current Component(to be used in SimulationSettings Component))
  ExtraMarkersadd = (markers) => {this.setState({ markers:this.state.markers.concat(markers) })}
  onMarkClick = (index) => {this.setState({ isOpen:!this.state.isOpen,selectedMark:index,zIndex:this.state.zIndex + 1}) }
  isOpenTrigger = (value) => {this.setState({isOpen:value})}
  zIndexTrigger = (value) => {this.setState({ zIndex:value })}
  DeleteMarkers = (filteredArray) => {this.setState({ markers:filteredArray })}
  removeCarAnimation = (value) => {this.interval = value}



      getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    SecondsToHours (sec) {
        const hrs = Math.floor(sec / 3600);
       const min = Math.floor((sec - (hrs * 3600)) / 60);
       let seconds = sec - (hrs * 3600) - (min * 60);
       seconds = Math.round(seconds * 100) / 100

       let result = (hrs < 10 ? "0" + hrs : hrs);
       result += ":" + (min < 10 ? "0" + min : min);
       result += ":" + (seconds < 10 ? "0" + seconds : seconds);
       return result;
}



  MarkerClick(index){
    this.setState({
      isOpen:!this.state.isOpen, //if there is a simulation box open it closes it,if there isn't it just open the selected Marker simulationbox
      selectedMark:index,
      zIndex:this.state.zIndex + 1 //increases the zIndex so that it is more visible than the other markers
    })
    if(this.state.isOpen){
        this.animateCircle() //start car simulation
    }
  }

  addMarker(coords,index,color,onClick) {
      const marker = <Marker
        position= {coords}
        title= {coords.lat + ',' + coords.lng}
        opacity= {color === 'red'|| color === 'pink' ? 1 : 0.4}
        icon= {`https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`}
        zIndex={(color === 'pink' || color === 'red') ? 9031 : 0}
        onClick={() => onClick(index)}
      />
      return marker
    }


  //initializes the markers array with the red marker that signals the start of the trip
  drawing(){
    let markers = []
    const marker = this.addMarker(this.props.coords[0],0,'red',(index) => this.MarkerClick(index))
    markers[0] = marker
    this.setState({markers})
  }

  //Car simulation function
 animateCircle(){
        var count = 0;
        if(!this.interval)
          this.interval = window.setInterval(() => {
            count = (count + 1) % 200;
            this.setState({
              offset:(count / 2) + '%'
            })
          }, 20);
}




  componentWillMount(){
        this.drawing()
  }


  render(){
    const lineSymbol = {
      path: 'M -2,0 0,-2 2,0 0,2 z',
      strokeColor: '#005db5',
      strokeWidth: '#005db5',
      strokeWeight: this.interval ? 6 : 0
    }
    return(
      <React.Fragment>
        <Polyline
                path={this.props.coords}
                options={{
                  strokeColor: this.state.color,
                  strokeWeight: 6,
                  icons: [{
                    icon: lineSymbol,
                    offset: this.state.offset
                  }],
                  zIndex: this.state.zIndex
                }}
                />
              {this.state.markers.map(marker => <React.Fragment key={marker.props.title}>
            {marker}
          </React.Fragment>)
        }

        {this.state.isOpen && (
          <InfoWindow
              position={{
                lat:this.state.markers[this.state.selectedMark].props.position.lat,
                lng:this.state.markers[this.state.selectedMark].props.position.lng
              }}
              onCloseClick={() => {
                this.MarkerClick()
              }}
            >
            <div>
              <SimulationSettings
                      selectedMark={this.state.selectedMark}
                      markers={this.state.markers}
                      coords={this.props.coords}

                      start_time={this.props.start_time}
                      end_time={this.props.end_time}

                      ExtraMarkersadd={this.ExtraMarkersadd}
                      addMarker={this.addMarker}
                      isOpenTrigger={this.isOpenTrigger}
                      interval={this.interval}
                      zIndexTrigger={this.zIndexTrigger}
                      DeleteMarkers={this.DeleteMarkers}
                      removeCarAnimation={this.removeCarAnimation}
                      onMarkClick={this.onMarkClick}
               />
            </div>
          </InfoWindow>
        )}
        </React.Fragment >
    )
  }
}



export default CustomPolyline
