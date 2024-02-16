import StartPage from "../pages/StartPage.js";

export const routes = [
  {
    path: "/",
    element: <StartPage />,
    type: "PUBLIC",
    title: "Home",
    children: [
      {
        path: "/user",
        element: <>UserPage</>,
        type: "PUBLIC",
        title: "User",
      },
      {
        path: "/shop",
        element: <>ShopPage</>,
        type: "PUBLIC",
        title: "Shop ",
      },
      {
        path: "/profile",
        element: <>Profile '/profile' _AUTHENTICATED_</>,
        type: "PRIVATE",
        title: "Profile",
      },
    ],
  },
  {
    path: "*",
    element: <StartPage />,
  },
];
