import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Table, Tag } from "antd/lib";
import React, { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddDependent } from "../components/AddDependent";
import { useDeleteItem } from "src/features/settings/hooks/useDeleteItem";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "../hooks/useCreateEligibleDependents";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import { IAllEligiDependentsResponse } from "src/features/settings/types/settingsType";
import { Skeleton } from "antd";
import { EditDependent } from "../components/EditDependent";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useForm } from "antd/es/form/Form";

interface DataType {
  key: React.Key;
  dependent: string;
  ageBracket: string[];
  conditions: string[];
}
interface IQueryDataType<TPageData> {
  data: TPageData | undefined;
  isLoading: boolean;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, any>>;
}
const deleteEndpointUrl = eligibleDependentURL;
const queryKey = QUERY_KEY_ELIGIBLE_DEPENDENTS;

const Dependents = () => {
  const [editSuccessful, setEditSuccessful] = useState(false);
  const [addNewD, setAddNewD] = useState(false);
  const [editNewD, setEditNewD] = useState(false);
  const [itemId, setItemId] = useState<number>();
  const [data, setData] = useState<DataType[] | []>([]);
  const { deleteData } = useDeleteItem({ deleteEndpointUrl, queryKey });

  const {
    data: allDependentsData,
    isLoading: allDependentsLoading,
    refetch,
  }: IQueryDataType<IAllEligiDependentsResponse> = useFetchAllItems({
    queryKey,
    urlEndPoint: eligibleDependentURL,
  });
  const editSuccess = (isSuccess: boolean) => {
    setEditSuccessful(isSuccess);
  };

  useEffect(() => {
    console.log("changedData", data);
    refetch();
  }, [data]);

  useEffect(() => {
    if (allDependentsData?.data && Array.isArray(allDependentsData?.data)) {
      const responseData = allDependentsData.data;
      const newData: DataType[] = responseData.map((item) => ({
        key: item.id,
        dependent: item.dependant,
        ageBracket: item.age_brackets.map((item) => item.age_bracket),
        conditions: item.other_conditions.map((item) => item.other_condition),
      }));
      setData(newData);
    }
  }, [allDependentsData, allDependentsLoading, editSuccessful]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Dependents",
      dataIndex: "dependent",
    },

    {
      title: "Age Bracket",
      dataIndex: "ageBracket",
      render(_, record) {
        return record.ageBracket.map((item) => <Tag key={item}>{item}</Tag>);
      },
    },
    {
      title: "Conditions",
      dataIndex: "conditions",
      render(_, record) {
        return record.conditions.map((item) => <Tag key={item}>{item}</Tag>);
      },
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setItemId(val.key as number);
                    setEditNewD(true);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    deleteData(val.key as number);
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <>
      <AddDependent open={addNewD} handleClose={() => setAddNewD(false)} />
      {itemId && (
        <EditDependent
          open={editNewD}
          handleClose={() => setEditNewD(false)}
          itemId={itemId}
          editSuccess={editSuccess}
          refetchAllDependents={() => refetch()}
        />
      )}
      <div className="flex justify-between flex-col md:flex-row  md:items-center">
        <PageIntro
          title="Eligible Dependents"
          description="Create, View & edit eligible dependents  routes on the system"
          linkBack={appRoute.settings}
        />

        <div
          className={`flex items-center gap-3 ${
            allDependentsLoading && "hidden"
          }`}
        >
          <div className="flex items-center gap-2">
            <Icon
              icon="uil:file-import"
              className="text-3xl cursor-pointer hover:text-primary"
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
            />
          </div>
          <AppButton label="Add New" handleClick={() => setAddNewD(true)} />
        </div>
      </div>
      <Skeleton active={true} loading={allDependentsLoading}>
        <Table
          className="bg-white rounded-md shadow border mt-8"
          columns={columns}
          dataSource={data}
          scroll={{ x: 768 }}
        />
      </Skeleton>
    </>
  );
};

export default Dependents;
