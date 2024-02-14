import { Form, Tabs, TabsProps } from "antd";
import { AddFees } from "./AddFees";
import { ProgramFeesBreakdown } from "./ProgramFeesBreakdown";
import { AppButton } from "src/components/button/AppButton";
import { useState } from "react";
import { usePostGrenadaRealEstate } from "../hooks/usePostGrenadaRealEstate";
import { QUERY_KEY_FOR_FEES } from "../hooks/useGetFees";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { usePostGrenadaDonation } from "../hooks/usePostGrenadaDonation";
import { usePostDominicaDonation } from "../hooks/usePostDominicaDonation";
import { usePostAntiguaBarbacudaDonation } from "../hooks/usePostAntiguaBarbacudaDonation";
import { usePostAntiguaSingleRealEstate } from "../hooks/usePostAntiguaSingleRealEstate";
import { usePostAntiguaJointEstate } from "../hooks/usePostAntiguaJointEstate";
import { usePostStKittsNevis } from "../hooks/usePostStKittsNevis";
import { usePostStLucia } from "../hooks/usePostStLucia";

const AddFeesTab = () => {
  const [investmentId, setInvestmentId] = useState<number>();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const {
    mutate: mutateGrenadaRealEstate,
    isLoading: grenadaRealEstateLoading,
  } = usePostGrenadaRealEstate();
  const { mutate: mutateGrenadaDonation, isLoading: grenadaDonationLoading } =
    usePostGrenadaDonation();
  const { mutate: mutateDominicaDonation, isLoading: dominicaDonationLoading } =
    usePostDominicaDonation();
  const {
    mutate: mutateAntiguaBarbacudaDonation,
    isLoading: antiguaBarbacudaLoading,
  } = usePostAntiguaBarbacudaDonation();
  const {
    mutate: mutateAntiguaSingleRealEstate,
    isLoading: antiguaSingleReaLEstateLoading,
  } = usePostAntiguaSingleRealEstate();
  const {
    mutate: mutateAntiguaJointEstate,
    isLoading: antiguaJointEstateLoading,
  } = usePostAntiguaJointEstate();
  const { mutate: mutateStKittsNevis, isLoading: stKittsNevisLoading } =
    usePostStKittsNevis();
  const { mutate: mutateStLucia, isLoading: stLuciaLoading } = usePostStLucia();

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const tabItems: TabsProps["items"] = [
    {
      label: "Fees",
      key: "Fees",
      children: (
        <AddFees
          setInvestmentRoute={setInvestmentId}
          onNext={() => setCurrentTab(currentTab + 1)}
          selectedInvestment={investmentId}
        />
      ),
    },
    {
      label: "Program Fees Breakdown",
      key: "Program Fees Breakdown",
      children: <ProgramFeesBreakdown selectedInvestment={investmentId} />,
      disabled: investmentId === undefined,
    },
  ];

  const handleSubmit = (val: any) => {
    console.log("form values", val);
    switch (investmentId) {
      case 1:
        mutateGrenadaDonation(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
            },
          }
        );
        break;
      case 2:
        mutateGrenadaRealEstate(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      case 3:
        mutateStLucia(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      case 4:
        mutateDominicaDonation(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      case 5:
        mutateStKittsNevis(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      case 6:
        mutateAntiguaBarbacudaDonation(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      case 7:
        mutateAntiguaSingleRealEstate(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      case 8:
        mutateAntiguaJointEstate(
          {
            ...val,
          },
          {
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
              form.resetFields();
              queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
              // setInvestmentId(undefined);
            },
          }
        );
        break;
      default:
        null;
        break;
    }
  };

  return (
    <>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Tabs
          activeKey={currentTab.toString()}
          onChange={(key) => setCurrentTab(Number(key))}
        >
          {tabItems.map((tab, index) => (
            <Tabs.TabPane tab={tab.label} key={index.toString()}>
              {tab.children}
              {index === tabItems.length - 1 && (
                <div className="flex items-center justify-end gap-4 mt-5">
                  <AppButton
                    label="Cancel"
                    type="reset"
                    variant="transparent"
                  />
                  <AppButton
                    label="Save"
                    type="submit"
                    isLoading={
                      grenadaRealEstateLoading ||
                      grenadaDonationLoading ||
                      dominicaDonationLoading ||
                      antiguaBarbacudaLoading ||
                      antiguaSingleReaLEstateLoading ||
                      antiguaJointEstateLoading ||
                      stKittsNevisLoading ||
                      stLuciaLoading
                    }
                  />
                </div>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form>
    </>

    // <Form
    //   layout="vertical"
    //   onFinish={handleSubmit}
    //   requiredMark={false}
    //   form={form}
    // >
    //   <Tabs items={tabItems} />

    // <div className="flex items-center justify-end gap-4 mt-5">
    //   <AppButton label="Cancel" type="reset" variant="transparent" />
    //   <AppButton
    //     label="Save"
    //     type="submit"
    //     isLoading={
    //       grenadaRealEstateLoading ||
    //       grenadaDonationLoading ||
    //       dominicaDonationLoading ||
    //       antiguaBarbacudaLoading ||
    //       antiguaSingleReaLEstateLoading ||
    //       antiguaJointEstateLoading ||
    //       stKittsNevisLoading ||
    //       stLuciaLoading
    //     }
    //   />
    // </div>
    // </Form>
  );
};

export default AddFeesTab;
