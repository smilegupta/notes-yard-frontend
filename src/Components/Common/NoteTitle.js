import { Fragment, useState } from "react";
import ReadNote from "../Modals/ReadNote"
import { removeHTMLTags } from "../../helper";

const NoteTitle = ({ noteTitle, note }) => {
  const [viewNoteModal, setViewNoteModal] = useState(false);
  const [viewableModalTitle, setViewableModalTitle] = useState("");
  const [viewableModalDesc, setViewableModalDesc] = useState("");

  // Viewing Notes
  const viewNotes = (title, content) => {
    setViewNoteModal(true);
    setViewableModalTitle(title);
    setViewableModalDesc(content);
  };

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
              onClick={() => viewNotes(noteTitle, note )}
            />
            <i
              className="las la-cog text-info cursor-pointer ml-1"
              style={{ fontSize: "20px" }}
            />
            <i
              className="las la-trash text-danger cursor-pointer ml-1"
              style={{ fontSize: "20px" }}
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
