import { useEffect, useState } from "react";
import axios from "../../helper/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginModal() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", form);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    async function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      const { data } = await axios.post("/google-login", {
        google_token: response.credential,
      });
      localStorage.setItem("access_token", data.access_token);
      // console.log(data)
      navigate("/");
    }
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "994656509655-1tl316lksp5jbf0ccio92tri5rmeabcl.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      // google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);
  return (
    <>
      {/* <!-- component --> */}
      <div class="flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div class="w-1/2 h-screen hidden lg:block">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMGU4ODVkZDYtYjNiNS00YmFiLWFmOWQtODM2NDRjZDAxNzliXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"
            alt="Placeholder Image"
            class="object-cover w-full h-full rounded-lg"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleOnSubmit}>
            {/* <!-- email Input --> */}
            <div class="mb-4 text-black">
              <label htmlFor="email" class="block text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={form.email}
                onChange={(event) => {
                  setForm((prevForm) => {
                    return { ...prevForm, email: event.target.value };
                  });
                }}
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
                onChange={(event) => {
                  setForm((prevForm) => {
                    return { ...prevForm, password: event.target.value };
                  });
                }}
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {/* <!-- Login Button --> */}
            <button
              type="submit"
              class="bg-slate-600 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
          <div id="buttonDiv" className="mt-5"></div>
          {/* <!-- Sign up  Link --> */}
          <div class="mt-6 text-gray-300 text-center">
            <Link to="/register" className="text-white hover:underline">
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
