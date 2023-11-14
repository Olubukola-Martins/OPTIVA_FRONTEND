import { Form, Input, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";

type PassportDataSourceItem = {
  key: React.Key;
  issuingCountryOne: string;
  issuingCountryTwo: string;
  issuingCountryThree: string;
  passportNumberOne: number;
  passportNumberTwo: number;
  passportNumberThree: number;
  dateOfIssueOne: number;
  dateOfIssueTwo: number;
  dateOfIssueThree: number;
  dateOfExpiryOne: number;
  dateOfExpiryTwo: number;
  dateOfExpiryThree: number;
  placeOfIssueOne: string;
  placeOfIssueTwo: string;
  placeOfIssueThree: string;
};
type ResidencyDataSourceItem = {
  key: React.Key;
  residencyIssuingCountryOne: string;
  residencyIssuingCountryTwo: string;
  residencyIssuingCountryThree: string;
  residencyDateOfIssueOne: number;
  residencyDateOfIssueTwo: number;
  residencyDateOfIssueThree: number;
  residencyDateOfExpiryOne: number;
  residencyDateOfExpiryTwo: number;
  residencyDateOfExpiryThree: number;
  residencyPlaceOfIssueOne: string;
  residencyPlaceOfIssueTwo: string;
  residencyPlaceOfIssueThree: string;
};
type TravelDataSourceItem = {
  key: React.Key;
  travelLengthOfStay: string;
  travelFrom: string;
  travelTo: string;
  cityAndCountry: string;
  purposeOfTravel: string;
};

export const NewTravelDetailsAndHistory = () => {
  //NEW PASSPORT
  const [passportDataSource, setPassportDataSource] = useState<
    PassportDataSourceItem[]
  >([]);
  const [isEditingPassport, setIsEditingPassport] = useState<boolean>(false);
  const [editPassportData, setEditPassportData] = useState<any | null>(null);

  const onAddNewPassportDetail = () => {
    setIsEditingPassport(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      issuingCountryOne: "",
      issuingCountryTwo: "",
      issuingCountryThree: "",
      passportNumberOne: 0,
      passportNumberTwo: 0,
      passportNumberThree: 0,
      dateOfIssueOne: 0,
      dateOfIssueTwo: 0,
      dateOfIssueThree: 0,
      dateOfExpiryOne: 0,
      dateOfExpiryTwo: 0,
      dateOfExpiryThree: 0,
      placeOfIssueOne: "",
      placeOfIssueTwo: "",
      placeOfIssueThree: "",
    };
    setPassportDataSource((pre) => {
      return [...pre, newDetails];
    });
  };
  const onDeletePassportDetail = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setPassportDataSource((prev) => {
          return prev.filter((details) => details.key !== record.key);
        });
      },
    });
  };
  const editApplicantPassport = (record: any) => {
    setIsEditingPassport(true);
    setEditPassportData({ ...record });
  };
  const resetPassportEditing = () => {
    setIsEditingPassport(false);
    setEditPassportData(null);
  };

  //NEW RESIDENCY
  const [residencyDataSource, setResidencyDataSource] = useState<
    ResidencyDataSourceItem[]
  >([]);
  const [isEditingResidency, setIsEditingResidency] = useState<boolean>(false);
  const [editResidencyData, setEditResidencyData] = useState<any | null>(null);

  const onAddNewResidencyDetail = () => {
    setIsEditingResidency(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      residencyIssuingCountryOne: "",
      residencyIssuingCountryTwo: "",
      residencyIssuingCountryThree: "",
      residencyDateOfIssueOne: 0,
      residencyDateOfIssueTwo: 0,
      residencyDateOfIssueThree: 0,
      residencyDateOfExpiryOne: 0,
      residencyDateOfExpiryTwo: 0,
      residencyDateOfExpiryThree: 0,
      residencyPlaceOfIssueOne: "",
      residencyPlaceOfIssueTwo: "",
      residencyPlaceOfIssueThree: "",
    };
    setResidencyDataSource((pre) => {
      return [...pre, newDetails];
    });
  };
  const onDeleteResidencyDetail = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setResidencyDataSource((prev) => {
          return prev.filter((details) => details.key !== record.key);
        });
      },
    });
  };
  const editApplicantResidency = (record: any) => {
    setIsEditingResidency(true);
    setEditResidencyData({ ...record });
  };
  const resetResidencyEditing = () => {
    setIsEditingResidency(false);
    setEditResidencyData(null);
  };

  //NEW TRAVEL
  const [travelDataSource, setTravelDataSource] = useState<
    TravelDataSourceItem[]
  >([]);
  const [isEditingTravel, setIsEditingTravel] = useState<boolean>(false);
  const [editTravelData, setEditTravelData] = useState<any | null>(null);

  const onAddNewTravelDetail = () => {
    setIsEditingTravel(true)
    const randomNumber = Math.random() * 1000;
    const newDetails = {
      key: randomNumber,
      travelLengthOfStay: "",
      travelFrom: "",
      travelTo: "",
      cityAndCountry: "",
      purposeOfTravel: "",
    };
    setTravelDataSource((pre) => {
      return [...pre, newDetails];
    });
  };
  const onDeleteTravelDetail = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTravelDataSource((prev) => {
          return prev.filter((details) => details.key !== record.key);
        });
      },
    });
  };
  const editApplicantTravel = (record: any) => {
    setIsEditingTravel(true);
    setEditTravelData({ ...record });
  };
  const resetTravelEditing = () => {
    setIsEditingTravel(false);
    setEditTravelData(null);
  };

  const passportColumns: ColumnsType<PassportDataSourceItem> = [
    {
      title: "What country issued your passport (Passport One)?",
      dataIndex: "issuingCountryOne",
      key: "1",
    },
    {
      title: "What is the passport number (Passport One)?",
      dataIndex: "passportNumberOne",
      key: "2",
    },
    {
      title: "What is the date of issue (Passport One)?",
      dataIndex: "dateOfIssueOne",
      key: "3",
    },
    {
      title: "What is the date of expiration (Passport One)?",
      dataIndex: "dateOfExpiryOne",
      key: "4",
    },
    {
      title: "What is the place of issue (Passport One)?",
      dataIndex: "placeOfIssueOne",
      key: "5",
    },
    {
      title: "What country issued your passport (Passport Two)?",
      dataIndex: "issuingCountryTwo",
      key: "6",
    },
    {
      title: "What is the passport number (Passport Two)?",
      dataIndex: "passportNumberTwo",
      key: "7",
    },
    {
      title: "What is the date of issue (Passport Two)?",
      dataIndex: "dateOfIssueTwo",
      key: "8",
    },
    {
      title: "What is the date of expiration (Passport Two)?",
      dataIndex: "dateOfExpiryTwo",
      key: "9",
    },
    {
      title: "What is the place of issue(PassportTwo)?",
      dataIndex: "placeOfIssueTwo",
      key: "10",
    },
    {
      title: "What country issued your passport (Passport Three)?",
      dataIndex: "issuingCountryThree",
      key: "11",
    },
    {
      title: "What is the passport number (Passport Three)?",
      dataIndex: "passportNumberThree",
      key: "12",
    },
    {
      title: "What is the date of issue (Passport Three)?",
      dataIndex: "dateOfIssueThree",
      key: "13",
    },
    {
      title: "What is the date of expiration (Passport Three)?",
      dataIndex: "dateOfExpiryTwo",
      key: "14",
    },
    {
      title: "What is the place of issue(PassportThree)?",
      dataIndex: "placeOfIssueThree",
      key: "15",
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <div className="flex gap-5">
            <AppButton
              label="Edit"
              handleClick={() => editApplicantPassport(record)}
              variant="transparent"
            />
            <AppButton
              label="Delete"
              handleClick={() => onDeletePassportDetail(record)}
              variant="transparent"
            />
          </div>
        );
      },
    },
  ];
  const residencyColumns: ColumnsType<ResidencyDataSourceItem> = [
    {
      title: "What country issued your residency permit (Permit One)?",
      dataIndex: "residencyIssuingCountryOne",
      key: "1",
    },
    {
      title: "What is the date of residency issue (Permit One)?",
      dataIndex: "residencyDateOfIssueOne",
      key: "2",
    },
    {
      title: "What is the date of residency expiration (Permit One)?",
      dataIndex: "residencyDateOfExpiryOne",
      key: "3",
    },
    {
      title: "What is the place of residency issue (Permit One)?",
      dataIndex: "residencyPlaceOfIssueOne",
      key: "4",
    },
    {
      title: "What country issued your residency permit (Permit Two)?",
      dataIndex: "residencyIssuingCountryTwo",
      key: "5",
    },
    {
      title: "What is the date of residency issure (Permit Two)?",
      dataIndex: "residencyDateOfIssueTwo",
      key: "6",
    },
    {
      title: "What is the date of residency expiration (Permit Two)?",
      dataIndex: "residencyDateOfExpiryTwo",
      key: "7",
    },
    {
      title: "What is the place of residency issue (Permit Two)?",
      dataIndex: " residencyPlaceOfIssueTwo",
      key: "8",
    },
    {
      title: "What country issued your residency permit (Permit Three)?",
      dataIndex: "residencyIssuingCountryThree",
      key: "9",
    },
    {
      title: "What is the date of residency issue (Permit Three)?",
      dataIndex: "residencyDateOfIssueThree",
      key: "10",
    },
    {
      title: "What is the date of residency expiration (Permit Three)?",
      dataIndex: "residencyDateOfExpiryThree",
      key: "11",
    },
    {
      title: "What is the place of residency issue (Permit Three)?",
      dataIndex: " residencyPlaceOfIssueThree",
      key: "12",
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <div className="flex gap-5">
            <AppButton
              label="Edit"
              handleClick={() => editApplicantResidency(record)}
              variant="transparent"
            />
            <AppButton
              label="Delete"
              handleClick={() => onDeleteResidencyDetail(record)}
              variant="transparent"
            />
          </div>
        );
      },
    },
  ];
  const travelColumns: ColumnsType<TravelDataSourceItem> = [
    {
      title: "How long was your stay?",
      dataIndex: "travelLengthOfStay",
      key: "1",
    },
    {
      title: "When did your stay start?",
      dataIndex: "travelFrom",
      key: "2",
    },
    {
      title: "When did your stay end?",
      dataIndex: "travelTo",
      key: "3",
    },
    {
      title: "What city and country?",
      dataIndex: "cityAndCountry",
      key: "4",
    },
    {
      title: "What was the purpose of travel?",
      dataIndex: "purposeOfTravel",
      key: "5",
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <div className="flex gap-5">
            <AppButton
              label="Edit"
              handleClick={() => editApplicantTravel(record)}
              variant="transparent"
            />
            <AppButton
              label="Delete"
              handleClick={() => onDeleteTravelDetail(record)}
              variant="transparent"
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-2 mt-2">
        <h2>
          Ignore this section if this is the first time the applicant is
          applying
        </h2>
        <div >
          <h2 className="font-bold py-2 mt-5">
            Passport & Citizenship Details
          </h2>
          <div className="py-2 mb-3">
            <AppButton
              label="Add passport and citizenship details"
              handleClick={onAddNewPassportDetail}
            />
          </div>
          <div className="p-2 lg:w-[1200px] mx-auto">
            <Table
              columns={passportColumns}
              dataSource={passportDataSource}
              className="bg-white rounded-md shadow border mt-2"
              scroll={{ x: 200 }}
            />
          </div>
        </div>

        <div >
          <h2 className="font-bold py-2 mt-5">Residency History</h2>
          <div className="py-2 mb-3">
            <AppButton
              label="Add residency details"
              handleClick={onAddNewResidencyDetail}
            />
          </div>
          <div className="p-2 lg:w-[1200px] mx-auto">
            <Table
              columns={residencyColumns}
              dataSource={residencyDataSource}
              className="bg-white rounded-md shadow border mt-2"
              scroll={{ x: 200 }}
            />
          </div>
        </div>

        <div >
          <h2 className="font-bold py-2 mt-5">Travel History</h2>
          <div className="py-2 mb-3">
            <AppButton
              label="Add travel history details"
              handleClick={onAddNewTravelDetail}
            />
          </div>
          <div className="p-2 lg:w-[1200px] mx-auto">
            <Table
              columns={travelColumns}
              dataSource={travelDataSource}
              className="bg-white rounded-md shadow border mt-2"
              scroll={{ x: 200 }}
            />
          </div>
        </div>
      </div>
      {/* PASSPORT MODAL */}
      <Modal
        open={isEditingPassport}
        footer={null}
        onCancel={() => setIsEditingPassport(false)}
      >
        <h2 className="text-center font-bold py-2 text-lg">
          Edit Passport Details
        </h2>
        <div>
          <h2 className="py-1">
            What country issued your passport (Passport One)?
          </h2>
          <div>
            <Form.Item name="issuingCountryOne" required>
              <Input
                size="large"
                value={editPassportData?.issuingCountryOne}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    issuingCountryOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the passport number (Passport One)?</h2>
          <div>
            <Form.Item name="passportNumberOne" required>
              <Input
                size="large"
                value={editPassportData?.passportNumberOne}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    passportNumberOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the date of issue (Passport One)?</h2>
          <div>
            <Form.Item name="dateOfIssueOne" required>
              <Input
                size="large"
                value={editPassportData?.dateOfIssueOne}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    dateOfIssueOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of expiration (Passport One)?
          </h2>
          <div>
            <Form.Item name="dateOfExpiryOne" required>
              <Input
                size="large"
                value={editPassportData?.dateOfExpiryOne}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    dateOfExpiryOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the place of issue (Passport One)?</h2>
          <div>
            <Form.Item name="placeOfIssueOne" required>
              <Input
                size="large"
                value={editPassportData?.placeOfIssueOne}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    placeOfIssueOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <h2 className="py-1">
            What country issued your passport (Passport Two)?
          </h2>
          <div>
            <Form.Item name="issuingCountryTwo">
              <Input
                size="large"
                value={editPassportData?.issuingCountryTwo}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    issuingCountryTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the passport number (Passport Two)?</h2>
          <div>
            <Form.Item name="passportNumberTwo">
              <Input
                size="large"
                value={editPassportData?.passportNumberTwo}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    passportNumberTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the date of issue (Passport Two)?</h2>
          <div>
            <Form.Item name="dateOfIssueTwo">
              <Input
                size="large"
                value={editPassportData?.dateOfIssueTwo}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    dateOfIssueTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of expiration (Passport Two)?
          </h2>
          <div>
            <Form.Item name="dateOfExpiryTwo">
              <Input
                size="large"
                value={editPassportData?.dateOfExpiryTwo}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    dateOfExpiryTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the place of issue (Passport Two)?</h2>
          <div>
            <Form.Item name="placeOfIssueTwo">
              <Input
                size="large"
                value={editPassportData?.placeOfIssueTwo}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    placeOfIssueTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <h2 className="py-1">
            What country issued your passport (Passport Three)?
          </h2>
          <div>
            <Form.Item name="issuingCountryThree">
              <Input
                size="large"
                value={editPassportData?.issuingCountryThree}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    issuingCountryThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the passport number (Passport Three)?
          </h2>
          <div>
            <Form.Item name="passportNumberThree">
              <Input
                size="large"
                value={editPassportData?.passportNumberThree}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    passportNumberThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the date of issue (Passport Three)?</h2>
          <div>
            <Form.Item name="dateOfIssueThree">
              <Input
                size="large"
                value={editPassportData?.dateOfIssueThree}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    dateOfIssueThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of expiration (Passport Three)?
          </h2>
          <div>
            <Form.Item name="dateOfExpiryThree">
              <Input
                size="large"
                value={editPassportData?.dateOfExpiryThree}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    dateOfExpiryThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What is the place of issue (Passport Three)?</h2>
          <div>
            <Form.Item name="placeOfIssueThree">
              <Input
                size="large"
                value={editPassportData?.placeOfIssueThree}
                onChange={(e) => {
                  setEditPassportData((prev: any) => ({
                    ...prev,
                    placeOfIssueThree: e.target.value,
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
                resetPassportEditing();
                setIsEditingPassport(false);
              }}
            />
            <AppButton
              label="Save"
              handleClick={() => {
                setPassportDataSource((pre) => {
                  return pre.map((applicant) => {
                    if (applicant.key === editPassportData.key) {
                      return editPassportData;
                    } else {
                      return applicant;
                    }
                  });
                });
                resetPassportEditing();
              }}
            />
          </div>
        </div>
      </Modal>

      {/* RESIDENCY MODAL */}
      <Modal
        open={isEditingResidency}
        footer={null}
        onCancel={() => setIsEditingResidency(false)}
      >
        <h2 className="text-center font-bold py-2 text-lg">
          Edit Residency Details
        </h2>
        <div>
          <h2 className="py-1">
            What country issued your residency permit (Permit One)?
          </h2>
          <div>
            <Form.Item name="residencyIssuingCountryOne" required>
              <Input
                size="large"
                value={editResidencyData?.residencyIssuingCountryOne}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyIssuingCountryOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of residency issue (Permit One)?
          </h2>
          <div>
            <Form.Item name="residencyDateOfIssueOne" required>
              <Input
                size="large"
                value={editResidencyData?.residencyDateOfIssueOne}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyDateOfIssueOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of residency expiration (Permit One)?
          </h2>
          <div>
            <Form.Item name="residencyDateOfExpiryOne" required>
              <Input
                size="large"
                value={editResidencyData?.residencyDateOfExpiryOne}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyDateOfExpiryOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the place of residency issue (Permit One)?
          </h2>
          <div>
            <Form.Item name="residencyPlaceOfIssueOne" required>
              <Input
                size="large"
                value={editResidencyData?.residencyPlaceOfIssueOne}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyPlaceOfIssueOne: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <h2 className="py-1">
            What country issued your residency permit (Permit Two)?
          </h2>
          <div>
            <Form.Item name="residencyIssuingCountryTwo">
              <Input
                size="large"
                value={editResidencyData?.residencyIssuingCountryTwo}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyIssuingCountryTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of residency issue (Permit Two)?
          </h2>
          <div>
            <Form.Item name="residencyDateOfIssueTwo">
              <Input
                size="large"
                value={editResidencyData?.residencyDateOfIssueTwo}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyDateOfIssueTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of residency expiration (Permit Two)?
          </h2>
          <div>
            <Form.Item name="residencyDateOfExpiryTwo">
              <Input
                size="large"
                value={editResidencyData?.residencyDateOfExpiryTwo}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyDateOfExpiryTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the place of residency issue (Permit Two)?
          </h2>
          <div>
            <Form.Item name="residencyPlaceOfIssueTwo">
              <Input
                size="large"
                value={editResidencyData?.residencyPlaceOfIssueTwo}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyPlaceOfIssueTwo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div>
          <h2 className="py-1">
            What country issued your residency permit (Permit Three)?
          </h2>
          <div>
            <Form.Item name="residencyIssuingCountryThree">
              <Input
                size="large"
                value={editResidencyData?.residencyIssuingCountryThree}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyIssuingCountryThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of residency issue (Permit Three)?
          </h2>
          <div>
            <Form.Item name="residencyDateOfIssueThree">
              <Input
                size="large"
                value={editResidencyData?.residencyDateOfIssueThree}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyDateOfIssueThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the date of residency expiration (Permit Three)?
          </h2>
          <div>
            <Form.Item name="residencyDateOfExpiryThree">
              <Input
                size="large"
                value={editResidencyData?.residencyDateOfExpiryThree}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyDateOfExpiryThree: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">
            What is the place of residency issue (Permit Three)?
          </h2>
          <div>
            <Form.Item name="residencyPlaceOfIssueThree">
              <Input
                size="large"
                value={editResidencyData?.residencyPlaceOfIssueThree}
                onChange={(e) => {
                  setEditResidencyData((prev: any) => ({
                    ...prev,
                    residencyPlaceOfIssueThree: e.target.value,
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
                resetResidencyEditing();
                setIsEditingResidency(false);
              }}
            />
            <AppButton
              label="Save"
              handleClick={() => {
                setResidencyDataSource((pre) => {
                  return pre.map((applicant) => {
                    if (applicant.key === editResidencyData.key) {
                      return editResidencyData;
                    } else {
                      return applicant;
                    }
                  });
                });
                resetResidencyEditing();
              }}
            />
          </div>
        </div>
      </Modal>

      {/* TRAVEL MODAL */}
      <Modal
        open={isEditingTravel}
        footer={null}
        onCancel={() => setIsEditingResidency(false)}
      >
        <h2 className="text-center font-bold py-2 text-lg">
          Edit Travel Details
        </h2>
        <div>
          <h2 className="py-1">How long was your stay?</h2>
          <div>
            <Form.Item name="travelLengthOfStay" required>
              <Input
                size="large"
                value={editTravelData?.travelLengthOfStay}
                onChange={(e) => {
                  setEditTravelData((prev: any) => ({
                    ...prev,
                    travelLengthOfStay: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">When did your stay start?</h2>
          <div>
            <Form.Item name="residencyDateOfIssueOne" required>
              <Input
                size="large"
                value={editTravelData?.travelFrom}
                onChange={(e) => {
                  setEditTravelData((prev: any) => ({
                    ...prev,
                    travelFrom: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">When did your stay end?</h2>
          <div>
            <Form.Item name="residencyDateOfExpiryOne" required>
              <Input
                size="large"
                value={editTravelData?.travelTo}
                onChange={(e) => {
                  setEditTravelData((prev: any) => ({
                    ...prev,
                    travelTo: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What city and country?</h2>
          <div>
            <Form.Item name="cityAndCountry" required>
              <Input
                size="large"
                value={editTravelData?.cityAndCountry}
                onChange={(e) => {
                  setEditTravelData((prev: any) => ({
                    ...prev,
                    cityAndCountry: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <h2 className="py-1">What was the purpose of travel?</h2>
          <div>
            <Form.Item name="cityAndCountry" required>
              <Input
                size="large"
                value={editTravelData?.purposeOfTravel}
                onChange={(e) => {
                  setEditTravelData((prev: any) => ({
                    ...prev,
                    purposeOfTravel: e.target.value,
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
                resetTravelEditing();
                setIsEditingTravel(false);
              }}
            />
            <AppButton
              label="Save"
              handleClick={() => {
                setTravelDataSource((pre) => {
                  return pre.map((applicant) => {
                    if (applicant.key === editTravelData.key) {
                      return editTravelData;
                    } else {
                      return applicant;
                    }
                  });
                });
                resetTravelEditing();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
