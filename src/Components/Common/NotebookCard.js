import { Fragment } from "react";
import { randomPatterns } from "../../helper";
import { toast } from "react-toastify";
import { deleteNotebook, getNotebook } from "../../CRUD/notebook.crud";
// import EditNotebook from "../Modals/EditNotebook";

toast.configure();

const NotebookCard = ({
  name,
  notesCount,
  pattern,
  userId,
  notebookId,
  setApiResponse,
}) => {
  // State Variables
  // const [modalStatus, setModalStatus] = useState(false);
  // Function to delete Notebook
  const deleteNotebookFun = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this notebook?")) {
      try {
        await deleteNotebook(notebookId, userId);
        const updatedList = await getNotebook(userId);
        setApiResponse(updatedList.data);
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

  // const editNotebookFun = async (e) => {
  //   e.preventDefault();
  //   setModalStatus(true);
  // };

  return (
    <Fragment>
    <div
      className="card notebook-card notebook-shadow mb-4"
      style={{
        backgroundImage: `url(${randomPatterns[pattern]})`,
      }}
    >
      <div className="notebook-cover">
        <div className="notebook-nameslip p-2 nameslip-border">
          <h4> {name} </h4>
          <h6>
            {" "}
            {notesCount} {notesCount > 1 ? "Notes" : "Note"}
          </h6>
          <h6>
            {" "}
            {/* <i
              className="las la-cog text-info cursor-pointer"
              onClick={(e) => editNotebookFun(e)}
            />{" "}
            &nbsp;{" "} */}
            <i
              className="las la-trash text-danger cursor-pointer"
              onClick={(e) => deleteNotebookFun(e)}
            />
          </h6>
        </div>
        <div className="notebook-bookmark">...</div>
      </div>
    </div>
    {/* <EditNotebook
    setApiResponse={setApiResponse}
    setModalStatus={setModalStatus}
    modalStatus={modalStatus}
    userId={userId}
    notebookId={notebookId}
    name={name}
  /> */}
  </Fragment>
  );
};

export default NotebookCard;
