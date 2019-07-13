import React, { Component } from 'react'

export default class HomeTreepsBoard extends Component {
  render() {
    return (
      <div>
        <div className='trip-cards-slider'>
          {this.state.treeps.map(treep => (
            <a
              key={treep._id}
              href={'/' + this.state.username + '/treeps/' + treep._id}>
              <TreepCard
                location={treep.location}
                startDate={treep.startDate}
                endDate={treep.endDate}
                formattedDates={treep.formattedDates}
              />
            </a>
          ))}
        </div>
      </div>
    )
  }
}
