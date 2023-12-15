import { createBrowserRouter, redirect } from "react-router-dom"
import LoginModal from "./components/Login"
import LayOut from "./layout/layout"
import HomePage from "./views/HomePage"
import GameDetailPage from "./views/DetailPage"
import Register from "./components/Register"
import AdminPage from "./views/AdminPage"

export const router = createBrowserRouter([
    {
        path : "/login",
        element : <LoginModal />,
        loader : (req) => {
            const isLogin = localStorage.getItem("access_token")
            const userRole = req.user?.role;
            console.log(userRole)
            if(isLogin && userRole === "Admin") {
                throw redirect ("/admin")
            } else if(isLogin && userRole === "Customer"){
                throw redirect("/")
            } else {
                return null
            }
        },
    },
    {
        path : "/",
        element : <LayOut />,
        children : [
            {
            path : "/",
            element : <HomePage />
            }
        ]
    },
    {
        path : "/games/:id",
        element : <LayOut />,
        children : [
            {
            path : "/games/:id",
            element : <GameDetailPage />
            }
        ]
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path: "/admin",
        element: <LayOut />,
        loader: (req) => {
          const isLogin = localStorage.getItem("access_token");    
          if (isLogin) {
            return null;
          } else {
            throw redirect("/");
          }
        },
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
          },
        ],
      },
])