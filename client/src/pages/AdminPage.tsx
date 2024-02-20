import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DeviceApi from "../api/deviceApi";
import { Box, FormControl, Input, InputLabel } from "@mui/material";
import CustomMUIButton from "../components/UI/CustomMUIButton";
import rootStore from "../store/rootStore";
import CustomMUITable from "../components/UI/CustomMUITable";

const AdminPage = observer(() => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [brand, setBrand] = useState<string>("");

  useEffect(() => {
    DeviceApi.getAllDevices();
  }, []);

  const handleAddItem = async () => {
    await DeviceApi.addDevice(title, price, brand);
    DeviceApi.getAllDevices();
    setTitle("");
    setPrice(0);
    setBrand("");
  };

  const deviceStore = rootStore.deviceStore;

  const handleDelete = async (id: number) => {
    await DeviceApi.deleteDevice(id);
    DeviceApi.getAllDevices();
  };

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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomMUIButton
            variant="ok"
            onClick={handleAddItem}
            sx={{ width: 200 }}
          >
            Add
          </CustomMUIButton>
        </Box>

        <Box>
          {deviceStore.devices.length ? (
            <CustomMUITable
              data={deviceStore.devices}
              deleteFunc={handleDelete}
            />
          ) : null}
        </Box>
      </Box>
    </div>
  );
});

export default AdminPage;
