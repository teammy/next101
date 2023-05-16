import AddBuildingForm from "components/AddBuildingForm";
import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";
import { Text } from '@chakra-ui/react'

function Buildinglist() {
  return (
    <>
      <Sidebar>
        <MainContent>
          <Text fontSize='2xl'>เพิ่ม/แก้ไข อาคารสถานที่</Text>
          <AddBuildingForm />
        </MainContent>
      </Sidebar>
      <div>Enter</div>
    </>
  );
}

export default Buildinglist;
