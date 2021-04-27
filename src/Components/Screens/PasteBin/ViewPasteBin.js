/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import { getPasteBin } from "../../../CRUD/pastebin.crud";
import DOMPurify from "dompurify";
import { withRouter, useHistory } from "react-router-dom";
import Loading from "../../Common/Loader";

const ViewPasteBin = ({ match }) => {
  // State Variables
  let history = useHistory();
  const pasteBinId = match.params.pasteBinId;
  const [pasteContent, setpasteContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPasteBinResponse();
  }, []);

  // API to get pastebin
  const getPasteBinResponse = async () => {
    const res = await getPasteBin(pasteBinId);
    if (res.data === "") {
      history.push("/page/error");
    }
    setpasteContent(res.data.details);
    setLoading(false);
  };

  return (
    <Fragment>
      {loading === true ? (
        <Loading />
      ) : (
        <Fragment>
          {" "}
          {pasteContent && (
            <Fragment>
              <div className="alert alert-dark text-center" style={{borderRadius: "0px"}} role="alert">
                This paste is brought to you by{" "}
                <a href="https://notes-yard.smilegupta.tech/" target="_blank" rel="noreferrer">
                  {" "}
                  <span className="cursor-pointer text-info">
                    {" "}
                    Notes Yard{" "}
                  </span>{" "}
                </a>
              </div>
              <p
                className="m-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    pasteContent.replace(/\n/g, "<br />")
                  ),
                }}
              />
            </Fragment>
          )}{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default withRouter(ViewPasteBin);
