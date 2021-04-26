import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteNotebook } from "../../../CRUD/notebook.crud";
import EditNotebook from "../../Modals/EditNotebook";
import ReactQuill from "react-quill";
import "../../../../node_modules/react-quill/dist/quill.snow.css";
toast.configure();

const Notebook = ({ match, auth }) => {
  // State Variables
  let history = useHistory();
  const [notebookName, setInitialNotebookName] = useState(match.params.name);
  const notebookId = match.params.id;
  const userId = auth.user.attributes.sub;
  const [modalStatus, setModalStatus] = useState(false);

  // Function to delete Notebook
  const deleteNotebookFun = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this notebook?")) {
      try {
        await deleteNotebook(notebookId, userId);
        history.push("/home");
        const message = "Your Notebook Have Been Deleted";
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
            <i className="las la-plus cursor-pointer text-success" />{" "}
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
          <ReactQuill />
        </Col>
      </Row>
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
