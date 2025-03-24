import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setSuccessMessage("Registration successful! A confirmation email has been sent.");
            setTimeout(() => navigate("/login"), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 to-gray-900">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl shadow-xl w-full max-w-md text-white">
                <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
                {successMessage && <p className="text-green-400 text-center">{successMessage}</p>}
                {errorMessage && <p className="text-red-400 text-center">{errorMessage}</p>}
                <form onSubmit={handleSignup} className="mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full mt-6 px-4 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-300">
                    Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
