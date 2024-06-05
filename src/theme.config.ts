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
      controlOutlineWidth: 0,
    },
    Select: {
      colorBorder: "#DCE1EA",
      colorTextPlaceholder: "#8B98B9",
      controlOutlineWidth: 0,
      lineWidth: 0,
      colorText: "#8B98B9",
    },
    Button: {
      dangerColor: "#fff",
      colorErrorBg: "blue",
    },
    Input: {
      controlOutlineWidth: 0,
      lineWidth: 0,
    },
    InputNumber: {
      controlOutlineWidth: 0,
      lineWidth: 0,
      colorText: "#8B98B9",
    },
  },
};
