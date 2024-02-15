import logo from "src/assets/logoSvg.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AppButton } from "src/components/button/AppButton";

interface IPropsGenerateTemplate {
  title: string;
  templateNumber: string;
  receipientName: string;
  reciepientPhone: string;
  reciepientEmail: string;
  date_created: string;
  hideAuthorizedSignatory?: boolean;
  showInvoiceParagraph?: boolean;
  children: React.ReactNode;
  handleDownload?: () => void;
}

const GenerateTemplate = ({
  title,
  templateNumber,
  children,
  receipientName,
  reciepientPhone,
  reciepientEmail,
  hideAuthorizedSignatory,
  showInvoiceParagraph,
  date_created,
  handleDownload,
}: IPropsGenerateTemplate) => {
  return (
    <div className="border-2 rounded-md border-gray-100 mt-10 mb-16 pb-16 pt-7 px-4 flex flex-col gap-10 w-full">
      <div className="flex flex-row w-full h-fit gap-0">
        <div className=" w-[28%] border-b-2 border-[#801D23] pb-6">
          <img src={logo} alt="logo" />
        </div>
        <p className=" h-[inherit] w-[inherit] mt-auto text-right max-sm:text-[10px] border-b-2 border-gray-200 pb-6">
          No.: {templateNumber}
        </p>
      </div>

      <div className=" flex flex-row align-bottom justify-between">
        <address className="leading-loose max-sm:text-sm">
          <span className="font-semibold sm:text-lg text-base">
            {receipientName}
          </span>
          <br />
          14th Floor, Churchgate Towers 2,
          <br />
          Pc 30 Churchgate Street,
          <br />
          Victoria Island, Lagos,
          <br />
          Nigeria.
          <br />
          <div className="inline-flex place-items-baseline gap-2">
            <Icon icon="solar:phone-bold" />
            {reciepientPhone}
          </div>
          <br />
          <div className="inline-flex place-items-baseline gap-2">
            <Icon icon="clarity:email-solid" />
            {reciepientEmail}
          </div>
        </address>
        <p className="mt-auto max-sm:text-sm">{date_created}</p>
      </div>

      <p className="underline decoration-gray-200 underline-offset-2 decoration-2 text-gray-500 font-semibold text-lg sm:text-2xl text-center">
        {title}
      </p>

      {/* body */}
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-10 w-full">{children}</div>
        <p></p>
        <p
          className={`border-t-2 pt-2 border-gray-600  ml-auto w-fit ${
            hideAuthorizedSignatory ? "hidden" : ""
          }`}
        >
          Authorized Signatory
        </p>
        <p
          className={`text-center italic max-sm:text-sm ${showInvoiceParagraph ?  "" : "hidden"}`}
        >
          If you have any questions concerning this invoice, please contact us
          directly via phone or email. Thank you for your business!
        </p>
        <div className="flex flex-row flex-wrap gap-10 min-[400px]:justify-center mx-auto w-full justify-items-center">
          <div className="flex flex-row justify-center gap-2">
            <Icon icon="carbon:location-filled" className="text-red-500" />
            <address className="text-xs">
              <span className="font-semibold">Head Office:</span>
              <br /> 11th – 14th Floor,
              <br /> Churchgate Towers 2,
              <br /> Churchgate street,
              <br /> Victoria Island, Lagos
              <br /> Nigeria.
            </address>
          </div>
          <div className="flex flex-row justify-center gap-2">
            <Icon icon="carbon:location-filled" className="text-red-500" />
            <address className="text-xs">
              <span className="font-semibold">Abuja Office:</span>
              <br />
              8th Floor,
              <br /> World Trade Center 1008,
              <br /> 1113 Constitutional Ave.,
              <br /> Central Business District, Abuja <br />
              Nigeria.
            </address>
          </div>
          <div className="flex flex-row justify-center gap-2">
            <Icon icon="carbon:location-filled" className="text-red-500" />
            <address className="text-xs">
              <span className="font-semibold">Lekki Office:</span>
              <br /> 3rd Floor, CAPPA House,
              <br /> 1, Udeco Medical Road,
              <br /> Off Chevron Drive, <br />
              By Chevy View Estate, Lekki, Lagos
              <br /> Nigeria.
            </address>
          </div>
          <div className="flex flex-row justify-center gap-2">
            <Icon icon="carbon:location-filled" className="text-red-500" />
            <address className="text-xs">
              <span className="font-semibold">Enugu Office:</span>
              <br /> Centers 57 & 59,
              <br /> Palms Polo Park Mall,
              <br /> Abakaliki Road, Enugu,
              <br /> Nigeria.
            </address>
          </div>
          <div className="flex flex-row justify-center gap-2">
            <Icon icon="carbon:location-filled" className="text-red-500" />
            <address className="text-xs">
              <span className="font-semibold">
                East Africa Regional Office:
              </span>
              <br />
              Pearle Heaven, House B7,
              <br /> Westlands Avenue,
              <br /> Off Rhapta Road,
              <br /> Westlands, Nairobi
              <br /> Kenya.
            </address>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-items-center mx-auto w-full justify-center gap-6">
          <div className="flex flex-row justify-center gap-3">
            <Icon icon="uil:phone" className="text-red-500 text-xl mt-auto" />
            <p>+234 (0) 1 330 3100 </p>
          </div>
          <div className="flex flex-row justify-center gap-3">
            <Icon icon="logos:whatsapp-icon" className="mt-auto text-xl" />
            <p> +234 811 260 2069 </p>
          </div>
          <div className="flex flex-row justify-center gap-3">
            <Icon
              icon="mingcute:mail-line"
              className="text-red-500 mt-auto text-xl"
            />
            <p>Corporateplanning@OptivaCP.com</p>
          </div>
          <div className="flex flex-row justify-center gap-3">
            <Icon
              icon="streamline:programming-web-server-world-internet-earth-www-globe-worldwide-web-network"
              className="text-red-500 mt-auto text-xl"
            />
            <p>www.OptivaCP.com</p>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="place-self-end pt-6 flex flex-row gap-7">
        <AppButton label="Cancel" type="button" variant="transparent" />
        <AppButton
          label="Download"
          type="button"
          handleClick={handleDownload}
        />
        <AppButton label="Send" type="submit" />
      </div>
    </div>
  );
};

export default GenerateTemplate;
