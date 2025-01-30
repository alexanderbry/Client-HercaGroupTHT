import React from "react";
import Form from "../components/Form";

const RegisterPage: React.FC = () => {
  const handleRegister = (data: { username: string; password: string }) => {
    console.log("Registering:", data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto max-w-md p-4">
        <h2 className="text-center text-2xl font-bold mb-4">
          Create an Account
        </h2>
        <Form onSubmit={handleRegister} formType="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
