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
  Icon
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react';

function ViewDeviceById() {
  const router = useRouter()
  const { id } = router.query

  const [device, setDevice] = useState([]);

  useEffect(() => {
    const getDevice = async () => {
      const res = await fetch(`/api/device/getDeviceById?id=${id}`);
      const newDevice = await res.json();
      setDevice(newDevice);
    }
    getDevice();
  }, [id]);



  return (
    <div>

      <h1>การตรวจสอบถังดับเพลิง</h1>
      <ul>
        {device.map(item => (
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
  <Table variant='simple'>
    <TableCaption>ถังดับเพลิงหมดอายุวันที่<br/>หากตรวจสอบพบความผิดปกติให้แจ้งเจ้าหน้าที่หน่วยซ่อมบำรุง<br/>เบอร์โทรศัพท์ภายใน โทร.1152<br/><b><u><Link href={`/checkDevice/${id}`}>สำหรับเจ้าหน้าที่</Link></u></b></TableCaption>

    <Thead >
      <Tr>
        <Th>วันที่ตรวจสอบ</Th>
        <Th>มาตรวัดชี้ที่สีเขียว</Th>
        <Th>มีห่วงมีสายรัด</Th>
        <Th>ปลายสายปกติ</Th>
        <Th>ผู้ตรวจสอบ</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td> <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box></Td>
        <Td> <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box></Td>
        <Td>25.4</Td>
        <Td>25.4</Td>
        <Td>25.4</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
    </div>
  );
}

export default ViewDeviceById;