import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Orders from "./pages/Orders/Orders";
import Auto from "./pages/Auto/Auto";
import AutoDetail from "./pages/Auto/Detail/AutoDetail";
import Analytics from "./pages/Analytics/Analytics";
import Info from "./pages/Info/Info";
import InfoMain from "./pages/Info/InfoMain/InfoMain";
import InfoAbout from "./pages/Info/InfoAbout/InfoAbout";
import InfoFaq from "./pages/Info/InfoFaq/InfoFaq";
import InfoPartners from "./pages/Info/InfoPartners/InfoPartners";
import Discounts from "./pages/Discounts/Discounts";
import DiscountsDetail from "./pages/Discounts/Detail/DiscountsDetail";
import NewDiscountPrice from "./pages/Discounts/Detail/newDiscountPrice/newDiscountPrice";
import NewDiscountDays from "./pages/Discounts/Detail/newDiscountDays/newDiscountDays";
import Login from "./pages/Login/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          {
            path: "detail/:id",
            element: <AutoDetail />,
          },
        ],
      },
      {
        path: "discounts",
        children: [
          {
            index: true,
            element: <Discounts />,
          },
          {
            path: "detail",
            element: <DiscountsDetail />,
            children: [
              {
                path: "newDiscountPrice",
                element: <NewDiscountPrice />,
              },
              {
                path: "newDiscountDays",
                element: <NewDiscountDays />,
              },
            ],
          },
          {
            path: "detail",
            element: <DiscountsDetail />,
            children: [
              {
                path: "newDiscountPrice/:id",
                element: <NewDiscountPrice />,
              },
              {
                path: "newDiscountDays/:id",
                element: <NewDiscountDays />,
              },
            ],
          },
        ],
      },
      {
        path: "info",
        element: <Info />,
        children: [
          {
            path: "detail",
            element: <InfoMain />,
          },
          {
            path: "about",
            element: <InfoAbout />,
          },
          {
            path: "faq",
            element: <InfoFaq />,
          },
          {
            path: "partners",
            element: <InfoPartners />,
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
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
