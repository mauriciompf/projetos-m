import {
  createHashRouter as createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar/SideBar";
import Filter from "./pages/Filter";
import NotFound from "./components/NotFound";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
