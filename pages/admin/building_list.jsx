import AddBuildingForm from "components/AddBuildingForm";
import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";
import { Text } from '@chakra-ui/react'

function Buildinglist() {
  return (
    <>
      <Sidebar>
        <MainContent>
          <Text fontSize='2xl' color='#0040b2' mb={2}>เพิ่ม/แก้ไข อาคาร</Text>
          <AddBuildingForm />
        </MainContent>
      </Sidebar>
      <div>Enter</div>
    </>
  );
}

export default Buildinglist;
