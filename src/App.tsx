import {
  createHashRouter as createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar/SideBar";
import Filter from "./pages/Filter";
import NotFound from "./components/NotFound";
import Gallery from "./pages/Gallery";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <SideBar />,
    children: [
      {
        path: "/pages/filter",
        element: <Filter />,
      },
      {
        path: "/pages/gallery",
        element: <Gallery />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
