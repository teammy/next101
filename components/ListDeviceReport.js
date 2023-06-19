import { useState, useEffect,useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import { Box, Button, useToast,Flex,Input,InputGroup,InputLeftElement } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import {FiSearch,FiTrash2} from "react-icons/fi";
import {BsThreeDots} from "react-icons/bs";
import { ImQrcode } from "react-icons/im";
import htmlToImage from 'html-to-image';
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
dayjs.locale("th");




const ListDeviceReport = ({ listData,fetchData  }) => {
  const router = useRouter();
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(listData);
  const componentRef = useRef(); 

  const customStylesDatatable = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize: '1.2rem',
            color: '#A9ADB1',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize: '1.1rem',
        },
    },
};


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
      <Button colorScheme="green" onClick={downloadQR} fontSize="lg" fontWeight="normal"><ImQrcode /></Button>
      </div>
    );
  }

  // Delete item function
  const toast = useToast();
  const [device, setDevice] = useState([]);
  const [checkDevice, setCheckDevice] = useState([]);
  const handleReport = async (itemid) => {
    router.push(`/admin/report-device/${itemid}`);
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
        <Button fontWeight="normal" fontSize="xl" bgColor="#E2E2E4" onClick={() => handleReport(row.equip_id)}>
          <BsThreeDots />
        </Button>
      ),
    },

  ];

  const handleSearch = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div>
      <Box mt={4} p={3} bg='white' borderRadius="xl" boxShadow="base">
      <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <FiSearch color='gray.300' />
    </InputLeftElement>
    <Input type='text' placeholder='ค้นหาอุปกรณ์...' w={400} value={filterText}
        onChange={handleSearch} />
  </InputGroup>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        customStyles={customStylesDatatable}
      />
      </Box>
    </div>
  );
};

export default ListDeviceReport;
