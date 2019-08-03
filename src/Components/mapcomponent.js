import React, { Component } from 'react';
import { withGoogleMap,withScriptjs, GoogleMap,  } from 'react-google-maps';

// Component Imports
import CustomPolyline from './polyline'
import Help from './help'

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';




class Map extends Component{

  //Changes the center of the map to the corresponding lat and lng of the trip that the user has selected
  TripClick(trip){
    const parsed = JSON.parse(trip)
    const bounds = this.zoomToMarker(parsed)
    this.map.panTo({lat:parsed.coords[0].lat,lng:parsed.coords[0].lng})
    this.map.fitBounds(bounds)
  }

  //Zooms to the Marker so that it's clearly visible and the user doesn't confuse it with other Markers that may be next to it
  zoomToMarker(trip){
    const bounds  = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(trip.coords[0].lat,trip.coords[0].lng))
    return bounds
  }



  render(){
  const json = JSON.parse(this.props.coords[0])
  // positions the dashboard  component when the loading screen has ended
  window.setTimeout(() => {
    document.documentElement.style.setProperty('--positionTop', '10%');
    document.documentElement.style.setProperty('--positionLeft', '1%');
  },3000)

  return(
    <React.Fragment>
      <GoogleMap  defaultCenter={{ lat: json.coords[0].lat, lng: json.coords[0].lng }} zoom={10}  id="map_canvas" ref={(ref) => { this.map = ref}}  > { /*Calls custom polyline component for every trip(draws poylines,adds markers)*/}
        {this.props.coords.map((trip,index) => {return index <= this.props.coords.length ? <CustomPolyline key={JSON.parse(trip).start_time}  coords={JSON.parse(trip).coords} start_time={JSON.parse(trip).start_time}  end_time={JSON.parse(trip).end_time}      />  :  <h1 >loading...</h1>
        })}
      </GoogleMap>
      <Paper  className="help paper-box">
          <img src="https://pbs.twimg.com/profile_images/1142533326302957568/iwZRdQ_U_400x400.png" alt="comma.ai" width="50"/>
          <h1 style={{marginTop:'2px'}}>TRIPS DASHBOARD</h1>
            <ul>
              {this.props.coords.map((trip,index) => { return <li key={JSON.parse(trip).start_time}  style={{cursor:'pointer'}} onClick={() => this.TripClick(trip)}>     { /* adds trips to the dashboard */}
                  <Paper style={{marginBottom:'0.6em',padding:'0.4em',borderRadius:'0px'}}>
                        <div >{index+1} - <span className="nav-link">{JSON.parse(trip).start_time}</span> <img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red point" /></div>
                    </Paper>
                </li>}
              )}
            </ul>
      </Paper>
      <Help />
    </React.Fragment>
  )
  }

}
const WrappedMap = withScriptjs(withGoogleMap(Map))

 class App extends Component{

  render(){
      return(
        <React.Fragment>
          {/*Loading screen that gets automatically hidden when the map loads*/}
          <Grid container direction="column" alignItems="center" justify="center" className="help">
            <div className="lds-dual-ring" ></div> {/*Loading Circle animation*/}
            <p style={{color:'crimson',fontSize:'2rem'}}>loading...</p>
              <div className="intro"><img src="https://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="red point" /><h3>signifies the start of the trip</h3></div>
              <div  className="intro"><img src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" alt="red point" /><h3>points sampled at once per second displaying the speed of the car</h3></div>
              <div  className="intro"><img src="https://maps.google.com/mapfiles/ms/icons/pink-dot.png" alt="red point" /><h3>signifies the end of the trip</h3></div>
              <h4>Click on any red mark,and click the simulation button to get started!</h4>
          </Grid>
          {/*Loading screen that gets automatically hidden when the map loads*/}
          {/* change  process.env.REACT_APP_GOOGLE_KEY to your own google key */}
          <React.Fragment>
            <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp6libraries=gemotery,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{height:'100%'}} />}
            containerElement={<div style={{height:'100%'}} />}
            mapElement={<div style={{height: '100%'}} />}
            coords = {this.props.coords}
            />
        </React.Fragment>
      </React.Fragment>
    )
  }
}

export default App
