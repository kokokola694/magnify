import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreatePlaylist from './create_playlist';
import AddToPlaylist from './add_to_playlist';
// import RemoveFromPlaylist from './remove_from_playlist';
import DeletePlaylist from './delete_playlist';


function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'createPlaylist':
      component = <CreatePlaylist />;
      break;
    case 'deletePlaylist':
      component = <DeletePlaylist />;
      break;
    case 'addToPlaylist':
      component = <AddToPlaylist />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background">
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
