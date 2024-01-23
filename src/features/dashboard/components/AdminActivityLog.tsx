import { Empty, Skeleton } from "antd";
import dayjs from "dayjs";
import { useGetAdminActivityLog } from "../hooks/useGetAdminActivityLog";

export const AdminActivityLog = () => {
  const { data, isLoading } = useGetAdminActivityLog();

  return (
    <div className="rounded shadow-sm border p-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-play-fill text-lg"></i>
          <span className="text-base">Latest Activities</span>
        </div>
      </div>

      <table className="w-full text-left mt-2">
        <thead>
          <tr className="bg-gray-200 text-sm rounded">
            <th className="py-1 font-normal pl-2">Date</th>
            <th className="py-1 font-normal">User</th>
            <th className="py-1 font-normal pr-2">Details</th>
          </tr>
        </thead>
        <tbody>
          <Skeleton active loading={isLoading} className="mt-3">
            {data?.length === 0 ? (
              <div className="flex justify-center mt-10">
                <Empty />
              </div>
            ) : (
              data?.map((item) => (
                <tr key={item.id} className="text-xs text-accent">
                  <td className="p-[5px]">
                    {dayjs(item?.created_at).format("YYYY/MM/DD HH:mm a")}
                  </td>
                  <td className="p-[5px]">{item?.user?.name}</td>
                  <td className="p-[5px]">
                   {item?.action_type} {item?.item}
                  </td>
                </tr>
              ))
            )}
          </Skeleton>
        </tbody>
      </table>
    </div>
  );
};
