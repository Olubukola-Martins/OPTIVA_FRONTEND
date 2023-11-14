export const AcademicHistory = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full ">
        <div className="my-2">
          <h2 className="my-3 p-1">School 1</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Course of Study <p className="my-3"> </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Name of Institution <p className="my-3"> </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  City <p className="my-3"> </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Country <p className="my-3"> </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Qualification Obtained </p>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Start date <p className="my-3"> </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 lg:w-[98.5%]">
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  End date <p className="my-3">text </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
