import {
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Modal,
  Select,
  Skeleton,
  Typography,
  UploadProps,
} from "antd";
import "../style.css";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { PageIntro } from "src/components/PageIntro";
import { AppButton } from "src/components/button/AppButton";
import { appRoute } from "src/config/routeMgt/routePaths";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchSingleItem } from "src/features/settings/hooks/useFetchSingleItem";
import { END_POINT } from "src/config/environment";
import {
  IAllFxRates,
  IAllPaymentDetails,
  IAllPayments,
  IGenFinancialState,
  PaymentsDatum,
  // fxRateDatum,
} from "src/features/meetings/types/types";
import { openNotification } from "src/utils/notification";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "react-query";
import useAddPaymentDetail from "../hooks/useAddPaymentDetail";
import useUpdatePaymentDetail from "../hooks/useUpdatePaymentDedtails";
import {
  // AllPaymentsContext,
  IQueryDataType,
  QUERY_KEY_PAYMENTS,
  paymentsUrl,
} from "./Payments";
import { useFetchAllItems } from "src/features/settings/hooks/useFetchAllItems";
import {
  generateFinancialStatement,
  viewProofOfPayment,
} from "../hooks/useGenerate";
import dayjs from "dayjs";
import FxRatesFormInput, {
  QUERY_KEY_FOR_FXRATES,
  fxRatesUrl,
} from "../components/FxRatesFormInput";
import { useFetchEmployees } from "src/features/settings/features/employees/hooks/useFetchEmployees";
// import { useDebounce } from "src/hooks/useDebounce";
import { UploadFile } from "antd/es/upload";
import {
  TFileType,
  createFileValidationRule,
  generalValidationRules,
  generalValidationRulesOpt,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";
import useUploadFile from "../hooks/useUploadFile";
import UploadFileComp from "src/components/formItem/UploadFileComp";

export const QUERY_KEY_ALLPAYMENT_DETAILS = "AllPaymentDetailsPerApplication";
export const paymentDetailsURL = `${END_POINT.BASE_URL}/admin/paymentDetails`;

interface IPaymentItem {
  key: number;
  narration: JSX.Element;
  paidBy: JSX.Element;
  fxRate: JSX.Element;
  dateCreated: JSX.Element;
  datePaid: JSX.Element;
  paymentsUSD: JSX.Element;
  paymentsNGN: JSX.Element;
  updatedBy: JSX.Element;
  balanceDue: JSX.Element;
  paymentProof: string;
}

interface IUpdatePaymentDetailBody {
  narration: string;
  date_paid: string;
  fx_rate: string;
  paid_by: number;
  naira_payment: number;
  dollar_payment: number;
  proof_of_payment_file: string;
  // file: File;
}

const PaymentDetails = () => {
  // Payments list data
  const {
    data: allPaymentsData,
    isLoading: allPaymentsLoading,
  }: IQueryDataType<IAllPayments> = useFetchAllItems({
    queryKey: QUERY_KEY_PAYMENTS,
    urlEndPoint: paymentsUrl,
  });

  // fxRates
  const {
    data: fxRatesData,
    isLoading: fxRatesLoading,
  }: { data: IAllFxRates | undefined; isLoading: boolean } = useFetchAllItems({
    queryKey: QUERY_KEY_FOR_FXRATES,
    urlEndPoint: fxRatesUrl,
  });

  const { TextArea } = Input;
  const { Text } = Typography;
  const { id } = useParams();
  const paymentsId = Number(id);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  // const [itemId, setItemId] = useState<number>();
  const [preSelectedFile, setPreSelectedFile] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const {paymentsData} = useContext(AllPaymentsContext);
  const [modalForm] = Form.useForm();
  const navigate = useNavigate();
  const [data, setData] = useState<IPaymentItem[]>();
  const [paymentCurrency, setPaymentCurrency] = useState<string>("enterUSD");
  const [allRatesData, setAllRatesData] = useState<any>();
  const [allEmployeesData, setAllEmployeesData] = useState<any>();
  const [dataSourceFirst, setDataSourceFirst] = useState<DataSource[]>();
  const [dataSourceSecond, setDataSourceSecond] = useState<DataSource[]>();
  const [isEditingNewDetails, setIsEditingNewDetails] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<
    PaymentsDatum | undefined
  >();

  const [indexEdited, setIndexEdited] = useState<undefined | number>(undefined);
  const [currentDetailId, setCurrentDetailId] = useState<number>();
  const [currentDetailIdForProof, setCurrentDetailIdForProof] =
    useState<number>();
  const { fileData, fileUploading, fileMutate } = useUploadFile();
  const [fileDataUrl, setFileDataUrl] = useState<string>();
  console.log(fileDataUrl,indexEdited )
  const { data: paymentProofData, isLoading: paymentProofLoading } =
    viewProofOfPayment({ paymentDetailId: currentDetailIdForProof as number });
  // Fetch Financial Statement
  const {
    data: finStatementData,
    isLoading: finStatementLoading,
  }: IQueryDataType<IGenFinancialState> = generateFinancialStatement({
    itemId: paymentsId,
    // itemId: itemId as number,
  });

  // Fetch all employees
  const { data: allEmployees, isLoading: allEmployeesLoading } =
    useFetchEmployees({
      currentUrl: "active-employees",
      // search: debouncedSearchTerm,
    });

  // Fetch all payment details
  const {
    data: paymentDetailsData,
    isLoading: paymentDetailsLoading,
    refetch,
  }: {
    data: IAllPaymentDetails | undefined;
    isLoading: boolean;
    refetch: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<any, unknown>>;
  } = useFetchSingleItem({
    // itemId: itemId as number,
    itemId: paymentsId,
    queryKey: QUERY_KEY_ALLPAYMENT_DETAILS,
    urlEndPoint: paymentDetailsURL,
  });
  const queryClient = useQueryClient();

  // Add new payment detail
  const {
    mutate,
    isLoading: addingPaymentDetail,
    // data: paymentDetailUpdate,
  } = useAddPaymentDetail();
  const addDetail = (newData: IUpdatePaymentDetailBody, itemId: number) => {
    mutate(
      { newData, url: `${paymentDetailsURL}/${itemId}` },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.message,
            duration: 5,
          });
        },
        onSuccess: (response: any) => {
          openNotification({
            state: "success",
            title: "Success",
            duration: 5,
            description: response.message,
          });
          setIsModalOpen(false);
          modalForm.resetFields();
          setFileList([]);
          queryClient.invalidateQueries([
            QUERY_KEY_ALLPAYMENT_DETAILS,
            itemId as number,
          ]);
        },
      }
    );
  };

  // update payment detail
  const { mutate: updateMutate, isLoading: updatingingPaymentDetail } =
    useUpdatePaymentDetail();
  const updateDetail = ({
    newData,
    paymentDetailId,
    paymentId,
  }: {
    newData: IUpdatePaymentDetailBody;
    paymentDetailId: number;
    paymentId: number;
  }) => {
    updateMutate(
      {
        newData,
        url: `${paymentDetailsURL}/${paymentDetailId}/payment`,
        id: paymentId,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.message,
            duration: 5,
          });
          setIsEditingNewDetails(false);
        },
        onSuccess: (response: any) => {
          openNotification({
            state: "success",
            title: "Success",
            duration: 5,
            description: response.message,
          });
          refetch();
          setIsEditingNewDetails(false);
          setIsModalOpen(false);
          modalForm.resetFields();
          setFileList([]);
          queryClient.invalidateQueries([
            QUERY_KEY_ALLPAYMENT_DETAILS,
            paymentDetailId,
            paymentId,
          ]);
        },
      }
    );
  };

  // upload file props
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const fileRuleOptions = {
    required: true,
    allowedFileTypes: [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ] as TFileType[],
  };
  const formattedDate = (inputTimestamp: string) => {
    const date = new Date(inputTimestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };
  const onFinish = (values: any) => {
    console.log("form values", values);
  };
  // useEffect(() => {
  //   if (id) {
  //     setItemId(+id);
  //   }
  // }, [id]);

  useEffect(() => {
    if (
      // !allPaymentsLoading &&
      // (itemId as number) > 0 &&
      paymentsId > 0 &&
      allPaymentsData?.data
    ) {
      const currentApplication = allPaymentsData.data.find(
        (item) => item.id === paymentsId
      );
      setSelectedApplication(currentApplication);
    }
  }, [allPaymentsData, allPaymentsLoading, selectedApplication, paymentsId]);

  useEffect(() => {
    if (paymentDetailsData?.data && allRatesData && allEmployeesData) {
      const allPaymentDetails = paymentDetailsData.data.map((paymentDetail) => {
        const {
          id,
          narration,
          paid_by,
          fx_rate,
          created_at,
          date_paid,
          dollar_payment,
          naira_payment,
          updated_by,
          outstanding_payment,
          proof_of_payment_file,
        } = paymentDetail;
        // const currentRate = allRatesData.find(
        //   (rate: { id: number }) => rate.id === +fx_rate
        // );
        const currentPaidByEmployee = allEmployeesData.find(
          (employee: { id: number }) => employee.id === paid_by
        );
        return {
          key: id,
          balanceDue: (
            <Form.Item
              name={`${id}balanceDue`}
              initialValue={outstanding_payment}
            >
              <Text className="text-red-600">
                {Number(outstanding_payment).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                })}
                {/* <span className="text-gray-800">USD</span> */}
              </Text>
            </Form.Item>
          ),
          dateCreated: (
            <Form.Item name={`${id}narration`} initialValue={created_at}>
              <Text className="max-w-[200px]">{formattedDate(created_at)}</Text>
            </Form.Item>
          ),
          datePaid: (
            <Form.Item name={`${id}narration`} initialValue={date_paid}>
              <Text className="max-w-[200px]">{formattedDate(date_paid)}</Text>
            </Form.Item>
          ),
          fxRate: (
            <Form.Item name={`${id}narration`} initialValue={fx_rate}>
              <Text className="max-w-[200px]">{fx_rate}</Text>
            </Form.Item>
          ),
          narration: (
            <Form.Item name={`${id}narration`} initialValue={narration}>
              <Text className="max-w-[200px]">{narration}</Text>
            </Form.Item>
          ),
          paidBy: (
            <Form.Item name={`${id}paidBy`} initialValue={paid_by}>
              <Text>
                {allEmployeesData && paid_by && currentPaidByEmployee?.name}
              </Text>
            </Form.Item>
          ),
          paymentsNGN: (
            <Form.Item name={`${id}paymentsNGN`} initialValue={naira_payment}>
              <Text>
                {Number(naira_payment).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Form.Item>
          ),
          paymentsUSD: (
            <Form.Item name={`${id}paymentsUSD`} initialValue={dollar_payment}>
              <Text>
                {Number(dollar_payment).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Form.Item>
          ),
          updatedBy: (
            <Form.Item name={`${id}narration`} initialValue={updated_by.name}>
              <Text className="max-w-[200px]">{updated_by.name}</Text>
            </Form.Item>
          ),
          paymentProof: proof_of_payment_file,
        } as IPaymentItem;
      });
      setData(allPaymentDetails);
    }
    if (fxRatesData?.data) {
      setAllRatesData(fxRatesData.data);
    }
    if (allEmployees?.data) {
      setAllEmployeesData(allEmployees.data);
    }
  }, [
    paymentDetailsData,
    paymentDetailsData?.data,
    paymentDetailsLoading,
    allRatesData,
    allEmployeesData,
    updatingingPaymentDetail,
    fxRatesData,
    fxRatesLoading,
    allEmployees,
    allEmployeesLoading,
  ]);

  useEffect(() => {
    if (finStatementData?.data && finStatementData?.data[0]?.payment) {
      const finStatementPaymentDetails = finStatementData.data[0].payment;
      const { quote, amount_paid, outstanding_payment } =
        finStatementPaymentDetails;
      const {
        investment_route,
        local_prc_fee,
        quotation_total,
        country_investment_total,
      } = quote;
      setDataSourceFirst([
        {
          key: 1,
          item: `Total ${investment_route} Fee`,
          amount: country_investment_total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
        {
          key: 2,
          item: "Total Local Processing Fee",
          amount: local_prc_fee.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
        {
          key: 3,
          item: "Total Program Fee",
          amount: quotation_total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
      ]);
      setDataSourceSecond([
        {
          key: 1,
          item: "Total to be paid",
          amount: (+outstanding_payment - +amount_paid).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }
          ),
        },
        {
          key: 2,
          item: "Total Amount paid",
          amount: (+amount_paid).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
        {
          key: 3,
          item: "Balance Outstanding",
          amount: (+outstanding_payment).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }),
        },
      ]);
    }
  }, [selectedApplication, paymentsId, finStatementData, finStatementLoading]);

  useEffect(() => {
    console.log("paymentProof", paymentProofData?.data.proof_of_payment_file);
    console.log("fileData in effect", fileData);
    if (fileData?.data) {
      setFileDataUrl(fileData.data.path);
    }
  }, [
    data,
    fileData,
    fileUploading,
    dataSourceFirst,
    dataSourceSecond,
    currentDetailId,
    currentDetailIdForProof,
    paymentProofData,
    paymentProofLoading,
    preSelectedFile,
  ]);

  useEffect(() => {
    paymentCurrency === "enterUSD"
      ? modalForm.setFieldValue("paymentsNGN", null)
      : modalForm.setFieldValue("paymentsUSD", null);
  }, [paymentCurrency]);

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddNewOrEditPayment = async (values: any) => {
    // const fileUploadData = new FormData();
    // fileList.forEach((file) => {
    //   fileUploadData.append("files[]", file as RcFile);
    // });
    const selectedFile = Array.isArray(values.paymentProof)
      ? values.paymentProof[0]?.originFileObj
      : undefined;
    const newdatePaid = values.datePaid;
    console.log("selectedFile", selectedFile);

    if (fileList.length > 0) {
      fileMutate(
        {
          newData: { file: selectedFile },
          url: `${END_POINT.BASE_URL}/admin/upload-file`,
        },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description: error.response.data.message,
              duration: 5,
            });
          },
          onSuccess: (res: any) => {
            queryClient.invalidateQueries([
              QUERY_KEY_ALLPAYMENT_DETAILS,
              selectedFile,
            ]);
            if (!isEditingNewDetails) {
              addDetail(
                {
                  fx_rate: values.fxRate.label,
                  date_paid: newdatePaid,
                  paid_by: values.paidBy,
                  narration: values.narration,
                  dollar_payment: values.paymentsUSD
                    ? values.paymentsUSD
                    : values.paymentsNGN / values.fxRate.value,
                  naira_payment: values.paymentsNGN
                    ? values.paymentsNGN
                    : values.paymentsUSD * values.fxRate.value,
                  proof_of_payment_file: res.data.path,
                },
                paymentsId
              );
            } else {
              updateDetail({
                newData: {
                  fx_rate: values.fxRate || values.fxRate.label,
                  date_paid: newdatePaid,
                  paid_by: values.paidBy,
                  narration: values.narration,
                  dollar_payment: values.paymentsUSD
                    ? values.paymentsUSD
                    : values.paymentsNGN / values.fxRate.value,
                  naira_payment: values.paymentsNGN
                    ? values.paymentsNGN
                    : values.paymentsUSD * values.fxRate.value,
                  proof_of_payment_file: res.data.path,
                },
                paymentId: paymentsId,
                paymentDetailId: currentDetailId as number,
              });
            }
          },
        }
      );
    } else {
      updateDetail({
        newData: {
          fx_rate: values.fxRate || values.fxRate.label,
          date_paid: newdatePaid,
          paid_by: values.paidBy,
          narration: values.narration,
          dollar_payment: values.paymentsUSD
            ? values.paymentsUSD
            : values.paymentsNGN / values.fxRate.value,
          naira_payment: values.paymentsNGN
            ? values.paymentsNGN
            : values.paymentsUSD * values.fxRate.value,
          proof_of_payment_file: preSelectedFile as string,
        },
        paymentId: paymentsId,
        paymentDetailId: currentDetailId as number,
      });
    }
  };

  // TABLES
  type DataSource = {
    key: React.Key;
    item: string;
    amount: string;
  };
  const headColumnFirstTable: ColumnsType<DataSource> = [
    {
      key: "1",
      title: "Cost Profile",
      dataIndex: "costProfile",
      children: [
        { key: "item", dataIndex: "item" },
        { key: "amount", dataIndex: "amount" },
      ],
    },
  ];
  const headColumnSecondTable: ColumnsType<DataSource> = [
    {
      key: "1",
      title: "Account Summary",
      dataIndex: "accountSummary",
      children: [
        { key: "item", dataIndex: "item" },
        { key: "amount", dataIndex: "amount" },
      ],
    },
  ];

  // EDITABLE TABLE

  const editableColumns: ColumnsType<IPaymentItem> = [
    {
      title: "SN",
      render: (_: any, _record: IPaymentItem, index: number) => {
        return index + 1;
      },
    },
    { title: "Date Created", dataIndex: "dateCreated" },
    {
      title: "Narration",
      dataIndex: "narration",
    },
    { title: "Date Paid", dataIndex: "datePaid" },
    {
      title: "Paid By",
      dataIndex: "paidBy",
    },
    {
      title: "Fx Rate",
      dataIndex: "fxRate",
    },
    {
      title: "Payments USD",
      dataIndex: "paymentsUSD",
    },
    {
      title: "Payments NGN",
      dataIndex: "paymentsNGN",
    },
    {
      title: "Balance Due",
      dataIndex: "balanceDue",
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: IPaymentItem) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => {
                    setCurrentDetailIdForProof(record.key);
                    // setOpenDrawer(true);
                  }}
                >
                  <a href={record.paymentProof} target="_blank">
                    View Payment Proof
                  </a>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setCurrentDetailId(record.key);
                    const getPaymentDetails = {
                      // key: record.key,
                      narration: record.narration.props.initialValue,
                      paidBy: record.paidBy.props.initialValue,
                      fxRate: record.fxRate.props.initialValue || undefined,
                      paymentProof: record.paymentProof,
                      // dateCreated: record.dateCreated.props.initialValue,
                      datePaid: dayjs(record.datePaid.props.initialValue),
                      paymentsUSD: record.paymentsUSD.props.initialValue,
                      paymentsNGN: record.paymentsNGN.props.initialValue,
                      updatedBy: record.updatedBy.props.initialValue,
                      balanceDue: record.balanceDue.props.initialValue,
                    };
                    console.log(getPaymentDetails);
                    setPreSelectedFile(record.paymentProof);
                    const currentItem = data?.find(
                      (item) => item.key === record.key
                    );
                    const currentIndex =
                      currentItem && data?.indexOf(currentItem);
                    modalForm.setFieldsValue(getPaymentDetails);
                    setIndexEdited(currentIndex);
                    setIsEditingNewDetails(true);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item key="3">
                  <Link
                    to={
                      appRoute.generateReciept(record.key as unknown as number)
                        .path
                    }
                  >
                    Generate Receipt
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <a
                    href={`https://optiva-backend.techmur.com/api/admin/receipt/${
                      record.key as number
                    }/download-pdf`}
                    target="_blank"
                  >
                    Download Receipt
                  </a>
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
      <PageIntro title="Update Payment Details" linkBack={appRoute.payments} />

      <Skeleton active={allPaymentsLoading} loading={allPaymentsLoading}>
        {selectedApplication && (
          <div className="border-2 rounded-xl border-gray-100 p-2 md:p-6 xl:p-12 md:w-11/12">
            <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
              <div className="w-full pb-4">
                <p className="pb-2">Applicant ID</p>
                <Input
                  value={
                    selectedApplication.application.applicant
                      .applicant_unique_id
                  }
                  disabled
                  allowClear
                  className="p-2.5 "
                />
              </div>
              <div className="w-full pb-4">
                {/* addonBefore={prefixSelector} */}
                <p className="pb-2">Phone Number</p>
                <Input
                  value={selectedApplication.application.applicant.id}
                  disabled
                  allowClear
                  className="p-2.5"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
              <div className="w-full pb-4">
                <p className="pb-2">Applicant Name</p>
                <Input
                  value={selectedApplication.application.applicant.full_name}
                  disabled
                  allowClear
                  className="p-2.5"
                />
              </div>
              <div className="w-full pb-4">
                <p className="pb-2">Email</p>
                <Input
                  value={
                    selectedApplication.application.applicant.email_address
                  }
                  disabled
                  className="p-2.5"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full">
              <div className="w-full pb-4">
                <p className="pb-2">Number of Dependent(s)</p>
                <InputNumber
                  value={selectedApplication.application.no_of_dependents}
                  disabled
                  className="p-1.5 w-full"
                />
              </div>
              <div className="w-full pb-4">
                <p className="pb-2">Country</p>
                <Input
                  value={selectedApplication.application.country.country_name}
                  disabled
                  className="p-2.5"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-7 md:gap-10 w-full ">
              <div className="w-full pb-4">
                <p className="pb-2">Applicant Address</p>
                <div className="gap-x-4 grid grid-cols-2 ">
                  <div>
                    <p className="pb-2 text-xs">Street</p>
                    <Input value={16} disabled className="p-2.5" />
                  </div>
                  <div>
                    <p className="pb-2 text-xs">Apt/Floor/Suite</p>
                    <Input value={"2B"} disabled className="p-2.5" />
                  </div>
                  <div>
                    <p className="pb-2 text-xs">City</p>
                    <Input value={"Ikoyi"} disabled className="p-2.5" />
                  </div>
                  <div>
                    <p className="pb-2 text-xs">State</p>
                    <Input value={"Lagos"} disabled className="p-2.5" />
                  </div>
                  <div>
                    <p className="pb-2 text-xs">Country</p>
                    <Input value={"Nigeria"} disabled className="p-2.5" />
                  </div>
                  <div>
                    <p className="pb-2 text-xs">Zip/postal code</p>
                    <Input value={100244} disabled className="p-2.5" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="pb-4 w-full">
                  <p className="pb-2">Program Name</p>
                  <Input
                    value={
                      selectedApplication.application.programtype.program_name
                    }
                    disabled
                    className="p-2.5"
                  />
                </div>

                <div className="pb-4 w-full">
                  <p className="pb-2">Investment Route</p>
                  <Input
                    value={
                      selectedApplication.application.investmentroute
                        .investment_name
                    }
                    disabled
                    className="p-2.5 "
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Skeleton>

      {/* financial statement */}
      <div className="pt-4 sm:pt-0">
        <h3 className="font-medium text-lg ">Financial Statement</h3>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full pt-4">
          {/* table 1 */}
          <Table
            bordered={true}
            columns={headColumnFirstTable}
            dataSource={dataSourceFirst}
            className={`financialStatementTable w-full `}
            pagination={false}
            loading={finStatementLoading}
            size="middle"
          />

          {/* table 2 */}
          <Table
            bordered={true}
            columns={headColumnSecondTable}
            dataSource={dataSourceSecond}
            className="financialStatementTable w-full"
            pagination={false}
            loading={finStatementLoading}
            size="middle"
          />
        </div>
      </div>
      <AppButton
        type="button"
        label="Add New Payment Detail"
        containerStyle=" mt-6 ml-auto flex"
        handleClick={() => {
          setIsModalOpen(true);
          setIsEditingNewDetails(false);
        }}
      />
      <Form
        layout="vertical"
        name="updatePaymentDetails"
        onFinish={onFinish}
        className="flex flex-col"
      >
        {/* editable table */}
        <div
          className={`mt-3 sm:mt-5 ${
            (data?.length as number) > 0 && !paymentDetailsLoading
              ? ""
              : "hidden"
          } `}
        >
          <Table
            bordered
            dataSource={data}
            columns={editableColumns}
            scroll={{ x: 1000 }}
            loading={
              paymentDetailsLoading || allEmployeesLoading || fxRatesLoading
            }
          />
        </div>

        {/* buttons */}
        <div className="flex justify-end mt-4 gap-7 ">
          <AppButton
            variant="transparent"
            label="Cancel"
            type="button"
            containerStyle="px-4 py-3.5 text-base"
            handleClick={() => setData([])}
            isDisabled={(data?.length as number) > 0 ? false : true}
          />
          <AppButton
            variant="transparent"
            type="button"
            label="Generate Financial Statement"
            containerStyle="px-4 py-3.5 text-base"
            handleClick={() =>
              navigate(appRoute.financialStatement(Number(id) as number).path)
            }
          />
          <AppButton
            label="Save"
            type="submit"
            containerStyle="px-4 py-3.5 text-base"
            isDisabled={(data?.length as number) > 0 ? false : true}
          />
        </div>
      </Form>

      <Modal
        title={`${isEditingNewDetails ? "Edit" : "New"} Payment Details`}
        footer={null}
        open={isModalOpen}
        onCancel={() => {
          modalForm.resetFields();
          setIsModalOpen(false);
          setFileList([]);
          setPreSelectedFile(undefined);
        }}
      >
        {/* make everything compulsory */}
        <Form
          name="modalPaymentDetails"
          form={modalForm}
          layout="vertical"
          className="pt-8 px-4"
          onFinish={handleAddNewOrEditPayment}
        >
          <div className="flex gap-8">
            <Form.Item
              label={"Date Paid"}
              name="datePaid"
              rules={generalValidationRules}
            >
              <DatePicker />
            </Form.Item>
          </div>
          <div>
            <UploadFileComp
              label="Upload Payment Proof"
              name="paymentProof"
              rules={
                preSelectedFile && isEditingNewDetails
                  ? generalValidationRulesOpt
                  : [createFileValidationRule(fileRuleOptions)]
              }
              uploadProps={props}
            />
            {preSelectedFile && (
              <Text
                className={`p-1 bg-gray-200 border-2 rounded ${
                  fileList.length !== 0 && "hidden"
                }`}
              >
                {preSelectedFile}
              </Text>
            )}
            <FxRatesFormInput extraStyles="pt-6" />
          </div>
          <Form.Item
            name="paidBy"
            label={"Paid By"}
            rules={textInputValidationRules}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="narration"
            label={"Narration"}
            rules={textInputValidationRules}
          >
            <TextArea placeholder="Enter Narration" rows={4} />
          </Form.Item>
          <div className="flex gap-8">
            <Form.Item
              label={"Choose payment currency"}
              name="selectPaymentCurrency"
            >
              <Select
                defaultValue={"enterUSD"}
                onChange={(val) => {
                  setPaymentCurrency(val);
                }}
                options={[
                  { value: "enterUSD", label: "Enter USD payment" },
                  { value: "enterNGN", label: "Enter NGN payment" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label={"Payments USD"}
              name="paymentsUSD"
              rules={
                paymentCurrency === "enterUSD"
                  ? generalValidationRules
                  : generalValidationRulesOpt
              }
              className={`${paymentCurrency === "enterNGN" ? "hidden" : ""}`}
            >
              <InputNumber addonAfter="$" />
            </Form.Item>
            <Form.Item
              label={"Payments NGN"}
              name="paymentsNGN"
              className={`${paymentCurrency === "enterUSD" ? "hidden" : ""}`}
              rules={
                paymentCurrency === "enterNGN"
                  ? generalValidationRules
                  : generalValidationRulesOpt
              }
            >
              <InputNumber addonAfter="₦" />
            </Form.Item>
          </div>
          <AppButton
            type="submit"
            isLoading={
              addingPaymentDetail || updatingingPaymentDetail || fileUploading
            }
          />
        </Form>
      </Modal>
      {/* <Drawer
        title={`View Payment Proof`}
        placement="right"
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
        size={drawerSize}
      >
        <Skeleton loading={paymentProofLoading} active={paymentDetailsLoading}>
          {paymentProofData?.data && (
            // <img
            //   alt="payment-proof"
            //   src={`${paymentProofData?.data.proof_of_payment_file}`}
            // />

            //   <ViewFile docUrl={`https://optivateststorage.blob.core.windows.net/optiva/uploads/${encodeURIComponent(fileName)}`
            // } />

            // <iframe src={paymentProofData?.data.proof_of_payment_file} width="100%" height="600px"></iframe>

          )}
        </Skeleton>
      </Drawer> */}
    </>
  );
};

export default PaymentDetails;
