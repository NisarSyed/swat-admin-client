import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            register(username, password, email);
            navigate("/");
        } catch (error) {
            console.error("Register error:", error);
        }
    };


  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">
                Register for an account
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <div>
                        <label className="block" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-baseline justify-between">
                        <button
                            className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    
    </div>
    )
}

export default Register