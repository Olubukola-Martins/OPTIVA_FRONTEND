import React from 'react'

const ContractOtherPages = ({ children }: { children :React.ReactNode}) => {
  return (
    <div className="border-2 border-gray-200 rounded-md p-5 text-sm sm:text-base ">
      {children}
    </div>
  );
};

export default ContractOtherPages