import { Button, ButtonProps, ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";
import { COLOR_BUTTON_DANGER, COLOR_BUTTON_OK } from "../colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    ok: true;
    danger: true;
  }
}

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: "ok" },
          style: {
            color: "white",
            background: COLOR_BUTTON_OK.IDLE,
            "&:hover": {
              backgroundColor: COLOR_BUTTON_OK.HOVER,
            },
            "&:active": {
              backgroundColor: COLOR_BUTTON_OK.ACTIVE,
            },
          },
        },
        {
          props: { variant: "danger" },
          style: {
            color: "white",
            background: COLOR_BUTTON_DANGER.IDLE,
            "&:hover": {
              backgroundColor: COLOR_BUTTON_DANGER.HOVER,
            },
            "&:active": {
              backgroundColor: COLOR_BUTTON_DANGER.ACTIVE,
            },
          },
        },
      ],
    },
  },
});

const CustomMUIButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <ThemeProvider theme={buttonTheme}>
        <Button ref={ref} {...props}></Button>
      </ThemeProvider>
    );
  }
);

CustomMUIButton.displayName = "CustomButton";

export default CustomMUIButton;
