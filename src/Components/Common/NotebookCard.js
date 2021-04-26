import { randomPatterns } from "../../helper";
import { toast } from "react-toastify";
toast.configure();

const NotebookCard = ({ name, notesCount, pattern }) => {
  return (
    <div
      className="card notebook-card notebook-shadow mb-4"
      style={{
        backgroundImage: `url(${randomPatterns[pattern]})`,
      }}
    >
      <div className="notebook-cover">
        <div className="notebook-nameslip p-2 nameslip-border">
          <h4 className="nameslip-ellipsis"> {name} </h4>
          <h6>
            {" "}
            {notesCount} {notesCount > 1 ? "Notes" : "Note"}
          </h6>
          <h6> </h6>
        </div>
        <div className="notebook-bookmark">...</div>
      </div>
    </div>
  );
};

export default NotebookCard;
