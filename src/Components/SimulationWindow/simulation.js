import React, { Component }  from 'react'
import Modal2 from './TripLogs/LogsContainer'

class SimulationSettings extends Component{
  constructor(){
    super()
    this.state = {
      current:'km/h'
    }

  }


  //Adds the blue markers sampled at once per second
  ExtraMarkers(){
    let markers = []
    for(let i=1;i<this.props.coords.length;i++){
        let marker
        if(this.props.coords.length - i === 1) //if the marker is the final one
           marker = this.props.addMarker(this.props.coords[i],i,'pink',(index) => this.props.onMarkClick(index))
        else
           marker = this.props.addMarker(this.props.coords[i],i,'blue',(index) => this.props.onMarkClick(index))
        markers.push(marker)
      }
      this.props.ExtraMarkersadd(markers) //callback function updating the markers array in the polyline component
  }


  onStopSimulationClick(){
    window.clearInterval(this.props.interval)
    this.props.removeCarAnimation(null)
    this.props.zIndexTrigger(0)
    this.props.isOpenTrigger(false)
    this.props.DeleteMarkers(this.props.markers.filter((marker,index) => index === 0))
  }

  dateExtract(date,condition){
    let arr = date.split('')
    if(condition === 'date')
      arr = arr.filter(this.date).join('')
    else
      arr = arr.filter(this.time).join('')
    return arr
  }

  time(value,index){
    return index > 10
  }

  date(value,index){
    return index < 9
  }

  render(){
    let opposite = this.state.current === 'km/h' ? 'm/s' : 'km/h'
    let section = this.props.selectedMark === 0 ? null : 'hidden'
    return(
      <div>
          <img src="https://pbs.twimg.com/profile_images/1142533326302957568/iwZRdQ_U_400x400.png" alt="comma.ai icon" width="50" />
          <section >
            <div >
              {this.props.selectedMark === 0 ? <h2>{`Date: ${this.dateExtract(this.props.start_time,'date')} `}</h2> : (this.props.selectedMark === this.props.markers.length-1 ? <h2>{`Date: ${this.dateExtract(this.props.end_time,'date')}`}</h2> : null)}
              {this.props.selectedMark === 0 ? <h2>{`Time_start: ${this.dateExtract(this.props.start_time,'time')} `}</h2> : (this.props.selectedMark === this.props.markers.length-1 ? <h2>{`Time_end: ${this.dateExtract(this.props.end_time,'time')}`}</h2> : null)}
              <h2>{`lat: ${this.props.markers[this.props.selectedMark].props.position.lat}`}</h2>
              <h2>{`lng: ${this.props.markers[this.props.selectedMark].props.position.lng}`}</h2>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <h2 style={{marginBottom:0,marginTop:0,marginRight:'0.2em'}}>{`current speed: ${parseFloat(this.props.markers[this.props.selectedMark].props.position.speed) * (this.state.current === 'km/h' ? 3.6 : 1) } (${this.state.current})`}</h2>
                <button onClick={() => { this.setState({ current:opposite  })} }>{ opposite }</button>
              </div>
              <h2>{`distance: ${this.props.markers[this.props.selectedMark].props.position.dist}`}</h2>
              <div style={{display:'flex',justifyContent:'center'}}>
                {this.props.markers.length === 1 ?
                  <button onClick={() => this.ExtraMarkers()}>Start Simulation</button> :
                  <button onClick={() => this.onStopSimulationClick()}>Stop Simulation</button>
                }
                 <Modal2 coords={this.props.coords} start_time={this.props.start_time}/>
               </div>
             </div>

            </section>
      </div>
    )
  }
}



export default SimulationSettings
