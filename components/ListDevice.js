import { useState, useEffect,useRef } from "react";
import DataTable from "react-data-table-component";
import { Button, useToast } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import htmlToImage from 'html-to-image';
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
dayjs.locale("th");




const ListDevice = ({ listData,fetchData  }) => {
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(listData);
  const componentRef = useRef(); 


  useEffect(() => {
    setFilteredItems(
      listData.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.includes(filterText)
        )
      )
    );
  }, [listData, filterText]);

  function DownloadQRButton({ qrData, detailData }) {
    const qrRef = useRef();
  
    const downloadQR = () => {
      const svgElement = qrRef.current.childNodes[0];
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement("canvas");
    
      // Manually set the width and height of the canvas
      canvas.width = 256; // The size of QR code (128x128)
      canvas.height = 256; // The size of QR code (128x128)
    
      const ctx = canvas.getContext("2d");
      const image = new Image();
      
      image.onload = function () {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pngImageURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngImageURL;
        downloadLink.download = `${detailData}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
    
  
    return (
      <div>
        <div ref={qrRef} style={{display: 'none'}}>
        <QRCode value={qrData} size={256} title="aaaaa" />
      </div>
      <Button colorScheme="green" onClick={downloadQR}>โหลด QRCode</Button>
      </div>
    );
  }

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
      cell: (row) => (row.equip_building_name),
      sortable: true,
    },
    {
      name: "ชั้น",
      cell: (row) => (row.equip_floor_value),
      sortable: true,
    },
    {
      name: "หน่วยงาน",
      cell: row => (row.equip_department_name),
      sortable: true,
    },
    {
      name: "บริเวณติดตั้ง",
      cell: (row) => (row.equip_location_install),
      sortable: true,
    },
    {
      name: "ชนิด",
      cell: (row) => (row.equip_type_name),
      sortable: true,
    },
    {
      name: "วันบรรจุก๊าซ",
      cell: (row) => dayjs(row.equip_date_start).format("D MMM BBBB"),
      sortable: true,
    },
    {
      name: "วันหมดอายุ",
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
    {
      button: true,
      // cell: (row) => (
      //   <ReactToPrint
      //     trigger={() => <button>Print QR</button>}
      //     content={() => componentRef.current}
      //   >
      //   <ComponentToPrint 
      //       ref={componentRef} // Pass down the ref
      //       qrData={row.qrData} 
      //       detailData={row.detailData}
      //     />
      //   </ReactToPrint>
      // ),
      cell: (row) => (
        <DownloadQRButton qrData={`https://jsonplaceholder.typicode.com/posts/${row.equip_id}`} detailData={row.equip_id} />
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
