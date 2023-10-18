const ContractFirstPage = () => {
  return (
    <div className="border-2 border-gray-200 rounded-md p-5 text-sm sm:text-base sm:px-14 sm:py-16 ">
      <div className="border-2 border-gray-500 flex flex-col px-4 sm:px-8 place-items-center gap-6">
        <div className="flex flex-col place-items-center py-20 sm:py-24 md:py-32 md:gap-32 sm:gap-28 gap-16">
          <p>ENGAGEMENT CONTRACT</p>
          <div className="flex flex-col place-items-center gap-4">
            <p>BETWEEN</p>
            <p className="font-bold">OPTIVA CAPITAL PARTNERS LTD</p>
            <p>AND</p>
          </div>

          <div>
            <div className="flex flex-col place-items-center gap-4 md:gap-2 pb-8 md:pb-10">
              <p className="font-sans italic text-center">
                For the application and processing of{" "}
                <span className="font-bold ">
                  Antigua & Barbuda Citizenship by Investment
                </span>
              </p>
              <p className="font-bold text-base sm:text-lg text-center border-t-2 w-fit pt-1 px-[6vw] border-gray-600">
                Prepared By: Optiva Capital Partners Ltd
              </p>
            </div>
            <div className="flex flex-col place-items-center gap-2">
              <p className="font-bold text-base sm:text-lg">
                For: Optiva Capital Partners
              </p>
              <p className="text-center pb-4 border-b-2 w-fit border-gray-600 ">
                11th -14th floor, Churchgate Towers, Churchgate Street, Victoria
                Island, Lagos
              </p>
            </div>
          </div>
        </div>
        <p className="pb-5">OCP-9-13-000</p>
      </div>
    </div>
  );
};

export default ContractFirstPage;
