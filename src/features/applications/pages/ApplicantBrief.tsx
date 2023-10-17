import "../assets/style.css";
const ApplicantBrief = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10">
      <div className="w-full lg:w-1/2">
        <div className="w-full my-2">
          <h2 className="p-1">
            Which country passport/residency is applicant applying for?
          </h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">Which program is the applicant interested in?</h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Which investment route is the applicant interested in?
          </h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Why is the applicant applying for the program above?
          </h2>
          <p className="applicantDetailsDiv h-24 border rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Has the applicant started a CBI/RBI application previously?
          </h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="w-full my-2">
          <h2 className="p-1">Which Country?</h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Did the Applicant mention a budget amount that they are willing to
            spend?
          </h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">How much is the Applicant willing to invest?</h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Please enter below any other information gleaned from discussion
            with the Applicant
          </h2>
          <p className="applicantDetailsDiv h-20 border rounded-md"></p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantBrief;
