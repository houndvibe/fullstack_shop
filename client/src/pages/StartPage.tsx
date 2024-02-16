import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Fragment } from "react";
import AppToolbar from "../components/Toolbar";
import { Outlet } from "react-router-dom";

const StartPage = () => {
  return (
    <Fragment>
      <Container disableGutters maxWidth={false}>
        <AppToolbar />
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 100,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Fragment>
  );
};

export default StartPage;