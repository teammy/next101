import AddDeviceForm from "../../components/AddDeviceForm";
import ListDevice from "../../components/ListDevice";
import Sidebar from "components/Sidebar";
import MainContent from "components/MainContent";

function DeviceList() {
  return (
    <>
      <Sidebar>
        <MainContent>
          <AddDeviceForm />
          <ListDevice />
        </MainContent>
      </Sidebar>
    </>
  );
}

export default DeviceList;
