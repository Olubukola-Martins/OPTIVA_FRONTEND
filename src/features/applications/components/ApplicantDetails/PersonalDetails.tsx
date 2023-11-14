import "../../assets/style.css";
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
                <div className="applicantDetailsPTag">
                  First Name
                  <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  {" "}
                  Middle Name
                  <p className="my-3">text </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  {" "}
                  Middle Name (2)
                  <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  {" "}
                  Last Name <p className="my-3">text </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full my-2">
          <h2 className="p-1">Gender</h2>
          <div className="applicantDetailsSinglePTag py-2 px-4">text</div>
        </div>
        <div className="my-2">
          <h2 className="my-3 p-1">Birth Details</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Date of Birth
                  <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Country of Birth <p className="my-3">text </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  State of Birth <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  LGA of Birth <p className="my-3">text </p>
                </div>
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
                <div className="applicantDetailsPTag">
                  Height <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Weight <p className="my-3">text </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Eye Colour <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Hair Colour <p className="my-3">text </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Distinguishing Facial Marks
                  <p className="my-3">text </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-2">
          <h2 className="my-3 p-1">Language</h2>
          <div className="flex flex-col gap-5 my-2">
            <div className="flex flex-col lg:flex-row gap-5 w-full ">
              <div className=" lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Native Language <p className="my-3">text </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="applicantDetailsPTag">
                  Speak fluently <p className="my-3"> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
