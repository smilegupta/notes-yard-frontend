
import Modal from "react-modal";
import { toast } from "react-toastify";
toast.configure();
Modal.setAppElement("*");

const CreateNotebook = ({modalStatus, setModalStatus}) => {
    // const embededLink = `https://notes-yard.smilegupta.tech/pastebin/view/${pasteBinId}`;
    // const iFrameCode = `<iframe width="560" height="315" src=${embededLink}></iframe>`;
    

    // const pasteBinDownload = () => {
    //     const element = document.createElement("a");
    //     const file = new Blob([pasteBinContent], {type: 'text/plain'});
    //     element.href = URL.createObjectURL(file);
    //     element.download = "myFile.txt";
    //     document.body.appendChild(element); // Required for this to work in FireFox
    //     element.click();
    //   }

  return (
    <Modal
      isOpen={modalStatus}
      onRequestClose={() => setModalStatus(false)}
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
            <h5> URL: </h5>
            <h5> Embed: </h5>
            <h5> Download Paste </h5>
          </div>
          
        </div>
      </div>
    </Modal>
  );
};

export default CreateNotebook;