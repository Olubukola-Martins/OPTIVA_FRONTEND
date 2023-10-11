export const EmploymentDetails = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10">
      <div className="w-full lg:w-1/2">
        <h2 className="font-bold">Employment</h2>
        <div className="my-2">
          <h2 className="my-3 p-1">Employment 1</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Job Title</p>
              </div>
              <div className="lg:w-1/2">
                <p className="applicantDetailsPTag">Name of Employer </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Nature of Business</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag">Apt/Floor/Suite</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Street</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag">State</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Country</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag">Zip/Postcode</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Website</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag">Phone Number</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Start of Employment</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag">End of employment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full my-2">
          <h2 className="p-1">Gender</h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="my-2">
          <h2 className="my-3 p-1">Birth Details</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag"> Date of Birth</p>
              </div>
              <div className="lg:w-1/2">
                <p className="applicantDetailsPTag"> Country of Birth</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag"> State of Birth</p>
              </div>
              <div className="lg:w-1/2">
                <p className="applicantDetailsPTag"> LGA of Birth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="my-2">
          <h2 className="my-3 p-1">Physical Attributes</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Height</p>
              </div>
              <div className="lg:w-1/2">
                <p className="applicantDetailsPTag">Weight</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag"> Eye Colour</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag">Hair Colour</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">
                  Distinguishing Facial Marks
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-2">
          <h2 className="my-3 p-1">Language</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag">Native Language</p>
              </div>
              <div className="lg:w-1/2">
                <p className="applicantDetailsPTag">Speak fluently</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
