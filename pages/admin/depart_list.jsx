import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";
import AddDepartForm from "components/AddDepartForm";
import { Text } from '@chakra-ui/react'

function DepartList() {
  return (
    <>
      <Sidebar>
        <MainContent>
          <Text fontSize='2xl'>เพิ่ม/แก้ไข อาคารสถานที่</Text>
          <AddDepartForm />
        </MainContent>
      </Sidebar>
      <div>Enter</div>
    </>
  );
}

export default DepartList;