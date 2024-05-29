import { ThemeConfig } from "antd";

export const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#109856",
    colorBorder: "#DCE1EA",
  },
  components: {
    DatePicker: {
      colorBorder: "#DCE1EA",
      colorTextPlaceholder: "#8B98B9",
      controlOutlineWidth: 0
    },
  },
};
