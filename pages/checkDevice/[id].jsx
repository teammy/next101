import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import {
  Box,
  useToast,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Button,
  FormLabel,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import Header from "components/Header";
import dayjs from "dayjs";
import "dayjs/locale/th";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
dayjs.locale("th");

function CheckDevicePage() {
  const [device, setDevice] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState({
    reviewer: "",
    question1: "normal",
    question2: "normal",
    question3: "normal",
    device_id: "",
  });

  useEffect(() => {
    const getDevice = async () => {
      const res = await fetch(`/api/device/getDeviceById?id=${id}`);
      const newDevice = await res.json();
      setDevice(newDevice);
    };
    getDevice();
    if (id) {
      setState((prevState) => ({
        ...prevState,
        device_id: id,
      }));
    }
  }, [id]);

  const handleOptionChange = (question, value) => {
    setState((prevState) => ({ ...prevState, [question]: value }));
  };

  const handleInputChange = (event) => {
    setState((prevState) => ({ ...prevState, reviewer: event.target.value }));
  };
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.reviewer) {
      toast({
        title: "กรุณาพิมพ์ชื่อผู้ตรวจสอบ",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const response = await fetch("/api/add-check-device", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });

        if (response.status === 200) {
          // console.log("Success to add data");
          toast({
            title: "บันทึกข้อมูลสำเร็จ",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top",
          });
          // redirect to another page
          // redirect(`/viewDevice/${id}`);
          setTimeout(() => {
            router.push(`/viewDevice/${id}`);
          }, 1000);
        } else {
          console.log("Failed to add data");
          // Handle failure
          toast({
            title: "บันทึกข้อมูลไม่สำเร็จ",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.log(error);
        // Handle error
      }
    }
  };

  return (
    <>
      <div className="bg-grey">
        <Header />
        <Box
          textAlign="left"
          w="100%"
          mt={1}
          pl={3}
          color="#002d63"
          fontWeight={100}
        >
          <Heading size="lg" fontWeight={400}>
            รายละเอียดอุปกรณ์
          </Heading>
        </Box>
        <Flex alignItems="center" justifyContent="center">
          <Box
            bg="white"
            w="95%"
            p={4}
            mt={2}
            mb={2}
            color="#002d63"
            className="content-styled"
            boxShadow={"base"}
          >
            {device.map((item) => (
              <div key={item.equip_id}>
                {/* Display the desired data fields */}
                <p>ชนิดถัง: {item.equip_type_name}</p>
              <p>อาคาร: {item.equip_building_name} {item.equip_floor_value}</p>
              <p>บริเวรณติดตั้ง: {item.equip_location_install}</p>
              <p>วันบรรจุก๊าซ: {dayjs(item.equip_date_start).format("D MMM BBBB")}</p>
              <p>วันหมดอายุ: {dayjs(item.equip_date_expire).format("D MMM BBBB")}</p>
                {/* Add more fields as needed */}
              </div>
            ))}
          </Box>
        </Flex>
        <Box
          textAlign="left"
          w="100%"
          mt={1}
          pl={3}
          color="#002d63"
          fontWeight={100}
        >
          <Heading size="lg" fontWeight={400}>
            รายการตรวจสอบ
          </Heading>
        </Box>
        <Flex alignItems="center" justifyContent="center">
          <Box
            bg="white"
            boxShadow={"base"}
            w="95%"
            p={4}
            mt={2}
            mb={2}
            color="black"
            className="content-styled"
            as="form"
            onSubmit={handleSubmit}
          >
            <VStack spacing={2}>
              <FormLabel>
                <Text fontSize="xl" color="#002d63">
                  มาตรวัดชี้ที่สีเขียว หรือไม่?
                </Text>
                <RadioGroup
                  defaultValue='normal'
                  onChange={(value) => handleOptionChange("question1", value)}
                  value={state.question1}
                >
                  <Radio value="normal" pr={6}>
                    <Text fontSize="xl" color="#002d63">
                      ปกติ
                    </Text>
                  </Radio>
                  <Radio value="abnormal">
                    <Text fontSize="xl" color="#002d63">
                      ไม่ปกติ
                    </Text>
                  </Radio>
                </RadioGroup>
              </FormLabel>

              <FormLabel>
                <Text fontSize="xl" color="#002d63">
                  มีห่วงและสายรัด หรือไม่?
                </Text>
                <RadioGroup
                  defaultValue="normal"
                  onChange={(value) => handleOptionChange("question2", value)}
                  value={state.question2}
                >
                  <Radio value="normal" pr={6}>
                    <Text fontSize="xl" color="#002d63">
                      ปกติ
                    </Text>
                  </Radio>
                  <Radio value="abnormal">
                    <Text fontSize="xl" color="#002d63">
                      ไม่ปกติ
                    </Text>
                  </Radio>
                </RadioGroup>
              </FormLabel>

              <FormLabel>
                <Text fontSize="xl" color="#002d63">
                  ปลายสายอยู่ในสภาพปกติ หรือไม่?
                </Text>
                <RadioGroup
                  defaultValue="normal"
                  onChange={(value) => handleOptionChange("question3", value)}
                  value={state.question3}
                >
                  <Radio value="normal" pr={6}>
                    <Text fontSize="xl" color="#002d63">
                      ปกติ
                    </Text>
                  </Radio>
                  <Radio value="abnormal">
                    <Text fontSize="xl" color="#002d63">
                      ไม่ปกติ
                    </Text>
                  </Radio>
                </RadioGroup>
              </FormLabel>

              <FormLabel isRequired>
                <Text fontSize="xl" color="#002d63" mb={1}>
                  ผู้ตรวจสอบ
                </Text>
                <Input
                  type="text"
                  placeholder="พิมพ์ชื่อผู้ตรวจสอบ"
                  value={state.reviewer}
                  onChange={handleInputChange}
                  mb={2.5}
                />
              </FormLabel>

              <Button
                type="submit"
                width="100%"
                color="white"
                fontWeight="500"
                fontSize="lg"
                backgroundColor="#0050f0"
              >
                บันทึกข้อมูล
              </Button>
            </VStack>
          </Box>
        </Flex>
      </div>
    </>
  );
}

export default CheckDevicePage;
