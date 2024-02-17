import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import rootStore from "../store/rootStore.js";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToolbarRoutes from "../hooks/userRoutes.js";

interface AppToolbarProps {}

const AppToolbar: React.FC<AppToolbarProps> = observer(() => {
  const userStore = rootStore.userStore;
  const modalStore = rootStore.modalStore;

  const toolbarRoutes = useToolbarRoutes(
    userStore.isAuth,
    userStore.user?.role
  );

  const navigate = useNavigate();

  const handleLogin = () => {
    modalStore.setLoginModalState(true);
  };

  const handleLogOut = () => {
    rootStore.userStore.setUser(null);
    rootStore.userStore.setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="div" sx={{ flexGrow: 1, display: "flex" }}>
            {toolbarRoutes.map((item) => {
              return (
                <Fragment key={item.title}>
                  <Link
                    style={{
                      textDecoration: "none",
                      marginRight: "10px",
                      color: "white",
                    }}
                    to={item.path}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                </Fragment>
              );
            })}
          </Box>
          {userStore.isAuth ? (
            <>
              {" "}
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <PersonIcon />
              </IconButton>
              <Button onClick={handleLogOut} color="inherit">
                LogOut
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default AppToolbar;
