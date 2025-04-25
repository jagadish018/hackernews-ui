// log/components/LoginForm.tsx

import React from "react";

interface LoginFormProps {
  
  loginData: {
    username: string;
    password: string;
  };
  handleChangeLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignIn: () => void;

}

const LoginForm = ({
  loginData,
  handleChangeLogin,
  handleSignIn,
}: LoginFormProps) => (
  <div>
    <h3 className="font-bold mb-4">Login</h3>
    <div className="space-y-3">
      <div className="flex items-center">
        <label className="w-24" htmlFor="login-username">
          Username:
        </label>
        <input
          id="login-username"
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChangeLogin}
          className="border border-gray-400 text-sm p-1 flex-1"
        />
      </div>
      <div className="flex items-center">
        <label className="w-24" htmlFor="login-password">
          Password:
        </label>
        <input
          id="login-password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChangeLogin}
          className="border border-gray-400 text-sm p-1 flex-1"
        />
      </div>
      <button
        onClick={handleSignIn}
        className="mt-2 border px-2 py-1 bg-gray-200 hover:bg-gray-300"
      >
        Login
      </button>
      <br />
      <a
        href="/forgot-password"
        className="text-blue-600 underline mt-2 inline-block"
      >
        Forgot your password?
      </a>
    </div>
  </div>
);

export default LoginForm;
