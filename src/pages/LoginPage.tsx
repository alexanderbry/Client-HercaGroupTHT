import React from "react";
import Form from "../components/Form";

const LoginPage: React.FC = () => {
  const handleLogin = (data: { username: string; password: string }) => {
    console.log("Logging in:", data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto max-w-md p-4">
        <h2 className="text-center text-2xl font-bold mb-4">Welcome Back!</h2>
        <Form onSubmit={handleLogin} formType="login" />
      </div>
    </div>
  );
};

export default LoginPage;
