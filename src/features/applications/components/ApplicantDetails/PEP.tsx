import { ColumnsType } from "antd/es/table";
import { Checkbox, Table } from "antd";

export type DataSourceItem = {
  key: React.Key;
  relatedTo: string;
  militaryOfficial: string;
  governmentOfficial: string;
  politicalOfficial: string;
};
export const dataSource: DataSourceItem[] = [];
for (let i = 0; i < 4; i++) {
  dataSource.push({
    key: i,
    relatedTo: "Yourself",
    militaryOfficial: "No",
    governmentOfficial: "No",
    politicalOfficial: "No",
  });
}
export const PEP = () => {
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Related/Closely associated to",
      dataIndex: "relatedTo",
      key: "1",
      render: () => (
        <div>
          <h2>Yourself</h2>
        </div>
      ),
    },
    {
      title: "(A) Military Official (s)",
      dataIndex: "militaryOfficial",
      key: "2",
      render: () => (
        <div className="flex gap-5">
          <Checkbox disabled name="militaryOfficialYes">
            Yes
          </Checkbox>
          <Checkbox disabled name="militaryOfficialNo">
            No
          </Checkbox>
        </div>
      ),
    },
    {
      title: "(A) Government Official (s)",
      dataIndex: "govermentOfficial",
      key: "3",
      render: () => (
        <div className="flex gap-5">
          <Checkbox disabled name="govermentOfficialYes">
            Yes
          </Checkbox>
          <Checkbox disabled name="govermentOfficialNo">
            No
          </Checkbox>
        </div>
      ),
    },
    {
      title: "(A) Political Official (s)",
      dataIndex: "politicalOfficial",
      key: "4",
      render: () => (
        <div className="flex gap-5">
          <Checkbox disabled name="politicalOfficialYes">
            Yes
          </Checkbox>
          <Checkbox disabled name="politicalOfficialNo">
            No
          </Checkbox>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="p-4 my-4">
        <p>
          A PEP may be past or current government office holders, or individuals
          who are or were formerly entrusted with high-level public functions.
          For example, senior officials, heads of state government, senior
          judicial or military officials, officials of political parties and
          senior executives of stateowned enterprises (SOE). PEP definition
          included family members and close associates of
        </p>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        className="bg-white rounded-md shadow border mt-2"
        scroll={{ x: 600 }}
      />
      <div className="p-4 my-4">
        <p className="my-2">If “Yes” to any of the above, please explain:</p>

        <div>
          <div className="applicantDetailsDiv h-24 rounded-md">
            <p className="p-4"> text</p>
          </div>
        </div>
      </div>
    </div>
  );
};
