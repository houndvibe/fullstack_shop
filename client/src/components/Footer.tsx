import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { COLOR_MAIN } from "../colors";

interface AppFooterProps {}

const AppFooter: React.FC<AppFooterProps> = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: COLOR_MAIN,
          }}
        >
          {" "}
          myShopⒸ
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AppFooter;
