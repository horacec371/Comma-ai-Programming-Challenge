import React, { Component } from 'react'

class Content extends Component{

  constructor(props){
    super(props)
    let pages = []
    for(let i=0;i<this.props.coords.length / 500;i++)
      pages.push(i)
    this.state = {
      start_time:this.props.start_time,
      current_page:0,
      page_length:this.props.coords.length / 500,
      pages:pages
    }
  }

  render(){
    return(
      <main>
          <h1 style={{color:'#555'}}>{this.state.start_time} Archive</h1>
          <h2 style={{color:'#555'}}>Pages</h2>
          <ul style={{display:'flex'}}>
            <li   onClick={() => {   this.state.current_page === 0 ? this.setState({ current_page: Math.floor(this.state.page_length)})  : this.setState({current_page:this.state.current_page-1}) }} ><img src="./icons/left.svg" alt="right" width="20" style={{cursor:'pointer'}}/></li>
            {this.state.pages.map(number =>this.state.current_page === number ? <li style={{marginRight:'0.2em',color:'blue',cursor:'pointer',textDecoration:'underline'}} onClick={() => {this.setState({current_page:number})}}> { number }</li> : <li style={{marginRight:'0.2em',cursor:'pointer'}} onClick={() => {this.setState({current_page:number})}}> { number }</li>)}
            <li   onClick={() => {this.state.current_page - Math.floor(this.state.page_length) === 0 ? this.setState({ current_page: 0})  : this.setState({current_page:this.state.current_page+1}) }} ><img src="./icons/right.svg" alt="right" width="20" style={{cursor:'pointer'}} /></li>
          </ul>
        <div class="table-wrapper" style={{maxHeight:'500px',overflow:'auto'}}>
          <table id="paginatedTable">
          <thead>
            <tr>
              <th>Index</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Speed(m/s)</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
          {this.props.coords.map((trip,index) => index >= this.state.current_page * 500 && index<= this.state.current_page * 500 + 500? <tr >
              <td> {index} </td>
              <td> {trip.lat} </td>
              <td> {trip.lng} </td>
              <td > {trip.speed} </td>
              <td > {trip.dist} </td>
              </tr> : null)}
          </tbody>
        </table>
        </div>
      </main>
    )
  }
}

export default Content
