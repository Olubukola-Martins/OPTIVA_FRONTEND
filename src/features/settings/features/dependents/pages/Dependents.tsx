import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Table, Tag } from "antd/lib";
import React, { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { Icon } from "@iconify/react";
import { appRoute } from "src/config/routeMgt/routePaths";
import { AddDependent } from "../components/AddDependent";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "../hooks/useCreateEligibleDependents";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  AllEligiDependentsDatum,
  IAllEligiDependentsResponse,
  ISingleEligibleDependent,
} from "src/features/settings/types/settingsType";
import { EditDependent } from "../components/EditDependent";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useFetchDependent } from "../hooks/useFetchDependent";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";

export interface DataType {
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
const deleteEndpointUrl = "admin/eligible-dependant/";
const queryKey = QUERY_KEY_ELIGIBLE_DEPENDENTS;

const Dependents = () => {
  const [addNewD, setAddNewD] = useState(false);
  const [editNewD, setEditNewD] = useState(false);
  const [editingDependent, setEditingDependent] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>();
  const [data, setData] = useState<DataType[] | []>([]);
  const [singleDependent, setSingleDependent] = useState<
    AllEligiDependentsDatum | undefined
  >();
  // const { deleteData } = useDeleteItem({ deleteEndpointUrl, queryKey });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { removeData } = useDelete({
    EndPointUrl: deleteEndpointUrl,
    queryKey,
  });

  const {
    data: allDependentsData,
    isLoading: allDependentsLoading,
  }: 
  IQueryDataType<IAllEligiDependentsResponse> = useFetchAllItems({
    queryKey,
    urlEndPoint: eligibleDependentURL,
  });
  const {
    data: singleDependentData,
    isLoading: singleDependentLoading,
  }: { data: ISingleEligibleDependent | undefined; isLoading: boolean } =
    useFetchDependent({ id: itemId as number });

const handleEditingProgress = (editIsLoading: boolean ) => {setEditingDependent(editIsLoading)}

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
      console.log("editing",editingDependent)
    }
  }, [allDependentsData, allDependentsLoading,  editingDependent, allDependentsData?.data, singleDependentData,singleDependentLoading]);

  useEffect(() => {
    if (singleDependentData?.data && !Array.isArray(singleDependentData.data)) {
      setSingleDependent(singleDependentData.data);
    }
  }, [itemId, singleDependentData, singleDependentLoading, editingDependent]);

  useEffect(() => {

  }, [editingDependent,data,singleDependent])
  

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
                    setShowDeleteModal(true);
                    setItemId(val.key as number);
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
      <DeleteModal
        open={showDeleteModal}
        header="Dependent"
        text="dependent"
        onCancel={() => {
          setShowDeleteModal(false);
        }}
        onDelete={() => {
          removeData(itemId as number);
          setShowDeleteModal(false)
        }}
      />
      {itemId && (
        <EditDependent
          open={editNewD}
          handleClose={() => setEditNewD(false)}
          itemId={itemId}
          singleDependent={singleDependent}
          singleDependentLoading={singleDependentLoading}
          editing={handleEditingProgress}
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
              // onClick={showImportModal}
            />
            <Icon
              icon="mingcute:file-import-line"
              className="text-3xl cursor-pointer hover:text-primary"
              // onClick={showExportModal}
            />
          </div>
          <AppButton label="Add New" handleClick={() => setAddNewD(true)} />
        </div>
      </div>
      <Table
        className="bg-white rounded-md shadow border mt-8"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
        loading={allDependentsLoading}
      />
    </>
  );
};

export default Dependents;
