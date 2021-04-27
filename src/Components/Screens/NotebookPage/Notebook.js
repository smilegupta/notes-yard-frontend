/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteNotebook } from "../../../CRUD/notebook.crud";
import EditNotebook from "../../Modals/EditNotebook";
import CreateNote from "../../Modals/CreateNote";
import { getNotes } from "../../../CRUD/note.crud";
import "../../../../node_modules/react-quill/dist/quill.snow.css";
import NoteTitle from "../../Common/NoteTitle";

toast.configure();

const Notebook = ({ match, auth }) => {
  // State Variables
  let history = useHistory();
  const [notebookName, setInitialNotebookName] = useState(match.params.name);
  const notebookId = match.params.id;
  const userId = auth.user.attributes.sub;
  const [modalStatus, setModalStatus] = useState(false);
  const [createNoteModal, setCreateNoteModal] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    listNotes();
  }, []);

  //API to get all Notes
  const listNotes = async () => {
    const res = await getNotes(notebookId);
    setApiResponse(res.data);
  };

  // Function to delete Notebook
  const deleteNotebookFun = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this notebook?")) {
      try {
        await deleteNotebook(notebookId, userId);
        history.push("/home");
        const message = "Your notebook have been deleted";
        toast.success(message, {
          position: "top-right",
          autoClose: 0,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
      }
    }
  };

  // Triggering Edit Modal
  const editNotebookFun = async (e) => {
    e.preventDefault();
    setModalStatus(true);
  };

  return (
    <Container className="my-3">
      <Row className="mb-3">
        <Col className="text-right">
          <Link to="/home">
            <i className="las la-arrow-left" /> Go Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col
          sm={12}
          lg={12}
          xl={12}
          md={12}
          className="no-gutters text-md-left text-center"
        >
          <h3>
            {notebookName} &nbsp;
            <i
              className="las la-plus cursor-pointer text-success"
              onClick={() => setCreateNoteModal(true)}
            />{" "}
            <i
              className="las la-cog text-info cursor-pointer"
              onClick={(e) => editNotebookFun(e)}
            />
            <i
              className="las la-trash text-danger cursor-pointer"
              onClick={(e) => deleteNotebookFun(e)}
            />{" "}
          </h3>
          <br />
        </Col>
      </Row>
      <Row>
        {apiResponse &&
          apiResponse.length > 0 &&
          apiResponse.map((note, idx) => (
            <Col
              sm={12}
              lg={4}
              xl={4}
              md={4}
              xs={12}
              className="mx-md-0 mx-auto"
              key={idx}
            >
              <NoteTitle
                noteTitle={note.noteTitle}
                note={note.note}
                noteId={note.noteId}
                notebookId={note.notebookId}
                userId={userId}
                setApiResponse={setApiResponse}
              />
            </Col>
          ))}

        <Col
          sm={12}
          lg={4}
          xl={4}
          md={4}
          xs={12}
          onClick={() => setCreateNoteModal(true)}
          className="cursor-pointer"
        >
          <div className="card bg-light mb-3 note-card d-flex align-items-center justify-content-center">
            <i
              className="las la-plus-circle cursor-pointer"
              style={{ fontSize: "22px" }}
            />
            Create Note
          </div>
        </Col>
      </Row>
      <CreateNote
        setModalStatus={setCreateNoteModal}
        modalStatus={createNoteModal}
        notebookId={notebookId}
        userId={userId}
        setApiResponse={setApiResponse}
      />
      <EditNotebook
        setModalStatus={setModalStatus}
        modalStatus={modalStatus}
        userId={userId}
        notebookId={notebookId}
        name={notebookName}
        setInitialNotebookName={setInitialNotebookName}
      />
    </Container>
  );
};

export default withRouter(Notebook);
