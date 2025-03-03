import React from 'react';

interface UserNameInputProps {
  userName: string;
  setUserName: (name: string) => void;
}

const UserNameInput: React.FC<UserNameInputProps> = ({ userName, setUserName }) => {
  return (
    <div className="mb-6">
      <label htmlFor="userName" className="block text-white mb-2">Enter Your Name:</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full p-2 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-700"
        placeholder="Your name for the certificate"
      />
    </div>
  );
};

export default UserNameInput;