import { type FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import NavBar from "./navigation/NavBar";
import HomePage from "./pages/index";
import Layout from "./pages/layout";
import ProfilePage from "./pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
        <NavBar />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/reviews",
        element: (
          <Layout route="Reviews" heading="Browse for film reviews">
            Something
          </Layout>
        ),
      },
      {
        path: "/explore",
        element: (
          <Layout route="Films" heading="Explore all films">
            Search for films
          </Layout>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Layout route="Gallery" heading="Your gallery of films">
            Create new film
          </Layout>
        ),
      },
      {
        path: "/login",
        element: (
          <Layout route="Login" heading="Login">
            Login
          </Layout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Layout route="Signup" heading="Signup">
            Signup
          </Layout>
        ),
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
