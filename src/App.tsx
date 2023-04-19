import { type FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import AuthProvider from "./auth/AuthProvider";
import GenreProvider from "./common/context/genre/GenreProvider";
import NavBar from "./navigation/NavBar";
import GalleryPage from "./pages/gallery";
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
        element: <GalleryPage />,
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
        errorRetryCount: 3,
        focusThrottleInterval: 60 * 60 * 1000,
      }}
    >
      <AuthProvider>
        <GenreProvider>
          <RouterProvider router={router} />
        </GenreProvider>
      </AuthProvider>
    </SWRConfig>
  );
};

export default App;
