export const ChildrenDetails = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full my-2">
            <h2 className="p-1">How many children do you have?</h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
          <div className="w-full my-2">
            <h2 className="p-1">Any Adopted Children?</h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full my-2">
            <h2 className="p-1">Will you be adopting?</h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
          <div className="w-full my-2">
            <h2 className="p-1">
              Will all your children be dependents on your application?
            </h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
        </div>
      </div>
    </>
  );
};
