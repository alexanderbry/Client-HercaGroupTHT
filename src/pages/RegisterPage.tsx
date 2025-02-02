import React, { useEffect } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto max-w-md p-4">
        <h2 className="text-center text-2xl font-bold mb-4">
          Create an Account
        </h2>
        <Form formType="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
