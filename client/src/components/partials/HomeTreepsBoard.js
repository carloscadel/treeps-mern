import React, { Component } from 'react'
import TreepCard from './TreepCard'

export default class HomeTreepsBoard extends Component {
  render() {
    return (
      <div>
        <div className='trip-cards-slider'>
          {this.props.treeps.map(treep => (
            <a
              key={treep._id}
              href={`/${this.props.user.username}/treeps/${treep._id}`}>
              <TreepCard treep={treep} />
            </a>
          ))}
        </div>
      </div>
    )
  }
}
