import { Suspense } from "react";
import StartPage from "../pages/StartPage";
import ShopPage from "../pages/ShopPage";
import AdminPage from "../pages/AdminPage";

export const routes = [
  {
    path: "/",
    element: (
      <Suspense>
        <StartPage />
      </Suspense>
    ),
    type: "PUBLIC",
    access_type: "USER",
    title: "Home",
    children: [
      {
        path: "/user",
        element: <>UserPage</>,
        type: "PUBLIC",
        access_type: "USER",
        title: "User",
      },
      {
        path: "/shop",
        element: (
          <Suspense>
            <ShopPage />
          </Suspense>
        ),
        type: "PUBLIC",
        access_type: "USER",
        title: "Shop ",
      },
      {
        path: "/profile",
        element: <>PROFILE</>,
        type: "PRIVATE",
        access_type: "USER",
        title: "Profile",
      },
      {
        path: "/admin",
        element: (
          <Suspense> 
            <AdminPage />
          </Suspense>
        ),
        type: "PRIVATE",
        access_type: "ADMIN",
        title: "Admin pannel",
      },
    ],
  },
  {
    path: "*",
    element: <StartPage />,
  },
];
