import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DeviceApi from "../api/deviceApi";
import { Box, FormControl, Input, InputLabel } from "@mui/material";
import CustomMUIButton from "../components/CustomMUIButton";
import rootStore from "../store/rootStore";
import { COLOR_MAIN } from "../colors";

const AdminPage = observer(() => {
  useEffect(() => {
    DeviceApi.getAllDevices();
  }, []);

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");

  const handleAddItem = () => {
    DeviceApi.addDevice(title, price, brand);
    setTitle("");
    setPrice(0);
    setBrand("");
  };

  const deviceStore = rootStore.deviceStore;

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, margin: 4 }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Title</InputLabel>
          <Input
            id="passwordInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Price</InputLabel>
          <Input
            id="passwordInput"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Brand</InputLabel>
          <Input
            id="passwordInput"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </FormControl>
        <CustomMUIButton variant="ok" onClick={handleAddItem}>
          Add
        </CustomMUIButton>
        <Box>
          {deviceStore.devices.map((device) => {
            return (
              <Box
                key={device.id}
                sx={{
                  border: `1px solid ${COLOR_MAIN}`,
                  padding: 2,
                  margin: 2,
                  minWidth: 200,
                }}
              >
                <div> {device.brand}</div>
                <div> {device.title}</div>
                <div> {device.price}</div>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
});

export default AdminPage;
