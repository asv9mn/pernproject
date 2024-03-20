import React, { Fragment, useState } from "react";
import Schema from "../utils/InputValidation";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setInvalidInput(false);
    try {
      const formData = { fullName: name, dateOfBirth: dateOfBirth };
      const isValid = await Schema.isValid(formData);

      if (isValid !== true) {
        setInvalidInput(true);
      } else {
        const request = await fetch("http://localhost:5000/runners", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name, dateOfBirth }),
        });

        console.log(request);
        //window.location = "/"
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">Register for 2024 Marathon!</h1>
      {invalidInput && (
        <div className="text-center mt-5 alert alert-danger">
          Error! Please ensure that you enter a valid name and are at least 18
          years old
        </div>
      )}
      <form
        title="Registration Form"
        className="text-center mt-5"
        onSubmit={onSubmitForm}
      >
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          />
        </label>
        <button className="btn btn-success">Register</button>
      </form>

      <div className="text-center mt-5">
        <a href="/users">
          <button className="btn btn-primary">
            See all registered runners!
          </button>
        </a>
      </div>
    </Fragment>
  );
};

export default RegisterUser;
