import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
import "dayjs/locale/th";
dayjs.locale("th");

const ListDevice = ({ listData,fetchData }) => {
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(listData);

  useEffect(() => {
    setFilteredItems(
      listData.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.includes(filterText)
        )
      )
    );
  }, [listData, filterText]);

  // Delete item function
  const toast = useToast();
  const handleDelete = async (itemid) => {
    try {
      const response = await fetch("/api/device/delete-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( itemid ),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast({
          title: "ลบข้อมูลสำเร็จ",
          description: responseData.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        fetchData();; // Refresh the data after successful deletion
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      toast({
        title: "Data Deletion",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // Column setup for data table
  const columns = [
    {
      name: "อาคาร",
      selector: "equip_building_name",
      sortable: true,
    },
    {
      name: "ชั้น",
      selector: "equip_floor_value",
      sortable: true,
    },
    {
      name: "หน่วยงาน",
      selector: "equip_department_name",
      sortable: true,
    },
    {
      name: "บริเวณติดตั้ง",
      selector: "equip_location_install",
      sortable: true,
    },
    {
      name: "ชนิด",
      selector: "equip_type_name",
      sortable: true,
    },
    {
      name: "วันบรรจุก๊าซ",
      selector: "equip_date_start",
      cell: (row) => dayjs(row.equip_date_start).format("D MMM BBBB"),
      sortable: true,
    },
    {
      name: "วันหมดอายุ",
      selector: "equip_date_expire",
      cell: (row) => dayjs(row.equip_date_expire).format("D MMM BBBB"),
      sortable: true,
    },
    {
      button: true,
      cell: (row) => (
        <Button colorScheme="red" onClick={() => handleDelete(row.equip_id)}>
          ลบ
        </Button>
      ),
    },
  ];

  const handleSearch = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ค้นหา..."
        value={filterText}
        onChange={handleSearch}
      />
      <DataTable
        title="Data List"
        columns={columns}
        data={filteredItems}
        pagination
      />
    </div>
  );
};

export default ListDevice;
