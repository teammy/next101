import AddDeviceForm from "../../components/AddDeviceForm";
import ListDevice from "../../components/ListDevice";
import Head from "next/head";

function DeviceList() {
  return (
    <>
     <Head>
      <title>เพิ่ม/แก้ไข อุปกรณ์</title>
    </Head>
    <AddDeviceForm />
    <div>
      Device List Page
    </div>
    <ListDevice />
    </>
  );
}

export default DeviceList;