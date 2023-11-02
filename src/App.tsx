import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Orders/Orders";
import Auto from "./pages/Auto/Auto";
import AutoDetail from "./pages/Auto/Detail/AutoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "auto",
        children: [
          {
            index: true,
            element: <Auto />,
          },

          {
            path: "detail",
            element: <AutoDetail />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
