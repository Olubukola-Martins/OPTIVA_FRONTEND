import React, { useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { appRoute } from "src/config/routeMgt/routePaths";
import ContractFirstPage from "../components/ContractFirstPage";
import { Pagination } from "antd";
import ContractOtherPages from "../components/ContractOtherPages";

const GenerateContract = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allPages: React.ReactElement[] = [<ContractFirstPage />];
  for (let index = 1; index <= 30; index++) {
    allPages.push(
      <ContractOtherPages>
        <div>ContractOtherPages</div>
      </ContractOtherPages>
    );
  }
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };
   const pageToDisplay=allPages[currentPage-1]; 
  return (
    <>
      <PageIntro
        title="A^0B ENGAGEMENT AGREEMENT S1323"
        linkBack={appRoute.payments}
      />
      <div>
        {pageToDisplay}
        <Pagination
          current={currentPage}
          defaultCurrent={1}
          total={allPages.length}
          pageSize={1}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default GenerateContract;
