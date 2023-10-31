import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Table } from "./components/ui/table/table";
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
        path: "table",
        element: <Table />,
      },
      {
        path: "auto",
        element: <Auto />,
        children: [
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
