import { IdentifierProps } from "src/types";
import { AppButton } from "../button/AppButton";
import { Modal } from "antd";
import warning from "src/assets/warningIcon.svg";
import { useSignOut } from "react-auth-kit";

export const SignOut = ({ handleClose, open }: IdentifierProps) => {
    const signOut = useSignOut();

  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <div className="text-center">
        <div className="flex justify-center">
          <img src={warning} alt="warning" className="h-12" />
        </div>
        <h3 className="text-lg font-medium text-accent pt-2">Sign out</h3>
        <p className="text-sm text-gray-500 pt-2">
          Are you sure you would like to sign out{" "}
          <br className="lg:flex hidden" /> of your Optiva account?
        </p>
        <div className="flex items-center justify-center gap-3 mt-5">
          <AppButton variant="transparent" label="Sign out" handleClick={() => signOut()}/>
          <AppButton label="Cancel" handleClick={() => handleClose()}/>
        </div>
      </div>
    </Modal>
  );
};
