import { Modal } from "antd";
import { useState } from "react";

export const useDetailsForm = () => {
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState<any | null>(null);

  const addNewDetail = () => {
    const randomNumber = Math.random() * 1000;
    const newDetails: any = {
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
      travelLengthOfStay: "",
      travelFrom: "",
      travelTo: "",
      cityAndCountry: "",
      purposeOfTravel: "",
    };
    setDataArray((prev) => [...prev, newDetails]);
  };

  const deleteDetail = (record: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataArray((prev) => {
          return prev.filter((details) => details.key !== record.key);
        });
      },
    });
  };

  const editDetailsForm = (record: any) => {
    setIsEditing(true);
    setEditDetails({ ...record });
  };

  const resetEditingForm = () => {
    setIsEditing(false);
    setEditDetails(null);
  };

  return {
    dataArray,
    isEditing,
    editDetails,
    addNewDetail,
    deleteDetail,
    editDetailsForm,
    resetEditingForm,
  };
};
