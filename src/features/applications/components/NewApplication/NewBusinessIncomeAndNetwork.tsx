import { Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";

type DataSourceItem = {
  key: React.Key;
  totalCashUSD: string;
  totalCashNaira: string;
  checkingAccountUSD: string;
  checkingAccountNaira: string;
  savingsAccountUSD: string;
  savingsAccountNaira: string;
  totalInvestmentsUSD: string;
  totalInvestmentsNaira: string;
  stocksUSD: string;
  stocksNaira: string;
  bondUSD: string;
  bondNaira: string;
  mutualFundsUSD: string;
  mutualFundsNaira: string;
  // others: string;
  // totalOthers: string;
  privatelyHeldCompanyInterestsUSD:string;
  privatelyHeldCompanyInterestsNaira: string;
  realEstateUSD: string;
  realEstateNaira: string;
  retirementAccountsUSD: string;
  retirementAccountsNaira: string;
  inheritanceUSD: string;
  inheritanceNaira: string;
  giftUSD: string;
  giftNaira: string;
  // othersAssetsUSD: string;
  // othersAssetsNaira: string;
  totalAssetsUSD: string;
  totalAssetsNaira: string;
  totalLiabilitiesUSD: string;
  totalLiabilitiesNaira: string;
  shortTermLiabilitiesUSD: string;
  shortTermLiabilitiesNaira: string;
  longTermLiabilitiesUSD: string;
  longTermLiabilitiesNaira: string;
  networthUSD: string;
  networthNaira: string;
};

export const NewBusinessIncomeAndNetwork = () => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editApplicantData, setEditApplicantData] = useState<any | null>(null);

  const [form] = Form.useForm();

  //  Add more business
  const handleAddBusinessField = () => {
    const newBusiness = form.getFieldValue("newMilitary") || [];
    const initialBusiness = {
      branchOfService: "",
      country: "",
      rank: "",
      unitNumber: "",
      militaryTimePeriod: "",
      commandingOfficer: "",
      commandingOfficerTwo: "",
      commandingOfficerThree: "",
      commandingOfficerFour: "",
      activeCombatDate: "",
      location: "",
      activeCombatDateTwo: "",
      locationTwo: "",
      activeCombatDateThree: "",
      locationThree: "",
    };
    form.setFieldsValue({ newBusiness: [...newBusiness, initialBusiness] });
  };

  const handleRemoveBusinessField = (index: number) => {
    const newBusiness = form.getFieldValue("newBusiness") || [];
    form.setFieldsValue({
      newBusiness: newBusiness.filter((_: any, i: number) => i !== index),
    });
  };

  const onAddNewDetail = () => {
    setIsEditing(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      totalCashUSD: "",
      totalCashNaira: "",
      checkingAccountUSD: "",
      checkingAccountNaira: "",
      savingsAccountUSD: "",
      savingsAccountNaira: "",
      totalInvestmentsUSD: "",
      totalInvestmentsNaira: "",
      stocksUSD: "",
      stocksNaira: "",
      bondUSD: "",
      bondNaira: "",
      mutualFundsUSD: "",
      mutualFundsNaira: "",
      others: "",
      totalOthers: "",
      privatelyHeldCompanyInterestsUSD: "",
      privatelyHeldCompanyInterestsNaira: "",
      realEstateUSD: "",
      realEstateNaira: "",
      retirementAccountsUSD: "",
      retirementAccountsNaira: "",
      inheritanceUSD: "",
      inheritanceNaira: "",
      giftUSD: "",
      giftNaira: "",
      // othersAssetsUSD: "",
      // othersAssetsNaira: "",
      totalAssetsUSD: "",
      totalAssetsNaira: "",
      totalLiabilitiesUSD: "",
      totalLiabilitiesNaira: "",
      shortTermLiabilitiesUSD: "",
      shortTermLiabilitiesNaira: "",
      longTermLiabilitiesUSD: "",
      longTermLiabilitiesNaira: "",
      networthUSD: "",
      networthNaira: "",
    };
    setDataSource((pre) => {
      return [...pre, newDetails];
    });
  };

  const onDeleteDetail = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prev) => {
          return prev.filter((details) => details.key !== record.key);
        });
      },
    });
  };

  const editApplicant = (record: any) => {
    setIsEditing(true);
    setEditApplicantData({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditApplicantData(null);
  };

  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "How much is your total cash newtwork in USD?",
      dataIndex: "totalCashUSD",
      key: "1",
    },
    {
      title: "How much is your total cash networth in Naira?",
      dataIndex: "totalCashNaira",
      key: "2",
    },
    {
      title: "How much is your checking account networth in USD?",
      dataIndex: "checkingAccountUSD",
      key: "3",
    },
    {
      title: "How much is your checking account networth in Naira?",
      dataIndex: "checkingAccountNaira",
      key: "4",
    },
    {
      title: "   How much is your total investments networth in USD?",
      dataIndex: "savingsAccountNaira",
      key: "5",
    },
    {
      title: " How much is your total investments networth in Naira?",
      dataIndex: "savingsAccountNaira",
      key: "6",
    },
    {
      title: " How much is your stocks networth in USD?",
      dataIndex: "stocksUSD",
      key: "7",
    },
    {
      title: " How much is your stocks networth in Naira?",
      dataIndex: "stocksNaira",
      key: "8",
    },
    {
      title: " How much is your bonds networth in USD?",
      dataIndex: "bondsUSD",
      key: "9",
    },
    {
      title: " How much is your bonds networth in Naira?",
      dataIndex: "bondsNaira",
      key: "10",
    },
    {
      title: " How much is your mutual funds networth in USD?",
      dataIndex: "mutuaalFundsUSD",
      key: "11",
    },
    {
      title: " How much is your mutual funds networth in Naira?",
      dataIndex: "mutuaalFundsNaira",
      key: "12",
    },
    {
      title:
        " How much is your privately held company interests networth in USD",
      dataIndex: " privatelyHeldCompanyInterestsUSD",
      key: "13",
    },
    {
      title:
        " How much is your privately held company interests  networth in Naira",
      dataIndex: " privatelyHeldCompanyInterestsNaira",
      key: "14",
    },
    {
      title: " How much is your real estate networth in USD?",
      dataIndex: "realEstateUSD",
      key: "15",
    },
    {
      title: " How much is your real estate networth in Naira?",
      dataIndex: "realEstateNaira",
      key: "16",
    },
    {
      title: " How much are your retirement accounts networth in USD?",
      dataIndex: " retirementAccountsUSD",
      key: "17",
    },
    {
      title: " How much are your retirement accounts networth in Naira?",
      dataIndex: " retirementAccountsNaira",
      key: "18",
    },
    {
      title: " How much is your inheritance networth in USD?",
      dataIndex: "inheritanceUSD",
      key: "19",
    },
    {
      title: " How much is your inheritance networth in Naira?",
      dataIndex: "inheritanceNaira",
      key: "20",
    },
    {
      title: " How much is your gift networth in USD?",
      dataIndex: "giftUSD",
      key: "21",
    },
    {
      title: " How much is your gift networth in Naira?",
      dataIndex: "giftNaira",
      key: "22",
    },
    {
      title: " How much are your total assets networth in USD?",
      dataIndex: "totalAssetsUSD",
      key: "23",
    },
    {
      title: " How much are your total assets networth in Naira?",
      dataIndex: "totalAssetsNaira",
      key: "24",
    },
    {
      title: " How much are your total liabilities networth in USD?",
      dataIndex: "totalLiabilitiesUSD",
      key: "25",
    },
    {
      title: " How much are your short term liabilities networth in USD?",
      dataIndex: "shortTermLiabilitiesUSD",
      key: "27",
    },
    {
      title: " How much are your short term liabilities networth in Naira?",
      dataIndex: "shortTermLiabilitiesNaira",
      key: "28",
    },
    {
      title: " How much are your long term liabilities networth in USD?",
      dataIndex: "longTermLiabilitiesUSD",
      key: "29",
    },
    {
      title: " How much are your long term liabilities networth in Naira?",
      dataIndex: "longTermLiabilitiesNaira",
      key: "30",
    },
    {
      title: " How much is your networth in USD?",
      dataIndex: "networthUSD",
      key: "31",
    },
    {
      title: " How much is your networth in Naira?",
      dataIndex: "networthNaira",
      key: "32",
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <div className="flex gap-5">
            <AppButton
              label="Edit"
              handleClick={() => editApplicant(record)}
              variant="transparent"
            />
            <AppButton
              label="Delete"
              handleClick={() => onDeleteDetail(record)}
              variant="transparent"
            />
          </div>
        );
      },
    },
  ];

  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="US" style={{ width: 100 }}>
      <Option value="US">US</Option>
      <Option value="NG">NG</Option>
    </Select>
  );

  const [directorshipTypeVisible, setDirectorshipTypeVisible] =
    useState<boolean>(false);

  const handleRoleChange = (value: string) => {
    setDirectorshipTypeVisible(value === "Director");
  };
  return (
    <>
      <>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="lg:w-1/2">
            <h2 className="py-4">Business 1</h2>
            <div className="flex gap-4">
              <Form.Item name="nameOfCompany" className="w-full">
                <Input
                  placeholder="Name of Company"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="natureOfBusiness" className="w-full">
                <Input
                  placeholder="Nature of business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="aptFloorSuite" className="w-full">
                <Input
                  placeholder="Apt/Floor/Suite"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="zipPostcode" className="w-full">
                <Input
                  placeholder="Zip/Postcode"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="countryIncorporated" className="w-full">
                <Input
                  placeholder="Country incorporated"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="yearIncorporated" className="w-full">
                <Input
                  placeholder="Year incorporated"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="percentageOwnership" className="w-full">
                <Input
                  placeholder="Percentage ownership"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="companyAnnualIncome" className="w-full">
                <Input
                  placeholder="Company annual income"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="position" className="w-full">
                <Input
                  placeholder="Position in the company"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="companyRole" className="w-full">
                <Select
                  placeholder="Role in the Company"
                  className="w-full"
                  size="large"
                  options={[
                    {
                      value: "Shareholder",
                      label: "Shareholder",
                    },
                    {
                      value: "Director",
                      label: "Director",
                    },
                  ]}
                  onChange={handleRoleChange}
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              {directorshipTypeVisible && (
                <Form.Item name="directorshipType" className="w-full">
                  <Select
                    placeholder="Type of Directorship"
                    className="w-full"
                    size="large"
                    options={[
                      {
                        value: "Type1",
                        label: "Type 1",
                      },
                      {
                        value: "Type2",
                        label: "Type 2",
                      },
                    ]}
                  />
                </Form.Item>
              )}
              {!directorshipTypeVisible && (
                <>
                  <Form.Item name="investmentAmount" className="w-full">
                    <Input
                      placeholder="Amount of your investment"
                      className="w-full"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item name="profitShare" className="w-full">
                    <Input
                      placeholder="Your Share of profits/earnings"
                      className="w-full"
                      size="large"
                    />
                  </Form.Item>
                </>
              )}
              {directorshipTypeVisible && (
                <Form.Item name="annualSalaryReceived" className="w-full">
                  <Input
                    placeholder="Annual Salary Received"
                    className="w-full"
                    size="large"
                  />
                </Form.Item>
              )}
            </div>

            <div className="flex gap-4">
              <Form.Item name="investmentAmount" className="w-full">
                <Input
                  placeholder="Amount of your investment"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="profitShare" className="w-full">
                <Input
                  placeholder="Your Share of profits/earnings"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="countriesOperation" className="w-full">
                <Select
                  placeholder="Countries in Operation"
                  className="w-full"
                  size="large"
                  options={[
                    {
                      value: "Nigeria",
                      label: "Nigeria",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="industry" className="w-full">
                <Input placeholder="Industry" className="w-full" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="website" className="w-full">
                <Input placeholder="Website" className="w-full" size="large" />
              </Form.Item>
              <Form.Item name="companyNumber" className="w-full">
                <InputNumber
                  className="w-full"
                  size="large"
                  addonBefore={selectBefore}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="py-4">Business 2</h2>
            <div className="flex gap-4">
              <Form.Item name="nameOfCompanyTwo" className="w-full">
                <Input
                  placeholder="Name of Company"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="natureOfBusinessTwo" className="w-full">
                <Input
                  placeholder="Nature of business"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="aptFloorSuiteTwo" className="w-full">
                <Input
                  placeholder="Apt/Floor/Suite"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="zipPostcodeTwo" className="w-full">
                <Input
                  placeholder="Zip/Postcode"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="countryIncorporatedTwo" className="w-full">
                <Input
                  placeholder="Country incorporated"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="yearIncorporatedTwo" className="w-full">
                <Input
                  placeholder="Year incorporated"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="percentageOwnershipTwo" className="w-full">
                <Input
                  placeholder="Percentage ownership"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="companyAnnualIncomeTwo" className="w-full">
                <Input
                  placeholder="Company annual income"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="positionTwo" className="w-full">
                <Input
                  placeholder="Position in the company"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="companyRoleTwo" className="w-full">
                <Select
                  placeholder="Role in the Company"
                  className="w-full"
                  size="large"
                  options={[
                    {
                      value: "Role",
                      label: "Role",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="investmentAmountTwo" className="w-full">
                <Input
                  placeholder="Amount of your investment"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="profitShareTwo" className="w-full">
                <Input
                  placeholder="Your Share of profits/earnings"
                  className="w-full"
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="countriesOperationTwo" className="w-full">
                <Select
                  placeholder="Countries in Operation"
                  className="w-full"
                  size="large"
                  options={[
                    {
                      value: "Nigeria",
                      label: "Nigeria",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="industryTwo" className="w-full">
                <Input placeholder="Industry" className="w-full" size="large" />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="websiteTwo" className="w-full">
                <Input placeholder="Website" className="w-full" size="large" />
              </Form.Item>
              <Form.Item name="companyNumberTwo" className="w-full">
                <InputNumber
                  className="w-full"
                  size="large"
                  addonBefore={selectBefore}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div>
          <Form.List name="newMilitary">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <div className="flex flex-col lg:flex-row lg:gap-10">
                      <div className="lg:w-1/2">
                        <h2 className="py-4">Business 1</h2>
                        <div className="flex gap-4">
                          <Form.Item name="nameOfCompany" className="w-full">
                            <Input
                              placeholder="Name of Company"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                          <Form.Item name="natureOfBusiness" className="w-full">
                            <Input
                              placeholder="Nature of business"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item name="aptFloorSuite" className="w-full">
                            <Input
                              placeholder="Apt/Floor/Suite"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                          <Form.Item name="zipPostcode" className="w-full">
                            <Input
                              placeholder="Zip/Postcode"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="countryIncorporated"
                            className="w-full"
                          >
                            <Input
                              placeholder="Country incorporated"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                          <Form.Item name="yearIncorporated" className="w-full">
                            <Input
                              placeholder="Year incorporated"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="percentageOwnership"
                            className="w-full"
                          >
                            <Input
                              placeholder="Percentage ownership"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                          <Form.Item
                            name="companyAnnualIncome"
                            className="w-full"
                          >
                            <Input
                              placeholder="Company annual income"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item name="position" className="w-full">
                            <Input
                              placeholder="Position in the company"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                          <Form.Item name="companyRole" className="w-full">
                            <Select
                              placeholder="Role in the Company"
                              className="w-full"
                              size="large"
                              options={[
                                {
                                  value: "Shareholder",
                                  label: "Shareholder",
                                },
                                {
                                  value: "Director",
                                  label: "Director",
                                },
                              ]}
                              onChange={handleRoleChange}
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          {directorshipTypeVisible && (
                            <Form.Item
                              name="directorshipType"
                              className="w-full"
                            >
                              <Select
                                placeholder="Type of Directorship"
                                className="w-full"
                                size="large"
                                options={[
                                  {
                                    value: "Type1",
                                    label: "Type 1",
                                  },
                                  {
                                    value: "Type2",
                                    label: "Type 2",
                                  },
                                ]}
                              />
                            </Form.Item>
                          )}
                          {!directorshipTypeVisible && (
                            <>
                              <Form.Item
                                name="investmentAmount"
                                className="w-full"
                              >
                                <Input
                                  placeholder="Amount of your investment"
                                  className="w-full"
                                  size="large"
                                />
                              </Form.Item>
                              <Form.Item name="profitShare" className="w-full">
                                <Input
                                  placeholder="Your Share of profits/earnings"
                                  className="w-full"
                                  size="large"
                                />
                              </Form.Item>
                            </>
                          )}
                          {directorshipTypeVisible && (
                            <Form.Item
                              name="annualSalaryReceived"
                              className="w-full"
                            >
                              <Input
                                placeholder="Annual Salary Received"
                                className="w-full"
                                size="large"
                              />
                            </Form.Item>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <Form.Item name="investmentAmount" className="w-full">
                            <Input
                              placeholder="Amount of your investment"
                              className="w-full"
                              size="large"
                              required
                            />
                          </Form.Item>
                          <Form.Item name="profitShare" className="w-full">
                            <Input
                              placeholder="Your Share of profits/earnings"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="countriesOperation"
                            className="w-full"
                          >
                            <Select
                              placeholder="Countries in Operation"
                              className="w-full"
                              size="large"
                              options={[
                                {
                                  value: "Nigeria",
                                  label: "Nigeria",
                                },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item name="industry" className="w-full">
                            <Input
                              placeholder="Industry"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item name="website" className="w-full">
                            <Input
                              placeholder="Website"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item name="companyNumber" className="w-full">
                            <InputNumber
                              className="w-full"
                              size="large"
                              addonBefore={selectBefore}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <h2 className="py-4">Business 2</h2>
                        <div className="flex gap-4">
                          <Form.Item name="nameOfCompanyTwo" className="w-full">
                            <Input
                              placeholder="Name of Company"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item
                            name="natureOfBusinessTwo"
                            className="w-full"
                          >
                            <Input
                              placeholder="Nature of business"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item name="aptFloorSuiteTwo" className="w-full">
                            <Input
                              placeholder="Apt/Floor/Suite"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item name="zipPostcodeTwo" className="w-full">
                            <Input
                              placeholder="Zip/Postcode"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="countryIncorporatedTwo"
                            className="w-full"
                          >
                            <Input
                              placeholder="Country incorporated"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item
                            name="yearIncorporatedTwo"
                            className="w-full"
                          >
                            <Input
                              placeholder="Year incorporated"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="percentageOwnershipTwo"
                            className="w-full"
                          >
                            <Input
                              placeholder="Percentage ownership"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item
                            name="companyAnnualIncomeTwo"
                            className="w-full"
                          >
                            <Input
                              placeholder="Company annual income"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item name="positionTwo" className="w-full">
                            <Input
                              placeholder="Position in the company"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item name="companyRoleTwo" className="w-full">
                            <Select
                              placeholder="Role in the Company"
                              className="w-full"
                              size="large"
                              options={[
                                {
                                  value: "Role",
                                  label: "Role",
                                },
                              ]}
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="investmentAmountTwo"
                            className="w-full"
                          >
                            <Input
                              placeholder="Amount of your investment"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item name="profitShareTwo" className="w-full">
                            <Input
                              placeholder="Your Share of profits/earnings"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item
                            name="countriesOperationTwo"
                            className="w-full"
                          >
                            <Select
                              placeholder="Countries in Operation"
                              className="w-full"
                              size="large"
                              options={[
                                {
                                  value: "Nigeria",
                                  label: "Nigeria",
                                },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item name="industryTwo" className="w-full">
                            <Input
                              placeholder="Industry"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div className="flex gap-4">
                          <Form.Item name="websiteTwo" className="w-full">
                            <Input
                              placeholder="Website"
                              className="w-full"
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item name="companyNumberTwo" className="w-full">
                            <InputNumber
                              className="w-full"
                              size="large"
                              addonBefore={selectBefore}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <i
                      className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                      onClick={() => {
                        handleRemoveBusinessField(index);
                        remove(field.name);
                      }}
                    ></i>
                  </div>
                ))}
  
                <button
                  className="text-[#28A745] py-4"
                  onClick={() => {
                    handleAddBusinessField();
                    add();
                  }}
                >
                  Add More Business(es)
                </button>
              </>
            )}
          </Form.List>
        </div>
        <p className="py-4">
          Most important persons/companies you do business with
        </p>
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="lg:w-1/2">
            <h2 className="py-4">Business 1</h2>
            <div className="flex gap-4">
              <Form.Item name="nameOfPersonBusiness" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="nameOfPersonBusinessTwo" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="nameOfPersonBusinessThree" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="nameOfPersonBusinessFour" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="nameOfPersonBusinessFive" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="nameOfPersonBusinessSix" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="py-4">Business 2</h2>
            <div className="flex gap-4">
              <Form.Item name="nameOfPersonBusinessSeven" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="nameOfPersonBusinessEight" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="nameOfPersonBusinessNine" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="nameOfPersonBusinessTen" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
            <div className="flex gap-4">
              <Form.Item name="nameOfPersonBusinessEleven" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
              <Form.Item name="nameOfPersonBusinessTwelve" className="w-full">
                <Input
                  placeholder="Name of Person/Business"
                  className="w-full"
                  size="large"
                  required
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold py-2">Income & Networth</h2>
          <div className="py-2">
            <AppButton
              label="Add income and network details"
              handleClick={onAddNewDetail}
            />
          </div>
          <div className="p-2 lg:w-[1200px] mx-auto">
            <Table
              columns={columns}
              dataSource={dataSource}
              className="bg-white rounded-md shadow border mt-2 mx-auto"
              scroll={{ x: 200 }}
            />
          </div>
        </div>
        <div className="py-4">
          <h2 className="py-1">
            Did applicant specify others in any of the categories above? If
            “Yes”, please explain, if no leave blank:
          </h2>
          <Form.Item name="applicantSpecify">
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>

        <div className="py-4">
          <h2 className="py-1">
            Source of Income - What is your main source of income?
          </h2>
          <Form.Item name="sourceOfIncome">
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>

        <div className="py-4">
          <h2 className="py-1">
            Gross Income - What is your annual gross income?
          </h2>
          <Form.Item name="grossIncome">
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
        <div className="py-4">
          <h2 className="py-1">Net Income - What is your annual net income?</h2>
          <Form.Item name="netIncome">
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
        <div className="py-4">
          <h2 className="py-1">
            Have Applicant or spouse ever filed for bankruptcy? If “Yes”, please
            explain and include the court date, city, country, state & country
            of the court declaration, if “NO”, leave blank
          </h2>
          <Form.Item name="bankruptcy">
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
        <div className="py-4">
          <h2 className="py-1">
            Have you or your spouse ever been involved personally, or as a
            directory in any bankruptcy, insolvency, or liquidation proceedings?
            If “Yes”, please explain, if “NO”, leave blank
          </h2>
          <Form.Item name="bankruptcyInvolvement">
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
      </>

      <Modal
        open={isEditing}
        footer={null}
        onCancel={() => setIsEditing(false)}
      >
        <h2 className="text-center font-bold py-2 text-lg">
          Edit Income and Networth Details
        </h2>
        <div>
          <h2 className="py-1">How much is your total cash networth in USD?</h2>
          <div>
            <Form.Item name="totalCashUSD">
              <Input
                size="large"
                value={editApplicantData?.totalCashUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalCashUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your total cash networth in Naira?
          </h2>
          <div>
            <Form.Item name="totalCashNaira">
              <Input
                size="large"
                value={editApplicantData?.totalCashNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalCashNaira: <p>{e.target.value}</p>,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your checking account networth in USD?
          </h2>
          <div>
            <Form.Item name="checkingAccountUSD">
              <Input
                size="large"
                value={editApplicantData?.checkingAccountUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    checkingAccountUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your checking account networth in Naira?
          </h2>
          <div>
            <Form.Item name="checkingAccountNaira">
              <Input
                size="large"
                value={editApplicantData?.checkingAccountNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    checkingAccountNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your savings account networth in USD?
          </h2>
          <div>
            <Form.Item name="savingsAccountUSD">
              <Input
                size="large"
                value={editApplicantData?.savingsAccountUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    savingsAccountUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your savings account networth in Naira?
          </h2>
          <div>
            <Form.Item name="savingsAccountUSD">
              <Input
                size="large"
                value={editApplicantData?.savingsAccountNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    savingsAccountNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your total investments networth in USD?
          </h2>
          <div>
            <Form.Item name="totalInvestmentsUSD">
              <Input
                size="large"
                value={editApplicantData?.totalInvestmentsUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalInvestmentsUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your total investments networth in Naira?
          </h2>
          <div>
            <Form.Item name="totalInvestmentsNaira">
              <Input
                size="large"
                value={editApplicantData?.totalInvestmentsNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalInvestmentsNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much is your stocks networth in USD?</h2>
          <div>
            <Form.Item name="stocksUSD">
              <Input
                size="large"
                value={editApplicantData?.stocksUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    stocksUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much is your stocks networth in Naira?</h2>
          <div>
            <Form.Item name="stocksNaira">
              <Input
                size="large"
                value={editApplicantData?.stocksNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    stocksNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much is your bonds networth in USD?</h2>
          <div>
            <Form.Item name="bondsUSD">
              <Input
                size="large"
                value={editApplicantData?.bondsUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    bondsUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much is your bonds networth in Naira?</h2>
          <div>
            <Form.Item name="bondsNaira">
              <Input
                size="large"
                value={editApplicantData?.bondsNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    bondsNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your mutual funds networth in USD?
          </h2>
          <div>
            <Form.Item name="mutualFundsUSD">
              <Input
                size="large"
                value={editApplicantData?.mutualFundsUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    mutualFundsUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your mutual funds networth in Naira?
          </h2>
          <div>
            <Form.Item name="mutualFundsNaira">
              <Input
                size="large"
                value={editApplicantData?.mutualFundsNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    mutualFundsNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your privately held company interests networth in USD?
          </h2>
          <div>
            <Form.Item name="privatelyHeldCompanyInterestsUSD">
              <Input
                size="large"
                value={editApplicantData?.privatelyHeldCompanyInterestsUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    privatelyHeldCompanyInterestsUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your privately held company interests networth in
            Naira?
          </h2>
          <div>
            <Form.Item name="privatelyHeldCompanyInterestsUSD">
              <Input
                size="large"
                value={editApplicantData?.privatelyHeldCompanyInterestsNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    privatelyHeldCompanyInterestsNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your real estate networth in USD?
          </h2>
          <div>
            <Form.Item name="realEstateUSD">
              <Input
                size="large"
                value={editApplicantData?.realEstateUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    realEstateUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your real estate networth in Naira?
          </h2>
          <div>
            <Form.Item name="realEstateNaira">
              <Input
                size="large"
                value={editApplicantData?.realEstateNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    realEstateNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your retirement accounts networth in USD?
          </h2>
          <div>
            <Form.Item name="retirementAccountsUSD">
              <Input
                size="large"
                value={editApplicantData?.retirementAccountsUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    retirementAccountsUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your retirement accounts networth in Naira?
          </h2>
          <div>
            <Form.Item name="retirementAccountsNaira">
              <Input
                size="large"
                value={editApplicantData?.retirementAccountsNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    retirementAccountsNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your inheritance networth in USD?
          </h2>
          <div>
            <Form.Item name="inheritanceUSD">
              <Input
                size="large"
                value={editApplicantData?.inheritanceUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    inheritanceUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much is your inheritance networth in Naira?
          </h2>
          <div>
            <Form.Item name="inheritanceNaira">
              <Input
                size="large"
                value={editApplicantData?.inheritanceNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    inheritanceNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much are your gifts networth in USD?</h2>
          <div>
            <Form.Item name="giftUSD">
              <Input
                size="large"
                value={editApplicantData?.giftUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    giftUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much are your gifts networth in Naira?</h2>
          <div>
            <Form.Item name="giftNaira">
              <Input
                size="large"
                value={editApplicantData?.giftNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    giftNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your total assets networth in USD?
          </h2>
          <div>
            <Form.Item name="totalAssetsUSD">
              <Input
                size="large"
                value={editApplicantData?.totalAssetsUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalAssetsUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your total assets networth in Naira?
          </h2>
          <div>
            <Form.Item name="totalAssetsNaira">
              <Input
                size="large"
                value={editApplicantData?.totalAssetsNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalAssetsNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your total liabilities networth in USD?
          </h2>
          <div>
            <Form.Item name="totalLiabilitiesUSD">
              <Input
                size="large"
                value={editApplicantData?.totalLiabilitiesUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalLiabilitiesUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your total liabilities networth in Naira?
          </h2>
          <div>
            <Form.Item name="totalLiabilitiesNaira">
              <Input
                size="large"
                value={editApplicantData?.totalLiabilitiesNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    totalLiabilitiesNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your short term liabilities networth in USD?
          </h2>
          <div>
            <Form.Item name="shortTermLiabilitiesUSD">
              <Input
                size="large"
                value={editApplicantData?.shortTermLiabilitiesUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    shortTermLiabilitiesUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your short term liabilities networth in Naira?
          </h2>
          <div>
            <Form.Item name="shortTermLiabilitiesNaira">
              <Input
                size="large"
                value={editApplicantData?.shortTermLiabilitiesNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    shortTermLiabilitiesNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your long term liabilities networth in USD?
          </h2>
          <div>
            <Form.Item name="longTermLiabilitiesUSD">
              <Input
                size="large"
                value={editApplicantData?.longTermLiabilitiesUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    longTermLiabilitiesUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            How much are your long term liabilities networth in Naira?
          </h2>
          <div>
            <Form.Item name="longTermLiabilitiesNaira">
              <Input
                size="large"
                value={editApplicantData?.longTermLiabilitiesNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    longTermLiabilitiesNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much is your networth in USD?</h2>
          <div>
            <Form.Item name="networthUSD">
              <Input
                size="large"
                value={editApplicantData?.networthUSD}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    networthUSD: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">How much is your networth in Naira?</h2>
          <div>
            <Form.Item name="networthNaira">
              <Input
                size="large"
                value={editApplicantData?.networthNaira}
                onChange={(e) => {
                  setEditApplicantData((prev: any) => ({
                    ...prev,
                    networthNaira: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-5">
            <AppButton
              label="Cancel"
              variant="transparent"
              type="reset"
              handleClick={() => {
                resetEditing();
                setIsEditing(false);
              }}
            />
            <AppButton
              label="Save"
              handleClick={() => {
                setDataSource((pre) => {
                  return pre.map((applicant) => {
                    if (applicant.key === editApplicantData.key) {
                      return editApplicantData;
                    } else {
                      return applicant;
                    }
                  });
                });
                resetEditing();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
