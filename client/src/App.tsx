import { observer } from "mobx-react-lite";
import AppRouter from "./routes/appRouter.js";
import { CssBaseline } from "@mui/material";
import MyModal from "./components/Modals/LoginModal.js";
import { useEffect } from "react";
import UserApi from "./api/userApi.js";

const App = observer(() => {
  useEffect(() => {
    UserApi.check();
  }, []);
  return (
    <>
      <CssBaseline />
      <MyModal />
      <AppRouter />
    </>
  );
});

export default App;
