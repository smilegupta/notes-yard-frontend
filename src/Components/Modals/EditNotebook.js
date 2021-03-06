/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { editNotebook } from "../../CRUD/notebook.crud";
toast.configure();
Modal.setAppElement("*");

const EditNotebook = ({
  modalStatus,
  setModalStatus,
  userId,
  notebookId,
  name,
  setInitialNotebookName,
}) => {
  // State Variables
  const [notebookName, setNotebookName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalStatus) {
      setNotebookName(name);
    } else {
      setNotebookName("");
    }
  }, [modalStatus]);

  // Validating that Notebook Title
  const validateFields = () => {
    setError("");
    if (notebookName === null || notebookName === "") {
      setError("Please enter a notebook name");
      return false;
    }
    return true;
  };

  // Close Modal Function
  const closeModal = () => {
    setError("");
    setNotebookName("");
    setModalStatus(false);
  };

  // Editing Notebook API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    try {
      await editNotebook(userId, notebookName, notebookId);
      setInitialNotebookName(notebookName);
      const message = "Bingo! You have edited Notebook Details Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setModalStatus(false);
      setNotebookName("");
      setLoading(false);
    } catch (err) {
      let error = err.message || "Something went wrong!";
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={() => closeModal()}
      className="react-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ padding: "1.5rem" }}>
            <h5 className="modal-title">Edit Notebook</h5>
            <button
              type="button"
              className="close"
              onClick={() => closeModal()}
            >
              <span> &times; </span>
            </button>
          </div>
          <div className="modal-body" style={{ padding: "1.5rem" }}>
            <form>
              <div className="form-group">
                <label htmlFor="notebookName">Notebook Name*</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="notebookName"
                  id="notebookName"
                  value={notebookName}
                  placeholder="For Eg: Notebook1"
                  onChange={(e) => {
                    e.preventDefault();
                    setNotebookName(e.target.value);
                  }}
                  onBlur={validateFields}
                />
                <div className="text-danger">{error || ""}</div>
              </div>
            </form>
          </div>
          <div className="modal-footer" style={{ padding: "1.5rem" }}>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="btn btn-primary"
              disabled={loading}
            >
              Edit Notebook {loading ? "  " : ""}
              <span
                className={loading ? "spinner-border spinner-border-sm" : ""}
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditNotebook;
