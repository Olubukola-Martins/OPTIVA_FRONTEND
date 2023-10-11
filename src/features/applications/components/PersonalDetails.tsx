import "../assets/style.css";
export const PersonalDetails = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10">
      <div className="w-full lg:w-1/2">
        <div className="w-full my-2">
          <h2 className="p-1">Title</h2>
          <p className="applicantDetailsSinglePTag"></p>
        </div>
        <div className="my-2">
          <h2 className="my-3 p-1">Name(s)</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag"> First Name</p>
              </div>
              <div className="lg:w-1/2">
                <p className="applicantDetailsPTag"> Middle Name</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <p className="applicantDetailsPTag"> Middle Name (2)</p>
              </div>
              <div className="w-1/2">
                <p className="applicantDetailsPTag"> Last Name</p>
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
