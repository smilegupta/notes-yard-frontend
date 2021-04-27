import { Fragment, useState } from "react";
import ReadNote from "../Modals/ReadNote"
import { removeHTMLTags } from "../../helper";
import { deleteNote, getNotes } from "../../CRUD/note.crud"
import { toast } from "react-toastify";
toast.configure();

const NoteTitle = ({ noteTitle, note , noteId , notebookId, userId, setApiResponse}) => {
  const [viewNoteModal, setViewNoteModal] = useState(false);
  const [viewableModalTitle, setViewableModalTitle] = useState("");
  const [viewableModalDesc, setViewableModalDesc] = useState("");

  // Viewing Notes
  const viewNotes = (title, content) => {
    setViewNoteModal(true);
    setViewableModalTitle(title);
    setViewableModalDesc(content);
  };
  
  const deleteNoteFun = async (NotebookId,NoteId ) => {
    console.log(NotebookId)
    console.log(NoteId)
    console.log(userId)

    if (window.confirm("Are you sure you want to delete this notebook?")) {
      try {
        await deleteNote(NotebookId, userId, NoteId);
        const updatedList =  await getNotes(NotebookId)
        setApiResponse(updatedList.data)
        const message = "Your Note Have Been Deleted";
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
  
  }
  return (
    <Fragment>
      <div className="card bg-light mb-3 note-card">
        <div className="card-header nameslip-ellipsis">{noteTitle}</div>
        <div className="card-body">
          <span className="card-text block-with-text">
            {" "}
            {removeHTMLTags(`${note}`)}{" "}
          </span>
        </div>
        <div
          className="card-footer text-right"
          style={{ borderTop: "0", background: "transparent" }}
        >
          <span className="w-100">
            <i
              className="las la-glasses text-success cursor-pointer ml-1 "
              style={{ fontSize: "20px" }}
              onClick={() => viewNotes(noteTitle, note)}
            />
            <i
              className="las la-cog text-info cursor-pointer ml-1"
              style={{ fontSize: "20px" }}
            />
            <i
              className="las la-trash text-danger cursor-pointer ml-1"
              style={{ fontSize: "20px" }}
              onClick={() => deleteNoteFun(notebookId, noteId)}
            />
          </span>
        </div>
      </div>
      <ReadNote
        setModalStatus={setViewNoteModal}
        modalStatus={viewNoteModal}
        note={viewableModalDesc}
        noteTitle={viewableModalTitle}
      />
    </Fragment>
  );
};

export default NoteTitle;
