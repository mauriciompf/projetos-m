import {
  createHashRouter as createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Filter from "./pages/Filter";
import NotFound from "./components/NotFound";
import Gallery from "./pages/Gallery";
import Time from "./pages/Time";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    element: (
      <>
        <SideBar />
        <Outlet /> {/* Child routes will be rendered here */}
      </>
    ),
    children: [
      {
        path: "/",
        element: <Filter />,
      },
      {
        path: "/pages/filter",
        element: <Filter />,
      },
      {
        path: "/pages/gallery",
        element: <Gallery />,
      },
      {
        path: "/pages/time",
        element: <Time />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
