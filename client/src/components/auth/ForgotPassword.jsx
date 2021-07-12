import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { attemptSendResetPasswordLink } from "../../actions/userAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmited, setIsSubmited] = useState(null);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().min(5).max(255).email().required("Required"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(attemptSendResetPasswordLink(email));
    setIsSubmited(true);
  };
  return isSubmited ? (
    <div className="container">
      <h2>
        A reset link has been sent to your email.
        <b>You have 1 hour to activate your account.</b>
        It can take up to 5 min to receive our email.
      </h2>
    </div>
  ) : (
    <div className="container">
      <h6>We will send you a reset link on the following Email:</h6>
      <form validationSchema={validationSchema} onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Send reset link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
