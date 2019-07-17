import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default class AddCollectionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collectionName: ''
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state.collectionName)
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.isOpen}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <button onClick={this.props.closeModal}>Close</button>
          <form onSubmit={this.handleSubmit}>
            <input
              name='collectionName'
              type='text'
              placeholder='Name your collection'
              onChange={e => {
                this.handleInput(e)
              }}
            />
            <button type='submit'>Add collection</button>
          </form>
        </ReactModal>
      </div>
    )
  }
}
