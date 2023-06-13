import {
  Box,
  Icon,
  Flex,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
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
    };
    getCheckDevice();
  }, [id]);

  return (
    <div className="bg-grey">
      <Header />
      <Box textAlign="left" w="100%" mt={1} pl={3} color="#002d63" fontWeight={100}>
      <Heading size="lg" fontWeight={400}>รายละเอียดอุปกรณ์</Heading>
      </Box>
      <Flex alignItems="center" justifyContent="center">
        <Box
          bg="white"
          w="95%"
          p={4}
          mt={2}
          mb={2}
          color="black"
          className="content-styled"
        >
          {device.map((item) => (
            <div key={item.equip_id}>
              {/* Display the desired data fields */}
              <p>ชนิดถัง: {item.equip_type_name}</p>
              <p>บริเวณที่ติดตั้ง: {item.equip_building_name}</p>
              <p>อาคาร: {item.equip_location_install}</p>
              <p>วันหมดอายุ: {dayjs(item.equip_item_date_expire).format("D MMM BBBB")}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </Box>
      </Flex>
      <Box textAlign="left" w="100%" mt={1} pl={3} color="#002d63" fontWeight={100}>
      <Heading size="lg" fontWeight={400}>ประวัติการตรวจเช็ค</Heading>
      </Box>
      <Flex alignItems="center" justifyContent="center">
        <Box
          bg="white"
          w="95%"
          p={4}
          mt={2}
          mb={2}
          color="black"
          className="content-styled"
        >
          <Accordion allowMultiple>
   
            {checkDevice.map((item) => (
              <AccordionItem key={item.equip_check_id}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {dayjs(item.equip_check_timestamp).format("D MMM BBBB")}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    <ListItem>
        
                      {item.equip_check_point1 === "normal" ? (
            
                        <Box color="green.500" px={2}>
                          <ListIcon as={CheckIcon} color="green.500" /> มาตรวัดชี้ที่สีเขียว
                        </Box>
                      ) : (
                        <Box color="red.500" px={2}>
                          <ListIcon as={CloseIcon} color="red.500" /> มาตรวัดชี้ที่สีเขียว
                        </Box>
                      )}
                    </ListItem>
                    <ListItem>
                      {item.equip_check_point2 === "normal" ? (
                        <Box color="green.500" px={2}>
                          <ListIcon as={CheckIcon} color="green.500" /> มีห่วงมีสายรัด
                        </Box>
                      ) : (
                        <Box color="red.500" px={2}>
                          <ListIcon as={CloseIcon} color="red.500" /> มีห่วงมีสายรัด
                        </Box>
                      )}
                    </ListItem>
                    <ListItem>
                      
                      {item.equip_check_point3 === "normal" ? (
                        <Box color="green.500" px={2}>
                          <ListIcon as={CheckIcon} color="green.500" /> ปลายสายปกติ
                        </Box>
                      ) : (
                        <Box color="red.500" px={2}>
                          <ListIcon as={CloseIcon} color="red.500" /> ปลายสายปกติ
                        </Box>
                      )}
                    </ListItem>
                    <ListItem>
                      ผู้ตรวจสอบ: {item.equip_check_name}
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Box textAlign="center" w="95%" p={4} mt={1} mb={2} color="#585858">
        หากพบความผิดปกติ กรุณาโทรแจ้งหน่วยซ่อมบำรุง<br/>เบอรโทรศัพท์ภายใน โทร.1152<br/><i><u><Link href={`/checkDevice/${id}`}>สำหรับเจ้าหน้าที่</Link></u></i>
          </Box>
      </Flex>
    </div>
  );
}

export default ViewDeviceById;
