import React, { useState } from 'react';

interface FormProps {
    onSubmit: (data: { username: string; password: string }) => void;
    formType: 'register' | 'login';
}

const Form: React.FC<FormProps> = ({ onSubmit, formType }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                {formType === 'register' ? 'Register' : 'Login'}
            </button>
        </form>
    );
};

export default Form;