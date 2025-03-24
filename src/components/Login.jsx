import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message);
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 text-black">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl text-white">
                <h2 className="text-3xl text-black font-extrabold text-center">Welcome Back</h2>
                <p className="text-center text-black">Sign in to your account</p>
                {errorMessage && <p className="mt-2 text-sm text-red-400 text-center">{errorMessage}</p>}

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-black">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
