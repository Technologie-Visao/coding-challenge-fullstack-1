import './Modal.css';

function Modal(props: any) {
  const handleCloseModal = () => {
    props.closeModal(false);
  };

  return (
    <div className="autocomplete-modal-overlay">
      <div className="autocomplete-modal-content">
        <h1 className="autocomplete-modal-title">{props.suggestion.name}</h1>
        <div className="autocomplete-modal-thumbnail-information">
          <img
            className="autocomplete-modal-thumbnail"
            src={props.suggestion.thumbnail_url}
            alt={props.suggestion.name}
          />
          <div className="autocomplete-modal-information">
            <p>{props.suggestion.description}</p>
          </div>
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
