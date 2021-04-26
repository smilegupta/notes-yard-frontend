/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteNotebook } from "../../../CRUD/notebook.crud";
import EditNotebook from "../../Modals/EditNotebook";
import { getNotes } from "../../../CRUD/note.crud";
import "../../../../node_modules/react-quill/dist/quill.snow.css";

toast.configure();

const Notebook = ({ match, auth }) => {
  // State Variables
  let history = useHistory();
  const [notebookName, setInitialNotebookName] = useState(match.params.name);
  const notebookId = match.params.id;
  const userId = auth.user.attributes.sub;
  const [modalStatus, setModalStatus] = useState(false);

  // useEffect(() => {
  //   getPasteBinResponse();
  // }, []);

  // API to get pastebin
  // const getPasteBinResponse = async () => {
  //   const res = await getNotes(notebookId);
  //   console.log(res.data)
  // };

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
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={4} xl={4} md={4} xs={12}>
          <div className="card bg-light mb-3 note-card">
            <div className="card-header nameslip-ellipsis"> Header </div>
            <div className="card-body">
              <p className="card-text block-with-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content. Some quick example text to build
                on the card title and make up the bulk of the card's content.
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p className="text-right">
                <i
                  className="las la-glasses text-success cursor-pointer ml-1 "
                  style={{ fontSize: "20px" }}
                />
                <i
                  className="las la-cog text-info cursor-pointer ml-1"
                  style={{ fontSize: "20px" }}
                />
                <i
                  className="las la-trash text-danger cursor-pointer ml-1"
                  style={{ fontSize: "20px" }}
                />
              </p>
            </div>
          </div>
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
