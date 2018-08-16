import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Modal } from '../Modal';

export class FilterDeleteModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    filterLabel: PropTypes.string,
  };

  render() {
    const { filterLabel, onClose, onConfirm } = this.props;

    return (
      <Modal onClose={onClose} className="FilterEditModal">
        <Modal.Header>
          <div className="FilterDeleteModal__Title">Delete Filter</div>
        </Modal.Header>
        <Modal.Body>
            Are you sure to delete {filterLabel}?
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={onClose} type="default">
            Cancel
          </Button>
          <Button onClick={onConfirm} type="alert">
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
