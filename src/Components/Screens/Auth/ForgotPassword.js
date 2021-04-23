/* eslint-disable no-useless-escape */
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import FormContainer from "./FormContainer";
import LoginImage from "../../../Images/login.svg";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import _ from "lodash";

const ForgotPassword = ({ match }) => {
  // State Variables
  let history = useHistory();
  const [email, setEmail] = useState(match.params.email);
  const [loading, setLoading] = useState(false);
  let [visited, setVisited] = useState({
    email: false,
  });
  let [errors, setErrors] = useState({});

  // Final Validation
  const finalValidate = () => {
    errors = {};

    if (email === undefined || email === "")
      errors.email = "Please enter your email";
    else if (
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
    )
      errors.email = "Please enter a valid email address";

    setErrors(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Initial Validation
  const doValidate = () => {
    errors = {};

    if ((email === undefined || email === "") && visited.email)
      errors.email = "Please enter your email";
    else if (
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
    )
      errors.email = "Please enter a valid email address";

    setErrors(errors);

    if (Object.entries(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle Visited Fields
  const handleVisited = (e) => {
    let { name } = e.target || e;
    _.set(visited, name, true);
    setVisited({ ...visited });
    doValidate();
  };

  // Sending Code for Password Reset
  const sendCode = async (e) => {
    e.preventDefault();
    if (!finalValidate()) return;
    setLoading(true);
    try {
      await Auth.forgotPassword(email);
      toast.success("Sent a verification code to your email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      history.push(`/new-password/${email}`);
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
      setLoading(false);
    }
  };
  return (
    <FormContainer>
      <Row>
        <Col className="text-center my-4">
          <Image src={LoginImage} alt="empty" className="w-50" />
        </Col>
      </Row>
      <h4>Reset Password</h4>
      <p>Enter the email address associated with your account</p>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          required
          type="email"
          className="form-control"
          name="email"
          id="email"
          value={email}
          placeholder="For Eg: rachelgreen@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onBlur={handleVisited}
        />
        <span className="form-text text-danger">{errors.email || ""}</span>
      </div>
      <div className="row py-3">
        <div className="col-md-4 col-sm-12">
          <button
            type="button"
            className="btn btn-dark w-100"
            disabled={loading}
            onClick={(e) => sendCode(e)}
          >
            Send code{loading ? "  " : ""}
            <span
              className={loading ? "spinner-border spinner-border-sm" : ""}
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        </div>
        <div className="col-md-8 col-sm-12 py-md-0 py-3 text-center d-md-flex align-items-center justify-content-end text-muted">
          Try signing in again?&nbsp;
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
      <div className="alert alert-dark text-center my-4" role="alert">
        We will send a verification code to your email, to create a new
        password.
      </div>
    </FormContainer>
  );
};

export default ForgotPassword;
