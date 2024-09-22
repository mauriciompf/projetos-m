import {
  createHashRouter as createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import NotFound from "./components/NotFound";
import Gallery from "./pages/Gallery";
import Time from "./pages/Time";
import Table from "./pages/Table";

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
        path: "/", // "Homepage"
        element: <Table />,
      },
      {
        path: "/pages/filter",
        element: <Table />,
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
