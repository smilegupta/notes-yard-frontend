import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createPasteBin } from "../../../CRUD/pastebin.crud";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
toast.configure();

const Pastebin = () => {
  // State Variables
  const [pastebin, setPastebin] = useState("");
  const [pastebinId, setPasteBinId] = useState("");

  // API Call to Make Pastebin
  const savepasteBin = async () => {
    try {
      const res = await createPasteBin(pastebin);
      setPasteBinId(res.data.pasteBinId);
      const message = "Bingo! Your Paste Bin is Created";
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
  };

  // Function triggered after text is copied
  const onCopyText = () => {
    const message = "Link Copied Successfully";
    toast.success(message, {
      position: "top-right",
      autoClose: 0,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to reset changes
  const resetChanges = (e) => {
    e.preventDefault();
    setPasteBinId("");
    setPastebin("");
  };

  const pasteBinDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('myPasteBin').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

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
        <Col sm={12} lg={12} xl={12} md={12} xs={12} className="no-gutters">
          <h4>
            Create a new paste{" "}
            <i
              className="las la-sync-alt cursor-pointer"
              onClick={(e) => resetChanges(e)}
            />{" "}
            <i
              className="lar la-save cursor-pointer"
              onClick={(e) => savepasteBin()}
            />{" "}
            <i className="las la-download cursor-pointer" onClick={(e) => pasteBinDownload()}/>
          </h4>
          {pastebinId && (
            <h6 className="text-muted">
              {" "}
              Paste Bin URL: https://notes-yard.smilegupta.tech/pastebin/view/
              {pastebinId}{" "}
              <CopyToClipboard
                text={`https://notes-yard.smilegupta.tech/pastebin/view/${pastebinId}`}
                onCopy={onCopyText}
              >
                <i className="las la-copy cursor-pointer"></i>
              </CopyToClipboard>{" "}
            </h6>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={12} xl={12} md={12} xs={12}>
          <textarea
            style={{ borderRadius: "0px", minHeight: "70vh" }}
            className="form-control w-100 h-100 p-4"
            value={pastebin}
            onChange={(e) => setPastebin(e.target.value)}
            id='myPasteBin'
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Pastebin;
