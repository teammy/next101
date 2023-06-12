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
} from "@chakra-ui/react";

function CheckDevicePage() {
  const [device, setDevice] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState({
    reviewer: "",
    question1: "",
    question2: "",
    question3: "",
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
  };

  return (
    <>
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
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormLabel>
            <Text>มาตรวัดชี้ที่สีเขียว หรือไม่?</Text>
            <RadioGroup
              onChange={(value) => handleOptionChange("question1", value)}
              value={state.question1}
            >
              <Radio value="normal">ปกติ</Radio>
              <Radio value="abnormal">ไม่ปกติ</Radio>
            </RadioGroup>
          </FormLabel>

          <FormLabel>
            <Text>มีห่วงและสายรัด หรือไม่?</Text>
            <RadioGroup
              onChange={(value) => handleOptionChange("question2", value)}
              value={state.question2}
            >
              <Radio value="normal">ปกติ</Radio>
              <Radio value="abnormal">ไม่ปกติ</Radio>
            </RadioGroup>
          </FormLabel>

          <FormLabel>
            <Text>ปลายสายอยู่ในสภาพปกติ หรือไม่?</Text>
            <RadioGroup
              onChange={(value) => handleOptionChange("question3", value)}
              value={state.question3}
            >
              <Radio value="normal">ปกติ</Radio>
              <Radio value="abnormal">ไม่ปกติ</Radio>
            </RadioGroup>
          </FormLabel>

          <FormLabel>
            <Text>ผู้ตรวจสอบ</Text>
            <Input
              type="text"
              placeholder="Enter your name"
              value={state.reviewer}
              onChange={handleInputChange}
            />
          </FormLabel>

          <Button type="submit" colorScheme="blue">
            บันทึก
          </Button>
        </VStack>
      </Box>
    </>
  );
}

export default CheckDevicePage;
