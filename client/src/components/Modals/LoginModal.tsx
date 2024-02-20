import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { observer } from "mobx-react-lite";
import rootStore from "../../store/rootStore.js";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import UserApi from "../../api/userApi.js";
import CustomMUIButton from "../UI/CustomMUIButton.js";

interface MyModalProps {}

const MyModal: React.FC<MyModalProps> = observer(() => {
  const modalStore = rootStore.modalStore;

  const [isRegister, setIsRegister] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleClose = (): void => {
    modalStore.setLoginModalState(false);
    modalStore.setLoginModalError(null);
    setIsRegister(false);
  };

  const handleRegister = (email: string, password: string) => {
    UserApi.register(email, password, isAdmin);
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  const handleLogin = (email: string, password: string) => {
    UserApi.login(email, password);
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  const handleChangeMode = (bool: boolean): void => {
    setIsRegister(bool);
    setEmail("");
    setPassword("");
    modalStore.setLoginModalError(null);
    setIsAdmin(false);
  };

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div>
      <Modal
        open={modalStore.loginModalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          {!isRegister ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                LOGIN
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <>New one? </>
                <Button onClick={() => handleChangeMode(true)}>Register</Button>
              </Typography>
              <FormControl variant="standard" sx={{ width: 0.85 }}>
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <Input
                  id="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ width: 0.85, marginTop: 1 }}
              >
                <InputLabel htmlFor="component-simple">Password</InputLabel>
                <Input
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {modalStore.loginModalError && (
                <Typography
                  id="modal-modal-title"
                  variant="subtitle2"
                  component="h2"
                  color={"red"}
                  align="center"
                  marginTop={2}
                >
                  {modalStore.loginModalError}
                </Typography>
              )}

              <CustomMUIButton
                variant="ok"
                sx={{ marginTop: 4, marginLeft: 25 }}
                onClick={() => handleLogin(email, password)}
              >
                Enter
              </CustomMUIButton>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                REGISTRATION
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <>Already have account? </>
                <Button onClick={() => handleChangeMode(false)}>Login</Button>
              </Typography>
              <FormControl variant="standard" sx={{ width: 0.85 }}>
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <Input
                  id="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ width: 0.85, marginTop: 1 }}
              >
                <InputLabel htmlFor="component-simple">Password</InputLabel>
                <Input
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {modalStore.loginModalError && (
                <Typography
                  id="modal-modal-title"
                  variant="subtitle2"
                  component="h2"
                  color={"red"}
                  align="center"
                  marginTop={2}
                >
                  {modalStore.loginModalError}
                </Typography>
              )}
              <Box sx={{ marginTop: 2 }}>
                <FormControlLabel
                  control={<Checkbox onChange={handleToggle} />}
                  label="admin"
                />
                <CustomMUIButton
                  variant="ok"
                  sx={{ marginTop: 2, marginLeft: 6 }}
                  onClick={() => handleRegister(email, password)}
                >
                  Registration
                </CustomMUIButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
});
export default MyModal;
