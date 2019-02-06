import React, { Component } from 'react'
import api from '../../api';

export default class Treep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treepName: "",
      treepLocation: "",
      treepStartDate: "",
      treepEndDate: "",
      treepFormattedDates: ""
    }
  }
  componentDidMount() {
    api.getOneTreep(this.props.match.params.id)
    .then(res => {
      this.setState({
        treepLocation: res.treepLocation,
        treepStartDate: res.treepStartDate,
        treepEndDate: res.treepEndDate,
        treepFormattedDates:res.treepFormattedDates
      })
    })
  }
  render() {
    return (
      <div>
        <h4>{this.state.treepLocation}</h4>
        <p>{this.state.treepFormattedDates}</p>
      </div>
    )
  }
}
