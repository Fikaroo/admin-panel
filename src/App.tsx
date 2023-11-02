import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Orders from "./pages/Orders/Orders";
import Auto from "./pages/Auto/Auto";
import AutoDetail from "./pages/Auto/Detail/AutoDetail";
import Analytics from "./pages/Analytics/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Orders />,
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
      {
        path: "analytics",
        children: [
          {
            index: true,
            element: <Analytics />,
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
