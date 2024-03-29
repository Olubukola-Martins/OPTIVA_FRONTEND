import welcomeVector from ".././assets/welcomeVector.svg";
import introBg from ".././assets/introBg.png";
import { useFetchUserProfile } from "src/ExtraSettings/hooks/useFetchUserProfile";

interface IProps {
  title: string;
}

export const Banner = (props: IProps) => {
  const { data: userInfo } = useFetchUserProfile();

  return (
    <div
      className="flex justify-between rounded-lg Container"
      style={{ background: `url(${introBg})` }}
    >
      <div className="text-white flex flex-col justify-center py-4">
        <h2 className="font-semibold text-lg md:text-2xl pb-1">
          Hello {userInfo?.name}!
        </h2>
        <p className="text-sm md:text-base">
          {props.title}{" "}
          <span className={`${props.title ? "pr-2" : "hidden"}`}>-</span>
          Welcome to your dashboard
        </p>
      </div>
      <div className="pt-5 md:flex hidden">
        <img src={welcomeVector} alt="dashboard" />
      </div>
    </div>
  );
};
