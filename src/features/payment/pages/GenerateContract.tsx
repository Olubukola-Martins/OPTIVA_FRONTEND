import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import ContractFirstPage from "../components/ContractFirstPage";
import { Pagination } from "antd";
import ContractOtherPages from "../components/ContractOtherPages";
import { AppButton } from "src/components/button/AppButton";

const GenerateContract = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allPages: React.ReactElement[] = [<ContractFirstPage />];
  for (let index = 1; index <= 3; index++) {
    allPages.push(
      <ContractOtherPages>
        <div className="flex flex-col flex-wrap gap-5 sm:gap-7 ">
          <p className="font-semibold">
            THIS AGREEMENT is made on this _________________________ day
            _________________________ 20_________
          </p>
          <p className="font-semibold">BETWEEN</p>
          <p className="break-words">
            OPTIVA CAPITAL PARTNERS LTD, an INVESTMENT IMMIGRATION ADVISORY
            FIRM, incorporated under the laws of The Federal Republic of Nigeria
            and has its registered address at{" "}
            <span className="font-semibold">
              11th - 14th Floor, Churchgate Towers 2, PC 30, Churchgate Street,
              Victoria Island, Lagos, Nigeria
            </span>
            (hereinafter referred to as “OPTIVA”) which expression shall where
            the context so admits include its legal representative and assigns
            of the one part;
          </p>
          <p className="font-semibold">AND</p>
          <p className="break-all">
            ________________________________________, of
            _________________________________________________
            __________________________________________________, hereinafter
            referred to as “the Client” which expression shall where the context
            so admits include its legal representative and assigns of the{" "}
            <span className="font-semibold">OTHER PART.</span>
          </p>
          <p className="font-semibold">WHEREAS:</p>
          <ol className="flex flex-col gap-4 list-decimal">
            <li>
              {" "}
              “OPTIVA” a company engaged in Marketing, Management, Sales, VISA
              application consulting, investment immigration processing,
              financial analysis, and General Immigration Services in
              association with{" "}
              <span className="font-semibold">Client Referrals</span>, a company
              incorporated in Antigua & Barbuda whose registered office is at{" "}
              <span className="font-semibold">
                1100-1200, McGill College Avenue, Montreal, Quebec, H3B 4G7,
                Canada
              </span>
              , hereinafter referred to as ‘Client Referrals’ collaborates and
              agrees to offer immigration consultancy services and real estate
              investment services to interested applicants (within and outside
              Nigeria) who aspire to attain Antigua & Barbuda citizenship under
              the current{" "}
              <span className="font-semibold">
                Antigua & Barbuda Citizenship by Investment Program
              </span>
              rules as outlined in Article 1 below.
            </li>
            <li>
              OPTIVA shall, by way of marketing & sales, identify suitably
              qualified applicants and, after ensuring fulfillment of the basic
              requirements by clients, forward same to JPCS to continue and
              complete the immigration-related services under the current
              <span className="font-semibold">
                Antigua & Barbuda Citizenship by Investment Program
              </span>{" "}
              rules as outlined in{" "}
              <span className="font-semibold">Article 1 below</span>.
            </li>
            <li>
              OPTIVA and the Client agree that these rules may be subject to
              change without notice and dependent upon the applicable Antigua &
              Barbuda government legislation at the time.
            </li>
          </ol>
        </div>
      </ContractOtherPages>
    );
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const pageToDisplay = allPages[currentPage - 1];
  return (
    <>
      <PageIntro
        title="A^0B ENGAGEMENT AGREEMENT S1323"
        linkBack={appRoute.payments}
      />
      {pageToDisplay}
      <div className="flex flex-row justify-between pt-7 md:pt-10">
        <Pagination
          current={currentPage}
          defaultCurrent={1}
          total={allPages.length}
          pageSize={1}
          onChange={handlePageChange}
        />
        <div className="flex flex-row gap-4 md:gap-6">
          <AppButton variant="transparent" label="Cancel" />{" "}
          <AppButton label="Send" />
        </div>
      </div>
    </>
  );
};

export default GenerateContract;
