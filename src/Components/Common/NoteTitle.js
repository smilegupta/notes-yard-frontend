const NoteTitle = ({ noteTitle, note }) => {
  return (
    <div className="card bg-light mb-3 note-card">
      <div className="card-header nameslip-ellipsis">{noteTitle}</div>
      <div className="card-body">
        <p className="card-text block-with-text">{note}</p>
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
  );
};

export default NoteTitle;
