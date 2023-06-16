import { useEffect,useState } from "react";  
import AddDeviceForm from "../../../components/AddDeviceForm";
import ListDeviceReport from "../../../components/ListDeviceReport";
import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";
import { Heading,Text } from '@chakra-ui/react'

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
          <Text fontSize='2xl' color='#0040b2' mb={2}>รายงานการตรวจสอบ</Text>
          <ListDeviceReport listData={listData} fetchData={fetchData} />
        </MainContent>
      </Sidebar>
    </>
  );
}

export default DeviceList;
