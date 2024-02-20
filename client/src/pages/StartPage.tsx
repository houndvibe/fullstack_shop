import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppToolbar from "../components/Toolbar";
import { Outlet } from "react-router-dom";
import AppFooter from "../components/Footer";
import { COLOR_BACKGROUND } from "../colors";

const StartPage = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="header">
        <AppToolbar />
      </Box>
      <Box
        className="main"
        sx={{
          bgcolor: COLOR_BACKGROUND,
          flexShrink: 1,
          flexGrow: 1,
          flexBasis: "auto",
        }}
      >
        <Outlet />
      </Box>
      <Box className="footer">
        <AppFooter />
      </Box>
    </Container>
  );
};

export default StartPage;
