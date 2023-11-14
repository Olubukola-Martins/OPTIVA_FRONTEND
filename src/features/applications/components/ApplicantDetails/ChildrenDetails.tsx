import { Checkbox, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export type DataSourceItem = {
  key: React.Key;
  childName?: string;
  dependentName?: string;
  relationshipApplicant?: string;
  maritalStatus?: string;
  dateOfDeath?: string;
  cityOfDeath?: string;
  countryOfDeath?: string;
  stateOfOrgin?: string;
  lgaOfOrigin?: string;
  hometown?: string;
  gender: string;
  dateOfBirth?: string;
  cityOfBirth?: string;
  countryOfBirth?: string;
  height: string;
  eyeColor: string;
  hairColor: string;
  dualCitizen: string;
  countriesOfCitizenship: string;
  passportNo: number;
  occupation: string;
  phoneNumber: number;
  emailAddress: string;
  residentialAddressApt: string;
  residentialAddressCity: string;
  residentialAddressStreet: string;
  residentialAddressState: string;
  residentialAddressCountry: string;
  residentialAddressCode: string;
  residentialAddressDate: string;
  onApplication: string;
};
 const columns: ColumnsType<DataSourceItem> = [
  {
    title: "Child's Name (First, Middle & Last Name) ",
    dataIndex: "childName",
    key: "1",
  },
  {
    title: " Gender",
    dataIndex: "gender",
    key: "2",
  },
  {
    title: "Date of Birth",
    dataIndex: "dateOfBirth",
    key: "3",
  },
  {
    title: "City of Birth",
    dataIndex: "cityOfBirth",
    key: "4",
  },
  {
    title: "Country of Birth",
    dataIndex: "countryOfBirth",
    key: "5",
  },
  {
    title: "Height (cm)",
    dataIndex: "height",
    key: "6",
  },
  {
    title: "Eye Color",
    dataIndex: "eyeColor",
    key: "7",
  },
  {
    title: "Hair Color",
    dataIndex: "hairColor",
    key: "8",
  },
  {
    title: "Dual Citizen?",
    dataIndex: "dualCitizen",
    key: "9",
    render: () => {
      return (
        <div className="flex gap-5">
          <Checkbox disabled>Yes</Checkbox>
          <Checkbox disabled>No</Checkbox>
        </div>
      );
    },
  },
  {
    title:
      "Countries of  Citizenship (Leave blank if the  child is not a citizen  of another country)",
    dataIndex: "countriesOfCitizenship",
    key: "10",
    render: () => <Select mode="multiple" disabled/>
  },
  {
    title: "Passport No.",
    dataIndex: "passportNo",
    key: "11",
  },
  {
    title: "Occupation",
    dataIndex: "occupation",
    key: "12",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "13",
  },
  {
    title: "Email Address",
    dataIndex: "emailAddress",
    key: "14",
  },
  {
    title:
      "Residential Address - Apt/Floor/Suite (if different from your residential address)",
    dataIndex: "residentialAddressApt",
    key: "15",
  },
  {
    title: "Residential Address - Street",
    dataIndex: "residentialAddressStreet",
    key: "16",
  },
  {
    title: "Residential Address - City",
    dataIndex: "residentialAddressCity",
    key: "17",
  },
  {
    title: "Residential Address - State",
    dataIndex: "residentialAddressState",
    key: "18",
  },
  {
    title: "Residential Address - Country",
    dataIndex: "residentialAddressCountry",
    key: "19",
  },
  {
    title: "Residential Address - Zip/Postcode",
    dataIndex: "residentialAddressCode",
    key: "20",
  },
  {
    title: "Residential Address - Date they moved in",
    dataIndex: "residentialAddressDate",
    key: "21",
  },
  {
    title: "On Application?",
    dataIndex: "onApplication",
    key: "22",
    render: () => {
      return (
        <div className="flex gap-5">
          <Checkbox disabled>Yes</Checkbox>
          <Checkbox disabled>No</Checkbox>
        </div>
      );
    },
  },
];
export const dataSource: DataSourceItem[] = [];
for (let i = 0; i < 8; i++) {
  dataSource.push({
    key: i,
    childName: "John Brown",
    gender: "Male",
    dateOfBirth: "dd/mm/yy",
    cityOfBirth: "Lagos",
    countryOfBirth: "Nigeria",
    height: "15cm",
    eyeColor: "Brown",
    hairColor: "Brown",
    dualCitizen: "No",
    countriesOfCitizenship: "Grenada",
    passportNo: 12345,
    occupation: "-",
    phoneNumber: 12345,
    emailAddress: "-",
    residentialAddressApt: "-",
    residentialAddressStreet: "-",
    residentialAddressCity: "-",
    residentialAddressState: "-",
    residentialAddressCountry: "-",
    residentialAddressCode: "-",
    residentialAddressDate: "-",
    onApplication: "No",
  });
}
export const ChildrenDetails = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center p-4 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full my-2">
            <h2 className="p-1">How many children do you have?</h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
          <div className="w-full my-2">
            <h2 className="p-1">Any Adopted Children?</h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full my-2">
            <h2 className="p-1">Will you be adopting?</h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
          <div className="w-full my-2">
            <h2 className="p-1">
              Will all your children be dependents on your application?
            </h2>
            <p className="applicantDetailsSinglePTag"></p>
          </div>
        </div>
      </div>
      <div className="p-4 lg:w-[1200px]">
        <Table
          columns={columns}
          dataSource={dataSource}
          className="bg-white rounded-md shadow border mt-2 mx-auto"
          scroll={{ x: 200 }}
        />
      </div>
    </>
  );
};
