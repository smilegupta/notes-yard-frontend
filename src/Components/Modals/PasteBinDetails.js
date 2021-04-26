import Modal from "react-modal";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Row, Col } from "react-bootstrap";
toast.configure();
Modal.setAppElement("*");

const PasteBinDetailsModal = ({
  modalStatus,
  setModalStatus,
  pasteBinContent,
  pasteBinId,
}) => {
  // Constants
  const embededLink = `https://notes-yard.smilegupta.tech/pastebin/view/${pasteBinId}`;
  const iFrameCode = `<iframe width="560" height="315" src=${embededLink}></iframe>`;

  // Function to Download Paste Bin Content
  const pasteBinDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([pasteBinContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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

  return (
    <Modal
      isOpen={modalStatus}
      className="react-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ padding: "1.5rem" }}>
            <h5 className="modal-title">Paste Bin Details</h5>
            <button
              type="button"
              className="close"
              onClick={() => setModalStatus(false)}
            >
              <span> &times; </span>
            </button>
          </div>
          <div className="modal-body" style={{ padding: "1.5rem" }}>
            <div className="form-group">
              <label htmlFor="embededLink">
                {" "}
                Sharable URL &nbsp;
                <CopyToClipboard text={embededLink} onCopy={onCopyText}>
                  <i className="las la-copy cursor-pointer"></i>
                </CopyToClipboard>
              </label>
              <Row>
                <Col sm={12} lg={9} xl={9} md={9} xs={12}>
                  <textarea
                    className="form-control"
                    id="embededLink"
                    rows="3"
                    readOnly
                    value={embededLink}
                  />
                </Col>
                <Col
                  sm={12}
                  lg={3}
                  xl={3}
                  md={3}
                  xs={12}
                  className="pt-md-0 pt-2"
                >
                  <QRCode value={embededLink} size={88} />
                </Col>
              </Row>
            </div>
            <div className="form-group">
              <label htmlFor="embededLink">
                {" "}
                Embedded Code &nbsp;
                <CopyToClipboard text={iFrameCode} onCopy={onCopyText}>
                  <i className="las la-copy cursor-pointer"></i>
                </CopyToClipboard>
              </label>
              <textarea
                className="form-control"
                id="embededLink"
                rows="4"
                readOnly
                value={iFrameCode}
              />
            </div>
            <label>
              {" "}
              Click{" "}
              <span
                className="text-info cursor-pointer"
                onClick={() => pasteBinDownload()}
              >
                {" "}
                Here{" "}
              </span>{" "}
              To Download Your Paste{" "}
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PasteBinDetailsModal;