/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import FormContainer from "./FormContainer";
import LoginImage from "../../../Images/signIn.svg";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import PasswordMask from "react-password-mask";
import _ from "lodash";

toast.configure();

const Login = ({ auth }) => {
  // State Variables
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState(false);
  let [visited, setVisited] = useState({
    email: false,
    password: false,
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

    if ((email === undefined || email === "") && visited.email)
      errors.email = "Please enter your email";
    else if (
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
    )
      errors.email = "Please enter a valid email address";

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

  // Login Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalValidate()) return;
    setLoading(true);
    try {
      const res = await Auth.signIn(email, password);
      let message = "Signed in successfully! Welcome back!!";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
      auth.setAuthenticated(true);
      auth.setUser(res);
      history.push(`/home`);
    } catch (err) {
      let error = err.message;
      if (err.message === "User is not confirmed.") {
        error =
          "Your account verification not complete. Please complete the verification before logging in.";
      }
      toast.error(error, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if (err.message === "User is not confirmed.") setResendEmail(true);
      setLoading(false);
    }
  };

  // Resend Confirmation Link
  const resendConfirmationLink = async (e) => {
    e.preventDefault();
    try {
      await Auth.resendSignUp(email);
      toast.success(
        "Verification email resent successfully. Please verify your account by clicking that link before logging in.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setResendEmail(false);
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
  };

  return (
    <FormContainer>
      <Row>
        <Col className="text-center my-4">
          <Image src={LoginImage} alt="empty" className="w-75" />
        </Col>
      </Row>
      <h4>Sign In</h4>
      <form>
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
          {resendEmail && (
            <p
              className="text-danger text-right cursor-pointer"
              onClick={(e) => resendConfirmationLink(e)}
            >
              {" "}
              Missed Confirmation Link?
            </p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
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
          <p className="text-muted text-right cursor-pointer">
            {" "}
            Forgot Password?{" "}
            <Link to={`/forgot-password/${email}`}>
              <span className="text-dark">Click here</span>
            </Link>{" "}
          </p>
        </div>
      </form>
      <button
        type="button"
        onClick={(e) => handleSubmit(e)}
        className="btn btn-primary"
        disabled={loading}
      >
        Sign In {loading ? " " : ""}
        <span
          className={loading ? "spinner-border spinner-border-sm" : ""}
          role="status"
          aria-hidden="true"
        ></span>
      </button>

      <Row className="py-3">
        <Col>
          New User? <Link to={`/register`}> Register </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
