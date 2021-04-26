/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
// import { notebooks } from "../../../helper";
import NotebookCard from "../../Common/NotebookCard";
import CreateNotebook from "../../Modals/CreateNotebook";
import { getNotebook } from "../../../CRUD/notebook.crud";
import Loader from "../../Common/Loader";

const HomeScreen = ({ auth }) => {
  // State Variables
  const userId = auth.user.attributes.sub;
  const [modalStatus, setModalStatus] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotebooksResponse();
  }, []);

  // API to get list of notebooks
  const getNotebooksResponse = async () => {
    const res = await getNotebook(userId);
    console.log(res.data);
    setApiResponse(res.data);
    setLoading(false);
  };

  return (
    <Container className="my-3">
      <Row className="mb-3">
        <Col className="text-right">
          <Link to="/">
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
            My Notebooks{" "}
            <i
              className="las la-plus cursor-pointer"
              onClick={() => setModalStatus(true)}
            />
          </h3>
          <br />
        </Col>
      </Row>
      {loading === true ? (
        <Loader />
      ) : (
        <Row>
          {apiResponse &&
            apiResponse.length > 0 &&
            apiResponse.map((notebook, idx) => (
              <Col
                sm={6}
                lg={3}
                xl={3}
                md={4}
                xs={8}
                className="mx-md-0 mx-auto"
              >
                <Link to={`/notebook/${notebook.notebookId}`}>
                  <NotebookCard
                    name={notebook.notebookName}
                    notesCount={notebook.notesCount}
                    pattern={notebook.pattern}
                  />
                </Link>
              </Col>
            ))}
          <Col
            sm={6}
            lg={3}
            xl={3}
            md={4}
            xs={8}
            className="no-gutters mx-md-0 mx-auto"
            onClick={() => setModalStatus(true)}
          >
            <div className="card notebook-card shadow mb-4 notebook-empty d-flex align-items-center justify-content-center">
              <i
                className="las la-plus-circle cursor-pointer"
                style={{ fontSize: "22px" }}
              />
              Create Notebook
            </div>
          </Col>
        </Row>
      )}

      <CreateNotebook
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        userId={userId}
        setApiResponse={setApiResponse}
      />
    </Container>
  );
};

export default withRouter(HomeScreen);
