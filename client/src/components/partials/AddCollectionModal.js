import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default class AddCollectionModal extends Component {
  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.isOpen}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <button onClick={this.props.closeModal}>Close</button>
        </ReactModal>
      </div>
    )
  }
}
