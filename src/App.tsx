import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar/SideBar";
import Filter from "./pages/Filter";

const router = createBrowserRouter([
  {
    path: "/mauricioProjetos",
    element: <HomePage />,
  },
  {
    element: <SideBar />,
    children: [
      {
        path: "/mauricioProjetos/pages/filter",
        element: <Filter />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
