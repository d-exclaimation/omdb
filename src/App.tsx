import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 2d in ms
      staleTime: 1000 * 60 * 60 * 24 * 2,
    },
  },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
