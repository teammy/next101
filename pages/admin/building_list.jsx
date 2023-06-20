import AddBuildingForm from "components/AddBuildingForm";
import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";
import { Text } from '@chakra-ui/react'
import Head from "next/head";

function Buildinglist() {
  return (
    <>
    <Head>
      <title>เพิ่ม/แก้ไข อาคาร</title>
    </Head>
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
