import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  QUERY_KEY_FOR_MILESTONE,
  useGetMilestone,
} from "../hooks/useGetMilestone";
import { usePostMilestone } from "../hooks/usePostMilestone";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import type { SelectProps } from "antd";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";

export const AddMilestoneModal = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { data: milestoneData } = useGetMilestone();
  const { mutate, isLoading: postLoading } = usePostMilestone();
  const { token } = useGetUserInfo();
  const queryClient = useQueryClient();

  console.log("milestone data", milestoneData);
  //   const handleMilestoneSubmit = (val: any) => {
  //     const processes = val.processes.map((processId: number) => {
  //       const selectedProcess = milestoneData?.flatMap((item) =>
  //         item.processes.find((process) => process.id === processId)
  //       );

  //       return {
  //         title: selectedProcess?.title,
  //         duration: selectedProcess?.duration,
  //         duration_type: selectedProcess?.duration_type,
  //       };
  //     });
  //     mutate({
  //       milestone: val.milestone,
  //       timeline: val.timeline,
  //       processes,
  //       duration_type: val.timeline,
  //       token,
  //     });
  //     console.log("values of form", val);
  //   };

  const handleMilestoneSubmit = (val: any) => {
    const processes = val.processes.map((processId: number) => {
      const selectedProcess = milestoneData?.flatMap((item) =>
        item.processes.find((process) => process.id === processId)
      );

      // Check if selectedProcess is not empty before extracting values
      if (selectedProcess && selectedProcess.length > 0) {
        const item = selectedProcess[0];
        console.log("process item", item);
        return {
          title: item?.title,
          duration: item?.duration,
          duration_type: item?.duration,
        };

      }

      return null;
    });

    console.log("process item");

    // Remove null values from the array
    const filteredProcesses = processes.filter((process) => process !== null);

    mutate({
      milestone: val.milestone,
      timeline: val.timeline,
      processes: filteredProcesses,
      duration_type: val.timeline,
      token,
    });

    console.log("values of form", val);
    // const processes = val.processes
    //   .map((processId: number) => {
    //     const selectedProcess = milestoneData?.flatMap((item) =>
    //       item.processes.find((process) => process.id === processId)
    //     );
    //     return selectedProcess?.map((item) => ({
    //       title: item?.title,
    //       duration: item?.duration,
    //       duration_type: item?.id,
    //     }));
    //   })
    //   .flat();

    // mutate(
    //   {
    //     milestone: val.milestone,
    //     timeline: val.timeline,
    //     processes: [
    //      { title: val.title,
    //         duration: val.duration,
    //       duration_type: val. duration_type}
    //     ],
    //     duration_type: val.timeline,
    //     token,
    //   },
    //   {
    //     onError: (error: any) => {
    //       openNotification({
    //         state: "error",
    //         title: "Error Occured",
    //         description: error.response.data.message,
    //         duration: 5,
    //       });
    //     },
    //     onSuccess: (res: any) => {
    //       openNotification({
    //         state: "success",
    //         title: "Success",
    //         description: res.data.message,
    //       });
    //       queryClient.invalidateQueries([QUERY_KEY_FOR_MILESTONE]);
    //       form.resetFields();
    //     },
    //   }
    // );
  };

  const selectTimeAfter = (
    <Select
      defaultValue="Day(s)"
      options={[
        {
          value: "Day(s)",
          label: "Day(s)",
        },
      ]}
    />
  );

  const processesOptions: SelectProps["options"] =
    milestoneData
      ?.map((item) =>
        item.processes.map((process) => ({
          value: process.id,
          label: process.title,
          key: process.id,
          title: process.title,
          duration: process.duration,
          duration_type: process.duration,
        }))
      )
      .flat() || [];

  console.log("processes option", processesOptions);
  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <h2 className="text-center text-lg font-bold">Add Milestone</h2>
      <Form
        layout="vertical"
        onFinish={handleMilestoneSubmit}
        form={form}
        requiredMark={false}
      >
        <Form.Item name="milestone" label="Milestone" required>
          <Input />
        </Form.Item>
        <Form.Item name="timeline" label="Timeline" required>
          <Input addonAfter={selectTimeAfter} />
        </Form.Item>
        <Form.Item name="processes" label="Processes">
          <Select mode="multiple" allowClear options={processesOptions} />
        </Form.Item>
        <div className="flex items-center justify-center gap-5">
          <AppButton
            label="Cancel"
            type="reset"
            handleClick={() => handleClose}
            variant="transparent"
          />
          <AppButton label="Save" type="submit" isLoading={postLoading} />
        </div>
      </Form>
    </Modal>
  );
};
