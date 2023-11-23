import { Select } from "antd";
import { useFetchBranches } from "src/features/settings/features/branch/hooks/useFetchBranches";
import { useSwitchBranch } from "../hooks/useSwitchBranch";
import { openNotification } from "src/utils/notification";
import { useFetchCurrentBranch } from "../hooks/useFetchCurrentBranch";

export const CurrentBranch = () => {
  const { data: branchData, isLoading: loadBrach } = useFetchBranches();
  const { mutate } = useSwitchBranch();
  const { data } = useFetchCurrentBranch();

  const handleSelect = (val: number) => {
    mutate(val, {
      onError: (err: any) => {
        openNotification({
          title: "Error",
          state: "error",
          description: err.response.data.message,
          duration: 8.0,
        });
      },

      onSuccess: (res: any) => {
        openNotification({
          title: "Success",
          state: "success",
          description: res.data.message,
          duration: 6.0,
        });
        window.location.reload();
      },
    });
  };
  return (
    <Select
      loading={loadBrach}
      value={data?.current_branch_id}
      options={branchData?.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
      style={{
        borderRadius: "7px",
        // border: "1.5px solid var(--app-color-primary)",
        width: "150px",
      }}
      className="lg:flex hidden"
      onSelect={(val) => handleSelect(val)}
    />
  );
};
