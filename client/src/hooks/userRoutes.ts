import { routes } from "../routes/routes.js";

const useToolbarRoutes = (isAuth: boolean, role?: "ADMIN" | "USER") => {
  const x = isAuth
    ? routes[0].children!
    : routes[0].children!.filter((item) => item.type === "PUBLIC");

  const y =
    role === "ADMIN" ? x : x.filter((item) => item.access_type === "USER");

  const toolbarRoutes = y.filter((item) => item.title != "Profile");

  return toolbarRoutes;
};

export default useToolbarRoutes;
