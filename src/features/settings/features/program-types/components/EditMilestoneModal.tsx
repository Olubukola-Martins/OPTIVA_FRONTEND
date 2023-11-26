import { Form, Input, Modal, Select } from 'antd'
import { AppButton } from 'src/components/button/AppButton'
import { IdentifierProps } from 'src/types'

export const EditMilestoneModal = ({ handleClose, open }: IdentifierProps) => {
    const [form] = Form.useForm()
    const handleMilestoneSubmit = () => { }
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
  return (
    <Modal
    open={open} onCancel={() => handleClose()} footer={null}
      >
        <h2 className="text-center text-lg font-bold">Edit Milestone</h2>
        <Form layout="vertical" onFinish={handleMilestoneSubmit} form={form} requiredMark={false}>
          <Form.Item name="milestone" label="Milestone" required>
            <Input size="large" />
          </Form.Item>
          <Form.Item name="timeline" label="Timeline" required>
            <Input size="large" addonAfter={selectTimeAfter} />
          </Form.Item>
          <Form.Item name="processes" label="Processes">
            <Select
              size="large"
              options={[
                {
                  label: "",
                  value: "",
                },
              ]}
            />
          </Form.Item>
          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              handleClick={()=>handleClose}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
  )
}
