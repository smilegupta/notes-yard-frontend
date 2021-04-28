import Modal from "react-modal";
import parse from "html-react-parser";

const ReadNote = ({ modalStatus, setModalStatus, note, noteTitle }) => {
  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={() => setModalStatus(false)}
      className="react-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ padding: "1.5rem" }}>
            <h5 className="modal-title">{noteTitle}</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalStatus(false)}
            >
              <span> &times; </span>
            </button>
          </div>
          <div className="modal-body" style={{ padding: "1.5rem" }}>
            <div className="text-break">{parse(note)}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReadNote;
