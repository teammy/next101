import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Icon,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "components/Header";
import dayjs from "dayjs";
import "dayjs/locale/th";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
dayjs.locale("th");


function ViewDeviceById() {
  const router = useRouter();
  const { id } = router.query;

  const [device, setDevice] = useState([]);
  const [checkDevice, setCheckDevice] = useState([]);

  useEffect(() => {
    const getDevice = async () => {
      const res = await fetch(`/api/device/getDeviceById?id=${id}`);
      const newDevice = await res.json();
      setDevice(newDevice);
    };
    getDevice();

    const getCheckDevice = async () => {
      const res = await fetch(`/api/device/getCheckDevice?id=${id}`);
      const newCheckDevice = await res.json();
      setCheckDevice(newCheckDevice);
    }
    getCheckDevice();
  }, [id]);

  return (
    <div>
      <Header />
      <h1>การตรวจสอบถังดับเพลิง</h1>
      <ul>
        {device.map((item) => (
          <li key={item.equip_id}>
            {/* Display the desired data fields */}
            <p>ชนิดถัง: {item.equip_type_name}</p>
            <p>บริเวณที่ติดตั้ง: {item.equip_building_name}</p>
            <p>อาคาร: {item.equip_location_install}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            ถังดับเพลิงหมดอายุวันที่
            <br />
            หากตรวจสอบพบความผิดปกติให้แจ้งเจ้าหน้าที่หน่วยซ่อมบำรุง
            <br />
            เบอร์โทรศัพท์ภายใน โทร.1152
            <br />
            <b>
              <u>
                <Link href={`/checkDevice/${id}`}>สำหรับเจ้าหน้าที่</Link>
              </u>
            </b>
          </TableCaption>

          <Thead>
            <Tr>
              <Th>วันที่ตรวจสอบ</Th>
              <Th>มาตรวัดชี้ที่สีเขียว</Th>
              <Th>มีห่วงมีสายรัด</Th>
              <Th>ปลายสายปกติ</Th>
              <Th>ผู้ตรวจสอบ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {checkDevice.map((item) => (
              <Tr key={item.equip_check_id}>
                <Td>{dayjs(item.equip_check_timestamp).format("D MMM BBBB")}</Td>
                <Td>
                  {item.equip_check_point1 === "normal" ? (
                    <Box color="green.400" px={2}>
                      <CheckIcon />
                    </Box>
                  ) : (
                    <Box color="red.400" px={2}>
                      <CloseIcon />
                    </Box>
                  )}
                </Td>
                <Td>
                  {item.equip_check_point2 === "normal" ? (
                    <Box color="green.400" px={2}>
                      <CheckIcon />
                    </Box>
                  ) : (
                    <Box color="red.400" px={2}>
                      <CloseIcon />
                    </Box>
                  )}
                </Td>
                <Td>
                  {item.equip_check_point3 === "normal" ? (
                    <Box color="green.400" px={2}>
                      <CheckIcon />
                    </Box>
                  ) : (
                    <Box color="red.400" px={2}>
                      <CloseIcon />
                    </Box>
                  )}
                </Td>
                <Td>{item.equip_check_name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewDeviceById;
