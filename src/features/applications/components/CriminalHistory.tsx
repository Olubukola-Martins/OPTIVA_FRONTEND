export const CriminalHistory = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10">
      <div className="w-full lg:w-1/2">
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant or spouse ever been convicted of a crime in any
            country? If yes, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant or spouse ever been charged with or arrested for a
            crime in any country? If yes, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Has the Applicant, a family member or a business partner been tried
            or convicted of money laundering charges? If “Yes”, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant or spouse ever committed a criminal or civil offence
            for which you were convicted and sentenced to detention, probation
            or a term of imprisonment? If “Yes”, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant or spouse ever testified before a grand jury or
            investigative hearing or probe? If “Yes”, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant or your spouse ever received a pardon for any criminal
            offence? If yes, please explain and include the date, city, county,
            state & country in which you received your pardon
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant or spouse ever been the subject of any criminal
            investigation? If “Yes”, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            The Applicant Has been under investigation by a tax
            authority/professional regulatory body? If “Yes”, please explain
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
        <div className="w-full my-2">
          <h2 className="p-1">
            Please explain any issues you feel are pertinent to your application
          </h2>
          <p className="applicantDetailsDiv h-20 rounded-md"></p>
        </div>
      </div>
    </div>
  );
};
