/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Register from "../../../Images/register2.svg";
import { Auth } from "aws-amplify";
import PasswordMask from "react-password-mask";
import { toast } from "react-toastify";
import _ from "lodash";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
toast.configure();

const Login = () => {
  // State Variables
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let [visited, setVisited] = useState({
    email: false,
    password: false,
  });
  let [errors, setErrors] = useState({});

  // Final Validation
  const finalValidate = () => {
    errors = {};

    if (username === undefined || username === "")
      errors.username = "Please enter your email";
    else if (
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        username
      )
    )
      errors.username = "Please enter a valid email address";

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))
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

    if ((username === undefined || username === "") && visited.username)
      errors.username = "Please enter your email";
    else if (
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        username
      )
    )
      errors.email = "Please enter a valid username address";

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) &&
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

  // Sign up Functionality
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!finalValidate()) return;
    setLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
      });
      let message =
        "Verification email successfully. Please verify your account by clicking that link before logging in.";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 0,
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
          <Image src={Register} alt="empty" className="w-75" />
        </Col>
      </Row>
      <h4>Sign Up</h4>
      <form>
        <div className="form-group">
          <label htmlFor="username">Email*</label>
          <input
            required
            type="username"
            className="form-control"
            name="username"
            id="username"
            value={username}
            placeholder="For Eg: rachelgreen@gmail.com"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            onBlur={handleVisited}
          />
          <span className="form-text text-danger">{errors.username || ""}</span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <Tippy
    					content="Your password must contain at least: 8 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 special character"
    					placement="top"
    					arrow={true}
    				>
    					<i
    						className="la la-info-circle"
    					></i>
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
            showButtonContent={<i className="la la-eye"></i>}
            hideButtonContent={<i className="la la-eye-slash"></i>}
          />
          <span className="form-text text-danger">{errors.password || ""}</span>
        </div>
      </form>
      <button
        type="button"
        onClick={(e) => submitHandler(e)}
        className="btn btn-primary"
        disabled={loading}
      >
        Sign Up {loading ? " " : ""}
        <span
          className={loading ? "spinner-border spinner-border-sm" : ""}
          role="status"
          aria-hidden="true"
        ></span>
      </button>

      <Row className="py-3">
        <Col>
          Already Have Account? <Link to={`/login`}> Login </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
