import { Form, Input, Modal } from "antd";
import { ModalProps } from "antd/lib";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect,  useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { textInputValidationRules } from "src/utils/formHelpers/validations";
import useAddMeetingCategory from "../hooks/useAddMeetingCategory";
import { openNotification } from "src/utils/notification";
import {
  meetingCategoriesUrl,
  QUERY_KEY_MEETING_CATEGORIES,
} from "../pages/MeetingCategories";
import { useQueryClient } from "react-query";
import useEditMeetingCategory from "../hooks/useEditMeetingCategory";
import { IMeetingCategoryDatum } from "../types/types";

interface IProps extends ModalProps {
  newCategory?: boolean;
  isShowModal: boolean;
  currentCategoryId: number;
  handleShowModal: (val: boolean) => void;
  currentCategoryData?: IMeetingCategoryDatum; 

}

interface INewMeetingCateg {
  name: string;
  description?: string;
}
interface IEditMeetingCat {
  id: number;
  name: string;
  description: string;
  _method: "PUT";
}

const MeetingCategoryModal = ({
  newCategory = true,
  isShowModal,
  currentCategoryId,
  handleShowModal,
  currentCategoryData,  ...restModalProps

}: IProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentEditCatId, setCurrentEditCatId] = useState<number>(0);
  const [modalForm] = useForm();
  const { isLoading, mutate: mutateForNew } = useAddMeetingCategory();
  const { isLoading: editLoading, mutate: mutateForEdit } =
    useEditMeetingCategory();
  const queryClient = useQueryClient();


  useEffect(() => {
    setShowModal(isShowModal);
  }, [isShowModal]);

  useEffect(() => {
    if (currentCategoryData && !newCategory) {
      const singleData = currentCategoryData;
      const { name, description } = singleData;
      const fetchedData = {
        categoryName: name,
        description,
      };
      modalForm.setFieldsValue(fetchedData);
    }

    setCurrentEditCatId(currentCategoryId);
  }, [currentCategoryId,currentCategoryData]);

  const handleMeetingCategory = (
    newData: INewMeetingCateg | IEditMeetingCat
  ) => {
    const notifiationError = (error: any) => {
      openNotification({
        state: "error",
        title: "Error Occured",
        description: error.response.message,
        duration: 5,
      });
    };
    const notificationSuccess = (response: any) => {
      openNotification({
        state: "success",
        title: "Success",
        duration: 5,
        description: response.message,
      });
    };
    newCategory
      ? mutateForNew(
          { newData, url: meetingCategoriesUrl },
          {
            onError: (error: any) => {
              notifiationError(error);
            },
            onSuccess: (response: any) => {
              notificationSuccess(response);
              setShowModal(false);
              modalForm.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_MEETING_CATEGORIES]);
            },
          }
        )
      : mutateForEdit(
          { id: currentEditCatId, newData, url: meetingCategoriesUrl },
          {
            onError: (error: any) => {
              notifiationError(error);
            },
            onSuccess: (response: any) => {
              notificationSuccess(response);
              setShowModal(false);
              handleShowModal(false);
              modalForm.resetFields();
              queryClient.refetchQueries([
                QUERY_KEY_MEETING_CATEGORIES,
              ]);
            },
          }
        );
  };
  const onFinish = (val: { categoryName: string; description: string }) => {
    handleMeetingCategory(
      newCategory
        ? { name: val.categoryName, description: val.description }
        : {
            name: val.categoryName,
            description: val.description,
            id: currentEditCatId,
            _method: "PUT",
          }
    );
  };

  return (
    <Modal
      open={showModal}
      afterOpenChange={()=>{}}
      title={`${
        newCategory ? "Add Meeting Category" : "Edit Meeting Category"
      }`}
      footer={null}
      onCancel={() => {
        setShowModal(false);
        handleShowModal(false);
      }}
    afterClose={()=>modalForm.resetFields()}
      {...restModalProps}
    >
      <Form
        layout="vertical"
        onFinish={(val) => onFinish(val)}
        form={modalForm}
      >
        <Form.Item
          label={"Category Name"}
          name={"categoryName"}
          rules={textInputValidationRules}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label={"Description"} name={"description"}>
          <TextArea></TextArea>
        </Form.Item>
        <div className="flex justify-center mx-auto gap-4 mt-10 mb-3">
          <AppButton variant="transparent" label="Cancel" />
          <AppButton
            label="Save"
            type="submit"
            isLoading={isLoading || editLoading}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default MeetingCategoryModal;
