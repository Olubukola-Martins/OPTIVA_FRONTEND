import { AppButton } from "src/components/button/AppButton";

interface IProps {
  title: string;
  buttonLabel: string;
  children: React.ReactNode;
}

export const PercentageWrap = ({ buttonLabel, children, title }: IProps) => {
  return (
    <div className="rounded shadow-sm border px-[13px] py-3">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-medium">{title}</h4>
        <AppButton variant="transparent" label={buttonLabel} />
      </div>

      <div className="pb-8 pt-12 px-3">{children}</div>
    </div>
  );
};
