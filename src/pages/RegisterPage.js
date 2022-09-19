import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      toast.success("Registration successfull");
      setEmail("");
      setPassword("");
      setCPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
      setLoading(false);
    }
  };
  return (
    <div className="register-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5 ">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>REGISTER</h2>
            <hr />

            <input
              type="text"
              value={email}
              placeholder="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              value={cpassword}
              placeholder="confirm password"
              className="form-control"
              onChange={(e) => setCPassword(e.target.value)}
            />

            <button className="my-3" onClick={register}>
              REGISTER
            </button>
            <hr />
            <Link to="/LoginPage">Click here to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
