import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./AuthProvider";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Lazy imports for pages
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const Auto = lazy(() => import("./pages/Auto/Auto"));
const AutoDetail = lazy(() => import("./pages/Auto/Detail/AutoDetail"));
const DiscountsDetail = lazy(
  () => import("./pages/Discounts/Detail/DiscountsDetail")
);
const NewDiscountPrice = lazy(
  () => import("./pages/Discounts/Detail/NewDiscountPrice/newDiscountPrice")
);
const NewDiscountDays = lazy(
  () => import("./pages/Discounts/Detail/newDiscountDays/newDiscountDays")
);
const Discounts = lazy(() => import("./pages/Discounts/Discounts"));
const Info = lazy(() => import("./pages/Info/Info"));
const InfoAbout = lazy(() => import("./pages/Info/InfoAbout/InfoAbout"));
const InfoFaq = lazy(() => import("./pages/Info/InfoFaq/InfoFaq"));
const InfoMails = lazy(() => import("./pages/Info/InfoMails/InfoMails"));
const InfoMain = lazy(() => import("./pages/Info/InfoMain/InfoMain"));
const InfoMinBookHours = lazy(() => import("./pages/Info/InfoMinBookHours"));
const InfoPartners = lazy(
  () => import("./pages/Info/InfoPartners/InfoPartners")
);
const Login = lazy(() => import("./pages/Login/Login"));
const Orders = lazy(() => import("./pages/Orders/Orders"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
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
            element: (
              <Suspense fallback={<Loading />}>
                <Orders />
              </Suspense>
            ),
          },
          {
            path: "auto",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loading />}>
                    <Auto />
                  </Suspense>
                ),
              },
              {
                path: "detail",
                element: (
                  <Suspense fallback={<Loading />}>
                    <AutoDetail />
                  </Suspense>
                ),
              },
              {
                path: "detail/:id",
                element: (
                  <Suspense fallback={<Loading />}>
                    <AutoDetail />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "discounts",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loading />}>
                    <Discounts />
                  </Suspense>
                ),
              },
              {
                path: "detail",
                element: (
                  <Suspense fallback={<Loading />}>
                    <DiscountsDetail />
                  </Suspense>
                ),
                children: [
                  {
                    path: "newDiscountPrice",
                    element: (
                      <Suspense fallback={<Loading />}>
                        <NewDiscountPrice />
                      </Suspense>
                    ),
                  },
                  {
                    path: "newDiscountDays",
                    element: (
                      <Suspense fallback={<Loading />}>
                        <NewDiscountDays />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: "detail",
                element: (
                  <Suspense fallback={<Loading />}>
                    <DiscountsDetail />
                  </Suspense>
                ),
                children: [
                  {
                    path: "newDiscountPrice/:id",
                    element: (
                      <Suspense fallback={<Loading />}>
                        <NewDiscountPrice />
                      </Suspense>
                    ),
                  },
                  {
                    path: "newDiscountDays/:id",
                    element: (
                      <Suspense fallback={<Loading />}>
                        <NewDiscountDays />
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: "info",
            element: (
              <Suspense fallback={<Loading />}>
                <Info />
              </Suspense>
            ),
            children: [
              {
                path: "detail",
                element: (
                  <Suspense fallback={<Loading />}>
                    <InfoMain />
                  </Suspense>
                ),
              },
              {
                path: "about",
                element: (
                  <Suspense fallback={<Loading />}>
                    <InfoAbout />
                  </Suspense>
                ),
              },
              {
                path: "faq",
                element: (
                  <Suspense fallback={<Loading />}>
                    <InfoFaq />
                  </Suspense>
                ),
              },
              {
                path: "partners",
                element: (
                  <Suspense fallback={<Loading />}>
                    <InfoPartners />
                  </Suspense>
                ),
              },
              {
                path: "emails",
                element: (
                  <Suspense fallback={<Loading />}>
                    <InfoMails />
                  </Suspense>
                ),
              },
              {
                path: "min-book-hours",
                element: (
                  <Suspense fallback={<Loading />}>
                    <InfoMinBookHours />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "analytics",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loading />}>
                    <Analytics />
                  </Suspense>
                ),
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
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={12000}
        style={{ fontWeight: 700, fontSize: 16 }}
      />
    </AuthProvider>
  );
};

export default App;
