import React from "react";

interface SignUpFormProps {
  formData: {
    name: string;
    email: string;
    username: string;
    password: string;
  };
  handleChangeSignUp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: () => void;
}

const SignUpForm = ({
  formData,
  handleChangeSignUp,
  handleSignUp,
}: SignUpFormProps) => (
  <div>
    <h3 className="font-bold mb-4">Create Account</h3>
    <div className="space-y-3">
      <div className="flex items-center">
        <label className="w-24" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChangeSignUp}
          className="border border-gray-400 text-sm p-1 flex-1"
        />
      </div>
      <div className="flex items-center">
        <label className="w-24" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChangeSignUp}
          className="border border-gray-400 text-sm p-1 flex-1"
        />
      </div>
      <div className="flex items-center">
        <label className="w-24" htmlFor="signup-username">
          Username:
        </label>
        <input
          id="signup-username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChangeSignUp}
          className="border border-gray-400 text-sm p-1 flex-1"
        />
      </div>
      <div className="flex items-center">
        <label className="w-24" htmlFor="signup-password">
          Password:
        </label>
        <input
          id="signup-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChangeSignUp}
          className="border border-gray-400 text-sm p-1 flex-1"
        />
      </div>
      <button
        onClick={handleSignUp}
        className="mt-2 border px-2 py-1 bg-gray-200 hover:bg-gray-300"
      >
        Create Account
      </button>
    </div>
  </div>
);

export default SignUpForm;
