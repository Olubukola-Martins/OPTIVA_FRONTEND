import { Form, Skeleton, Tabs } from "antd";
import { AddFees } from "./AddFees";
import { ProgramFeesBreakdown } from "./ProgramFeesBreakdown";
import { AppButton } from "src/components/button/AppButton";
import type { TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleFee } from "../hooks/useGetSingleFee";
import { useGetInvestmentRoute } from "../../investment/hooks/useGetInvestmentRoute";
import { useUpdateAntiguaDonation } from "../hooks/useUpdateAntiguaDonation";
import { useUpdateGrenadaEstate } from "../hooks/useUpdateGrenadaEstate";
import { useUpdateGrenadaDonation } from "../hooks/useUpdateGrenadaDonation";
import { useUpdateAntiguaJointEstate } from "../hooks/useUpdateAntiguaJointEstate";
import { useUpdateAntiguaSingleEstate } from "../hooks/useUpdateAntiguaSingleEstate";
import { useUpdateStKitts } from "../hooks/useUpdateStKitts";
import { useUpdateStLucia } from "../hooks/useUpdateStLucia";
import { useUpdateDominicaDonation } from "../hooks/useUpdateDominicaDonation";

export const EditFeesTab = () => {
  const [investmentId, setInvestmentId] = useState<number>();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: investmentData } = useGetInvestmentRoute();
  const [currentTab, setCurrentTab] = useState<number>(0);

  // SINGLE GET REQUESTS
  const { data: singleFeeData, isLoading } = useGetSingleFee({
    id: id as unknown as number,
  });
  const [countryId, setCountryId] = useState<number | undefined>();
  const [investId, setInvestId] = useState<number | undefined>();

  // PUT REQUESTS
  const { putData: antiguaDonationPutData, isLoading: antiguaDonationLoading } =
    useUpdateAntiguaDonation();
  const { putData: grenadaDonationPutData, isLoading: grenadaDonationLoading } =
    useUpdateGrenadaDonation();
  const { putData: grenadaEstatePutData, isLoading: grenadaEstateLoading } =
    useUpdateGrenadaEstate();
  const {
    putData: antiguaSingleEstatePutData,
    isLoading: antiguaSingleEstateLoading,
  } = useUpdateAntiguaSingleEstate();
  const {
    putData: antiguaJointEstatePutData,
    isLoading: antiguaJointEstateLoading,
  } = useUpdateAntiguaJointEstate();
  const { putData: stKittsPutData, isLoading: stKittsLoading } =
    useUpdateStKitts();
  const { putData: stLuciaPutData, isLoading: stLuciaLoading } =
    useUpdateStLucia();
  const { putData: dominicaPutData, isLoading: dominicaLoading } =
    useUpdateDominicaDonation();

  // GET COUNTRY AND INVESTMENT NAME
  const getInvestmentName = (investmentId?: number) => {
    const investment = investmentData?.find((item) => item.id === investmentId);
    if (investment) {
      return investment.investment_name;
    }
  };
  const getCountryName = (countryId?: number) => {
    const country = investmentData?.find(
      (item) => item.country_id === countryId
    );
    if (country) {
      return country.country.country_name;
    }
  };

  // SET FORM VALUES
  useEffect(() => {
    if (singleFeeData) {
      const investmentRouteName = getInvestmentName(
        singleFeeData.investment_route_id
      );
      const countryName = getCountryName(singleFeeData.country_id);

      setCountryId(singleFeeData.country_id);
    
      setInvestId(singleFeeData.investment_route_id);
    
      if (singleFeeData?.grenada_donation_fee) {
        setInvestmentId(1);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.grenada_donation_fee,
          country_id: countryName,
          investment_route_id: investmentRouteName,
        });
      } else if (singleFeeData?.grenada_real_estate_fee) {
        setInvestmentId(2);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.grenada_real_estate_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      } else if (singleFeeData?.st_lucia_nefi_real_estate_fee) {
        setInvestmentId(3);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.st_lucia_nefi_real_estate_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      } else if (singleFeeData?.dominica_donation_fee) {
        setInvestmentId(4);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.dominica_donation_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      } else if (singleFeeData?.st_kitts_nevis_real_estate_fee) {
        setInvestmentId(5);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.st_kitts_nevis_real_estate_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      } else if (singleFeeData?.antigua_donation_fee) {
        setInvestmentId(6);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.antigua_donation_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      } else if (singleFeeData?.antigua_single_real_estate_fee) {
        setInvestmentId(7);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.antigua_single_real_estate_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      } else if (singleFeeData?.antigua_joint_real_estate_fee) {
        setInvestmentId(8);
        form.setFieldsValue({
          ...singleFeeData,
          ...singleFeeData.antigua_joint_real_estate_fee,
          investment_route_id: investmentRouteName,
          country_id: countryName,
        });
      }
    }
  }, [singleFeeData]);

  // TAB ITEMS
  const tabItems: TabsProps["items"] = [
    {
      label: "Fees",
      key: "Fees",
      children: (
        <AddFees
          setInvestmentRoute={setInvestmentId}
          selectedInvestment={investmentId}
          onNext={() => setCurrentTab(currentTab + 1)}
        />
      ),
    },
    {
      label: "Program Fees Breakdown",
      key: "Program Fees Breakdown",
      children: <ProgramFeesBreakdown selectedInvestment={investmentId} />,
    },
  ];

  // UPDATE FORM VALUES
  const handleSubmit = (val: any) => {
    const formData = {
      ...val,
      country_id: countryId,
      investment_route_id: investId,
    };
    switch (investmentId) {
      case 1:
        grenadaDonationPutData({
          id,
          ...formData,
        });
        break;
      case 2:
        grenadaEstatePutData({
          id,
          ...formData,
        });
        break;
      case 3:
        stLuciaPutData({
          id,
          ...formData,
        });
        break;
      case 4:
        dominicaPutData({
          id,
          ...formData,
        });
        break;
      case 5:
        stKittsPutData({
          id,
          ...formData,
        });
        break;
      case 6:
        antiguaDonationPutData({
          id,
          ...formData,
        });
        break;
      case 7:
        antiguaSingleEstatePutData({
          id,
          ...formData,
        });
        break;
      case 8:
        antiguaJointEstatePutData({
          id,
          ...formData,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Skeleton active loading={isLoading}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        form={form}
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
                      antiguaDonationLoading ||
                      antiguaJointEstateLoading ||
                      antiguaSingleEstateLoading ||
                      grenadaEstateLoading ||
                      grenadaDonationLoading ||
                      stKittsLoading ||
                      stLuciaLoading ||
                      dominicaLoading
                    }
                  />
                </div>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
       
      </Form>
    </Skeleton>
  );
};
