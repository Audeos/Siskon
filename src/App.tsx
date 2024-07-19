import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./layout";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AddUserPage from "./pages/AddUserPage.tsx";
import AddUserDetailsPage from "./pages/AddUserDetailsPage.tsx";
import UserDetailsListingPage from "./pages/UserDetailsListingPage.tsx";
import "./App.css"

function App() {

  const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {path: "/login/", element: <LoginPage/>},
      {path: "/addUser/", element: <AddUserPage/>},
      {path: "/addUserDetails/", element: <AddUserDetailsPage/>},
      {path: "/userList/", element: <UserDetailsListingPage/>},
    ]
  }])

  return (
      <>
        <RouterProvider router={router}/>
      </>
  )
}

export default App
