import StartPage from "../pages/StartPage.js";

export const routes = [
  {
    path: "/",
    element: <StartPage />,
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
        element: <>ShopPage</>,
        type: "PUBLIC",
        access_type: "USER",
        title: "Shop ",
      },
      {
        path: "/profile",
        element: <>Profile '/profile' _AUTHENTICATED_</>,
        type: "PRIVATE",
        access_type: "USER",
        title: "Profile",
      },
      {
        path: "/admin",
        element: <>Admin '/profile' _AUTHENTICATED_</>,
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
