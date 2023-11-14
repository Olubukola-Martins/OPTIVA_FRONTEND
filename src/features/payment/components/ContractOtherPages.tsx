import watermarkLogo from "src/assets/watermarkLogo.png";
import logo from "src/assets/logo.png";

const ContractOtherPages = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-2 border-gray-200 rounded-2xl py-4 px-2 text-sm sm:text-base ">
      <div
        className="flex flex-col px-2 sm:px-8 place-items-center gap-6"
        style={{
          background: `url(${watermarkLogo})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full">
          <img src={logo} />
          <div className="flex flex-row pt-2">
            <div className="border-b-4 w-1/12 border-[#801D22]"></div>
            <div className="border-b-4 w-11/12 border-gray-400"></div>
          </div>
        </div>

        <div className="md:pt-8 sm:pt-6 pt-4 px-5 md:px-10 min-h-screen place-self-start"> {children}</div>
      </div>
    </div>
  );
};

export default ContractOtherPages;
