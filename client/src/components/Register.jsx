import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../helper/axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/register", form);
      setForm({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      throw error;
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <>
      {/* <!-- component --> */}
      <div class="flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div class="w-1/2 h-screen hidden lg:block">
          <img
            src="https://i.pinimg.com/736x/61/67/3f/61673f4d7c14f70d86a1cb24514a194b.jpg"
            alt="Placeholder Image"
            class="object-cover w-full h-full rounded-lg"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleRegister}>
            <div class="mb-4 text-black">
              <label for="email" class="block text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div class="mb-4 text-black">
              <label for="email" class="block text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {/* <!-- Password Input --> */}
            <div class="mb-4 text-black">
              <label for="password" class="block text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              class="bg-slate-600 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
