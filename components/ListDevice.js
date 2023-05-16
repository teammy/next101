import { useState,useEffect } from "react";
import DataTable from 'react-data-table-component';

const ListDevice = () => {
  const [listdata, setListData] = useState([]);
  const handleSelectRowsChange = (state) => {
    console.log("Selected Rows: ", state.selectedRows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/device/list-device');
      const responseData = await response.json();
      setListData(responseData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const columns = [
    {
      name: 'อาคาร',
      selector: 'equip_department',
      sortable: true,
    },
    {
      name: 'ชั้น',
      selector: 'equip_department',
      sortable: true,
    },
    {
      name: 'หน่วยงาน',
      selector: 'equip_id',
      sortable: true,
    },
    {
      name: 'บริเวณติดตั้ง',
      selector: 'equip_type',
      sortable: true,
    },
    {
      name: 'วันบรรจุก๊าซ',
      selector: 'equip_type',
      sortable: true,
    },
    {
      name: 'วันหมดอายุ',
      selector: 'equip_type',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'equip_type',
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        title="Data List"
        columns={columns}
        data={listdata}
        pagination
        selectableRows
        onSelectedRowsChange={handleSelectRowsChange}
      />
    </div>
  );
}

export default ListDevice;