import { type FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import AuthProvider from "./auth/AuthProvider";
import NavBar from "./navigation/NavBar";
import HomePage from "./pages/index";
import Layout from "./pages/layout";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import SignupPage from "./pages/signup";

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
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 2,
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SWRConfig>
  );
};

export default App;
