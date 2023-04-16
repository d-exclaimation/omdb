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
            Your profile
          </Layout>
        ),
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
        path: "/films",
        element: (
          <Layout route="Films" heading="Explore all films">
            Search for films
          </Layout>
        ),
      },
      {
        path: "/myfilms",
        element: (
          <Layout route="Your films" heading="Your gallery of films">
            Create new film
          </Layout>
        ),
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
