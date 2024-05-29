import { ConfigProvider } from "antd";
import Kwara from "./assets/images/kwara-logo.svg";
import Logo from "./assets/images/logo.svg";
import StepForm from "./components/StepForm";
import { customTheme } from "./theme.config";

const App = () => {
  document.title = "Self Onboarding | Kwara State Government";

  return (
    <ConfigProvider theme={customTheme}>
      <main className="h-screen grid lg:grid-cols-2">
        <header className="lg:hidden p-3">
          <img src={Logo} alt="" className="" />
        </header>
        <section className="bg-left items-center relative hidden lg:flex">
          <img src={Logo} alt="" className="absolute left-10 top-5" />
          <img
            src={Kwara}
            alt=""
            className="m-auto kwara"
          />
          <div className="absolute bottom-10 left-10 flex items-center">
            <p className="text-gray-500">Powered by</p>
            <img src={Logo} alt="" className="w-1/3 -mb-1" />
          </div>
        </section>
        <section className="overflow-auto p-5 lg:p-10">
          <StepForm />
        </section>
      </main>
    </ConfigProvider>
  );
};

export default App;
