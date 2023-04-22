import { type FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import AuthProvider from "./auth/AuthProvider";
import GlobalProvider from "./common/context/global/GlobalProvider";
import NavBar from "./navigation/NavBar";
import ExplorePage from "./pages/explore";
import FilmPage from "./pages/film";
import GalleryPage from "./pages/gallery";
import HomePage from "./pages/index";
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
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/film",
        element: <FilmPage />,
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
        revalidateOnFocus: false,
      }}
    >
      <GlobalProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GlobalProvider>
    </SWRConfig>
  );
};

export default App;
