import { AppButton } from "src/components/button/AppButton";

export const Others = () => {
  return (
    <div className=" p-4 ">
      <div className="w-full my-2">
        <h2 className="p-1">
          Please enter below any other information gleaned from discusion with
          the Applicant
        </h2>
        <p className="applicantDetailsDiv h-48 rounded-md"></p>
      </div>
      <div className="w-full flex justify-end py-3">
        <AppButton label="Previous" variant="transparent" />
      </div>
    </div>
  );
};
