import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import GradientButton from "./GradientButton";
import Label from "./Label";
import Card from "./Card";
import Vinyl from "../../assets/vinyl_icon.svg";
import "./signup.css";
import { AuthContext } from "../context/AuthContext";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post("/v.1/api/signup", credentials);
      console.log(data);
      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError("");
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setSignupError(data.message);
      setSignupSuccess("");
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/displayAllSongs" />}
      <section className="signup">
        <div className="gradient-bar" />
        <Card>
          <div className="signup-fields">
            <div className="signup-fields-wrapper">
              <div className="form-header">
                <div className="form-logo">
                  <img src={Vinyl} alt="Logo" />
                </div>
                <h2 className="signup-title">Sign up for an account</h2>
                <p className="signup-text">
                  Already have an account? <Link to="login">Log in Now</Link>
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => submitCredentials(values)}
              >
                {() => (
                  <Form className="signup-form">
                    {signupSuccess && <FormSuccess text={signupSuccess} />}
                    {signupError && <FormError text={signupError} />}
                    <input type="hidden" name="remember" value="true" />
                    <div className="form-container">
                      <div className="signup-field">
                        <div className="firstname-field">
                          <Label text="First Name" />

                          <FormInput
                            ariaLabel="First Name"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="lastname-field">
                          <Label text="Last Name" />

                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                        <div className="email-field">
                          <Label text="Email address" />

                          <FormInput
                            ariaLabel="Email address"
                            name="email"
                            type="email"
                            placeholder="Email address"
                          />
                        </div>
                        <div className="password-field">
                          <Label text="Password" />

                          <FormInput
                            ariaLabel="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="gradient-button">
                      <GradientButton
                        type="submit"
                        text="Sign Up"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default SignUp;
