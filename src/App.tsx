import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Suspense, lazy } from "react";

import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";

const Layout = lazy(() => import("./components/Layout/Layout"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const Auto = lazy(() => import("./pages/Auto/Auto"));
const AutoDetail = lazy(() => import("./pages/Auto/Detail/AutoDetail"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const Info = lazy(() => import("./pages/Info/Info"));
const InfoMain = lazy(() => import("./pages/Info/InfoMain/InfoMain"));
const InfoAbout = lazy(() => import("./pages/Info/InfoAbout/InfoAbout"));
const InfoFaq = lazy(() => import("./pages/Info/InfoFaq/InfoFaq"));
const InfoPartners = lazy(() => import("./pages/Info/InfoPartners/InfoPartners"));
const Discounts = lazy(() => import("./pages/Discounts/Discounts"));
const DiscountsDetail = lazy(() => import("./pages/Discounts/Detail/DiscountsDetail"));
const NewDiscountPrice = lazy(() => import("./pages/Discounts/Detail/NewDiscountPrice/NewDiscountPrice"));
const NewDiscountDays = lazy(() => import("./pages/Discounts/Detail/NewDiscountDays/NewDiscountDays"));
const Login = lazy(() => import("./pages/Login/Login"));
const InfoMails = lazy(() => import("./pages/Info/InfoMails/InfoMails"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
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
              {
                path: "emails",
                element: <InfoMails />,
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
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer autoClose={12000} style={{ fontWeight: 700, fontSize: 16 }} />
    </AuthProvider>
  );
};

export default App;
