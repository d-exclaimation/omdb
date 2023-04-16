import { type FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import Layout from "./pages/layout";

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
        element: (
          <Layout route="Home" heading="Openflix">
            Netflix but better
          </Layout>
        ),
      },
      {
        path: "/profile",
        element: (
          <Layout route="Profile" heading="Your profile">
            <div />
          </Layout>
        ),
      },
      { path: "/reviews", element: <div /> },
      { path: "/films", element: <div /> },
      { path: "/myfilms", element: <div /> },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
