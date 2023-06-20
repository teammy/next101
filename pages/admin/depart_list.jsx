import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";
import AddDepartForm from "components/AddDepartForm";
import { Text } from '@chakra-ui/react'
import Head from "next/head";

function DepartList() {
  return (
    <>
    <Head>
      <title>เพิ่ม/แก้ไข หน่วยงาน</title>
    </Head>
      <Sidebar>
        <MainContent>
          <Text fontSize='2xl' color='#0040b2' mb={2}>เพิ่ม/แก้ไข หน่วยงาน</Text>
          <AddDepartForm />
        </MainContent>
      </Sidebar>
      <div>Enter</div>
    </>
  );
}

export default DepartList;