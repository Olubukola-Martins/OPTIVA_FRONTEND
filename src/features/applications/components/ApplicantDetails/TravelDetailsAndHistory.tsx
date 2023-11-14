import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

export type DataSourceItem = {
  key: React.Key;
  sn?: string;
  passportOne?: string;
  passportTwo?: string;
  passportThree?: string;
  from?: string;
  to?: string;
  cityAndCountry?: string;
  lengthOfStay?: string;
  purposeOfTravel?: string;
  permitOne?: string;
  permitTwo?: string;
  permitThree?: string;
};
export const dataSource: DataSourceItem[] = [];

export const TravelDetailsAndHistory = () => {
  const residencyDataSource: DataSourceItem[] = [];
  const travelDataSource: DataSourceItem[] = [];

  for (let i = 0; i < 5; i++) {
    dataSource.push({
      key: i,
      sn: "Issuing country",
      passportOne: "Nigeria",
      passportTwo: "0000000",
      passportThree: "Grenada",
    });

    residencyDataSource.push({
      key: i,
      sn: "Issuing country",
      permitOne: "Nigeria",
      permitTwo: "0000000",
      permitThree: "Grenada",
    });

    travelDataSource.push({
      key: i,
      from: "Nigeria",
      to: "0000000",
      cityAndCountry: "Grenada",
      lengthOfStay: "Not specified",
      purposeOfTravel: "",
    });
  }

  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "",
      dataIndex: "sn",
    },
    {
      title: "Passport One",
      dataIndex: "passportOne",
      key: "2",
    },
    {
      title: "Passport Two",
      dataIndex: "passportTwo",
      key: "3",
    },
    {
      title: "Passport Three",
      dataIndex: "passportThree",
      key: "4",
    },
  ];

  const residencyColumns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "",
      dataIndex: "sn",
    },
    {
      title: "Permit One",
      dataIndex: "permitOne",
      key: "2",
    },
    {
      title: "Permit Two",
      dataIndex: "permitTwo",
      key: "3",
    },
    {
      title: "Permit Three",
      dataIndex: "permitThree",
      key: "4",
    },
  ];

  const travelColumns: ColumnsType<DataSourceItem> = [
    {
      title: "From",
      dataIndex: "from",
      key: "1",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "2",
    },
    {
      title: "Length of Stay",
      dataIndex: "lengthOfStay",
      key: "3",
    },
    {
      title: "City & Country",
      dataIndex: "cityAndCountry",
      key: "4",
    },
    {
      title: "Purpose of Travel",
      dataIndex: "purposeOfTravel",
      key: "5",
    },
  ];

  return (
    <>
      <div className="w-full p-2">
        <h2>
          Ignore this section if this is the first time the applicant is
          applying
        </h2>
      </div>
      <div className="w-full p-4">
        <h2 className="font-bold my-2">Passport & Citizenship Details</h2>
        <Table columns={columns} dataSource={dataSource} scroll={{ x: 600 }} />
      </div>
      <div className="w-full p-4">
        <h2 className="font-bold my-2">Residency/Work permits/Visas</h2>
        <Table
          columns={residencyColumns}
          dataSource={residencyDataSource}
          scroll={{ x: 600 }}
        />
      </div>
      <div className="w-full p-4">
        <h2 className="font-bold my-2">Travel History</h2>
        <Table
          columns={travelColumns}
          dataSource={travelDataSource}
          scroll={{ x: 600 }}
        />
      </div>
    </>
  );
};
