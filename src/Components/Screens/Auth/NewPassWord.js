/* eslint-disable no-useless-escape */
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import FormContainer from "./FormContainer";
import LoginImage from "../../../Images/login1.svg";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import PasswordMask from "react-password-mask";
import _ from "lodash";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
toast.configure();

const NewPassWord = ({ match }) => {
  // State Variables
  let history = useHistory();
  const email = match.params.email;
  const [password, setPassword] = useState("");
  const [verificationCode, setverificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  let [visited, setVisited] = useState({
    verificationCode: false,
    password: false,
  });
  let [errors, setErrors] = useState({});

  // Final Validation
  const finalValidate = () => {
    errors = {};

    if (verificationCode === undefined || verificationCode === "")
      errors.verificationCode = "Please enter your verification code";

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    )
    errors.password = "Please enter a valid password";
    
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

    if (
      (verificationCode === undefined || verificationCode === "") &&
      visited.verificationCode
    )
      errors.verificationCode = "Please enter your verification code";

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      ) &&
      visited.password
    )
      errors.password = "Please enter a valid password";

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

  // Reset Password Function
  const createPassword = async (e) => {
    e.preventDefault();
    if (!finalValidate()) return;
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, verificationCode.trim(), password);
      toast.success("Password created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      history.push(`/login`);
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
          <Image src={LoginImage} alt="empty" className="w-75" />
        </Col>
      </Row>
      <h4>Reset Password</h4>
      <div className="form-group">
        <label htmlFor="verificationCode">Vertification Code</label>
        <input
          required
          type="text"
          className="form-control"
          name="verificationCode"
          id="verificationCode"
          value={verificationCode}
          placeholder="For Eg: 1234"
          onChange={(e) => {
            setverificationCode(e.target.value);
          }}
          onBlur={handleVisited}
        />
        <span className="form-text text-danger">
          {errors.verificationCode || ""}
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>{" "}
        <Tippy
          content="Your password must contain at least: 8 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 special character"
          placement="top"
          arrow={true}
        >
          <i className="la la-info-circle" style={{ paddingLeft: "0" }}></i>
        </Tippy>
        <PasswordMask
          name="password"
          value={password}
          inputClassName="form-control"
          buttonClassName="password-show"
          placeholder="For Eg: ********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onBlur={handleVisited}
          showButtonContent={
            <i
              className="la la-eye"
              style={{ background: "transparent !important" }}
            ></i>
          }
          hideButtonContent={<i className="la la-eye-slash"></i>}
        />
        <span className="form-text text-danger">{errors.password || ""}</span>
      </div>
      <div className="row py-3">
        <div className="col-md-4 col-sm-12">
          <button
            type="button"
            className="btn btn-dark w-100"
            disabled={loading}
            onClick={(e) => createPassword(e)}
          >
            Reset{loading ? "  " : ""}
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
    </FormContainer>
  );
};

export default NewPassWord;
