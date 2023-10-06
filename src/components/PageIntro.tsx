import { Link } from "react-router-dom";
import { pageIntroProps } from "src/types";

export const PageIntro = ({ description, linkBack, title }: pageIntroProps) => {
  return (
    <div className="my-5 text-accent">
      <h3 className="flex items-center gap-x-2 font-semibold text-xl">
        <Link to={linkBack || "/"}>
          <i className="ri-arrow-left-line cursor-pointer hover:text-secondary"></i>
        </Link>
        <span>{title}</span>
      </h3>
      {description && <p className="text-sm pt-1 pl-7">{description}</p>}
    </div>
  );
};
