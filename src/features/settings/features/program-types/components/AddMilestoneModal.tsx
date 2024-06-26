import { Form, Input, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { QUERY_KEY_FOR_MILESTONE } from "../hooks/useGetMilestone";
import { usePostMilestone } from "../hooks/usePostMilestone";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import { useGetSingleMilestone } from "../hooks/useGetSingleMilestone";
import { useEffect } from "react";
import { useUpdateMilestone } from "../hooks/useUpdateMilestone";

interface IEditMilestone extends IdentifierProps {
  milestoneId?: number;
}

export const AddMilestoneModal = ({
  handleClose,
  open,
  milestoneId,
}: IEditMilestone) => {
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading, isSuccess } = usePostMilestone();
  const { token } = useGetUserInfo();
  const queryClient = useQueryClient();
  const { data: singleMilestone } = useGetSingleMilestone({
    id: milestoneId as unknown as number,
  });
  const { putData, isLoading: putLoading } = useUpdateMilestone({
    queryKey: QUERY_KEY_FOR_MILESTONE,
  });

  console.log("single milestone", singleMilestone);
  useEffect(() => {
    if (singleMilestone) {
      const { milestone, timeline, processes } = singleMilestone;
      form.setFieldsValue({
        milestone,
        timeline,
        title: processes[0].title,
        duration: processes[0].duration.toString(),
      });

      const newProcesses = processes.slice(1).map((item, index) => ({
        newTitle: item.title,
        newDuration: item.duration.toString(),
        key: index,
      }));

      form.setFieldsValue({
        newProcess: newProcesses,
      });
    }
  }, [singleMilestone]);

  const handleAddProcess = () => {
    const newProcess = form.getFieldValue("newProcess") || [];
    const initialProcess = { processTitle: "", processDuration: "" };
    form.setFieldsValue({ newProcess: [...newProcess, initialProcess] });
  };

  const handleRemoveField = (index: number) => {
    const newProcess = form.getFieldValue("newProcess") || [];
    form.setFieldsValue({
      newProcess: newProcess.filter((_: any, i: number) => i !== index),
    });
  };
  const handleMilestoneSubmit = (val: any) => {
    const milestoneTitle = val.milestone;
    const milestoneTimeline = val.timeline;

    const title = val.title;
    const duration = val.duration;

    const newProcesses =
      val.newProcess?.map((item: any) => ({
        title: item.newTitle,
        duration: item.newDuration,
        duration_type: "days",
      })) || [];

    const processesWithMainFields = [
      {
        title: title,
        duration: duration,
        duration_type: "days",
      },
      ...newProcesses,
    ];

    if (milestoneId) {
      putData(
        milestoneId as number,
        milestoneTitle,
        milestoneTimeline,
        "days",
        processesWithMainFields
      );
      handleClose();
    } else {
      mutate(
        {
          milestone: milestoneTitle,
          processes: processesWithMainFields, 
          timeline: milestoneTimeline,
          token,
          duration_type: "days",
        },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occurred",
              description: error.response?.data?.message ,
              duration: 5,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",
              title: "Success",
              description: res.data.message,
            });
            queryClient.invalidateQueries([QUERY_KEY_FOR_MILESTONE]);
            form.resetFields();
            isSuccess && handleClose();
            handleClose();
          },
        }
      );
    }
  };

  return (
    <>
      <Modal open={open} onCancel={() => handleClose()} footer={null}>
        <h2 className="text-center text-lg font-bold">
          {milestoneId ? "Edit Milestone" : "Add Milestone"}
        </h2>
        <Form
          layout="vertical"
          onFinish={handleMilestoneSubmit}
          form={form}
          requiredMark={false}
          initialValues={{
            newProcess: milestoneId
              ? singleMilestone?.processes.slice(1).map((item) => ({
                  newTitle: item.title,
                  newDuration: item.duration.toString(),
                  key: item.id,
                }))
              : [{ newTitle: "", newDuration: "" }],
          }}
        >
          <Form.Item
            name="milestone"
            label="Milestone"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="timeline"
            label="Timeline (days)"
            rules={textInputValidationRules}
          >
            <Input />
          </Form.Item>

          <h2 className="font-medium text-base">Processes</h2>
          <div>
            <h2 className="p-1">What is the title of the process?</h2>
            <Form.Item name="title" rules={textInputValidationRules}>
              <Input />
            </Form.Item>
          </div>

          <div>
            <h2 className="p-1">
              What is the duration of the process (in days)?
            </h2>
            <Form.Item
              name="duration"
              rules={
                milestoneId ? generalValidationRules : textInputValidationRules
              }
            >
              <Input />
            </Form.Item>
          </div>

          <div>
            <h2 className="pb-5 font-medium text-base">New process</h2>
            <Form.List name="newProcess">
              {(fields) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item
                        {...field}
                        name={[field.name, "newTitle"]}
                        label="What is the title of the process?"
                        rules={textInputValidationRules}
                      >
                        <Input placeholder="Enter process title" />
                      </Form.Item>
                      <div>
                        <Form.Item
                          {...field}
                          name={[field.name, "newDuration"]}
                          label="What is the duration of the process (in days)?"
                          rules={
                            milestoneId
                              ? generalValidationRules
                              : textInputValidationRules
                          }
                        >
                          <Input placeholder="Enter process duration" />
                        </Form.Item>
                        <div className="flex justify-end">
                          <i
                            className="ri-delete-bin-line text-xl cursor-pointer"
                            onClick={() => handleRemoveField(index)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))}

                  <AppButton
                    variant="transparent"
                    label="+ Add process"
                    handleClick={() => handleAddProcess()}
                  />
                </>
              )}
            </Form.List>
          </div>

          <div className="flex items-center justify-center gap-5 mt-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={() => handleClose}
              variant="transparent"
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={milestoneId ? putLoading : postLoading}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};
