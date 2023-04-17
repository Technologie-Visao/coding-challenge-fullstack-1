import './Modal.css';

function Modal(props: any) {
  const handleCloseModal = () => {
    props.closeModal(false);
  };

  return (
    <div className="autocomplete-modal-overlay">
      <div className="autocomplete-modal-content">
        <h3>{props.suggestion.name}</h3>
        <img
          className="autocomplete-modal-thumbnail"
          src={props.suggestion.thumbnail_url}
          alt={props.suggestion.name}
        />
        <div className="autocomplete-modal-information">
          <p>{props.suggestion.description}</p>
        </div>
        <button
          className="autocomplete-modal-button"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;