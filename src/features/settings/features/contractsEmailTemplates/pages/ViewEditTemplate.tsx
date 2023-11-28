import { useParams } from "react-router-dom";
import SettingsTemplate from "../components/SettingsTemplate"

const ViewEditTemplate = () => {
  const { name, id } = useParams();
  const itemId = Number(id);
  return (
    <>
          <SettingsTemplate title={name as string} id={itemId} name={name as string}/>
    </>
  );
}

export default ViewEditTemplate;