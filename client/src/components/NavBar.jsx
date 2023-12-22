import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("access_token") !== null;
    setIsLoggedIn(isUserLoggedIn);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    navigate("/login")
    setIsLoggedIn(false);
  };

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-lg">
          Jawa Go Gaming
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            // Display "Register" and "Login" links when user is not logged in
            <>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

