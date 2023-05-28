import { useEffect,useState } from "react";  
import AddDeviceForm from "../../components/AddDeviceForm";
import ListDevice from "../../components/ListDevice";
import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";

function DeviceList() {
  const [listData, setListData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/device/list-device');
      const responseData = await response.json();
      setListData(responseData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Sidebar>
        <MainContent>
          <AddDeviceForm fetchData={fetchData} />
          <ListDevice listData={listData} fetchData={fetchData} />
        </MainContent>
      </Sidebar>
    </>
  );
}

export default DeviceList;
