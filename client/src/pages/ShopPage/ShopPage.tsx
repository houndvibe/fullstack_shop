import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import rootStore from "../../store/rootStore";
import DeviceApi from "../../api/deviceApi";
import ProductCard from "../../components/ProductCard";
import { Box } from "@mui/material";
import { COLOR_MAIN } from "../../colors";

const ShopPage = observer(() => {
  useEffect(() => {
    DeviceApi.getAllDevices();
  }, []);

  const deviceStore = rootStore.deviceStore;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
            <ProductCard {...device} />
          </Box>
        );
      })}
    </Box>
  );
});

export default ShopPage;
