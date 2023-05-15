import AddDeviceForm from "../../components/AddDeviceForm";
import ListDevice from "../../components/ListDevice";

function DeviceList() {
  return (
    <>
    <AddDeviceForm />
    <div>
      Device List Page
    </div>
    <ListDevice />
    </>
  );
}

export default DeviceList;