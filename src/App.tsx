import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
// import Dashboard from "./pages/Dashboard/Dashboard";
import { Table } from "./components/ui/table/table";
import Auto from "./pages/Auto/Auto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Table />,
      },
      // {
      //   path: "/",
      //   element: <Table />,
      // },
      {
        path: "/auto",
        element: <Auto />,
      },
      {
        path: "/stocks",
        element: <Auto />,
      },
      {
        path: "/info",
        element: <Auto />,
      },
      {
        path: "/analytics",
        element: <Auto />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
