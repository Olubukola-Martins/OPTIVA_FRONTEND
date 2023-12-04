import { Form, Input, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  QUERY_KEY_FOR_MILESTONE,
  useGetMilestone,
} from "../hooks/useGetMilestone";
import { usePostMilestone } from "../hooks/usePostMilestone";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";


export const AddMilestoneModal = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } = usePostMilestone();
  const { token } = useGetUserInfo();
  const queryClient = useQueryClient();
  const { data: milestoneData } = useGetMilestone();
  console.log("milestone data", milestoneData);

  // ADD MORE PROCESS
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
    console.log("valuues of form", val);
    const milestoneTitle = val.milestone;
    const milestoneTimeline = val.timeline;
    const processes = val.newProcess?.map((item: any) => ({
      title: item.newTitle,  
      duration: item.newDuration,  
      duration_type: "days",
    })) || [];
  
    mutate(
      {
        milestone: milestoneTitle,
        processes,
        timeline: milestoneTimeline,
        token,
        duration_type: "days",
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response?.data?.message || "Unknown error",
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
          // form.resetFields();
        },
      }
    );
  };


  return (
    <>
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
          <Form.Item name="timeline" label="Timeline (days)" required>
            <Input />
          </Form.Item>

          <h2>Processes</h2>
          <div>
            <h2 className="p-1">What is the title of the process?</h2>
            <Form.Item name="title">
              <Input />
            </Form.Item>
          </div>

          <div>
            <h2 className="p-1">What is the duration of the process?</h2>
            <Form.Item name="duration">
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
                      >
                        <Input placeholder="Enter process title" />
                      </Form.Item>
                      <div>
                        <Form.Item
                          {...field}
                          name={[field.name, "newDuration"]}
                          label="What is the duration of the process?"
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
            <AppButton label="Save" type="submit" isLoading={postLoading} />
          </div>

        
        </Form>
      </Modal>
    </>
  );
};
