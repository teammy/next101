import { useState, useCallback, useEffect, useRef } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Box,
  Button,
  useToast,
  Center,
  Text,
  Square
} from "@chakra-ui/react";
import {FiPlusCircle,FiTrash2} from "react-icons/fi";
import { ThaiDatePicker } from "thaidatepicker-react";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");

const AddDataForm = (props) => {
  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [buildingList, setBuildingList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [data, setData] = useState({
    equip_type: "",
    equip_depart: "",
    equip_location: "",
  });

  useEffect(() => {
    fetchBuildingData();
    fetchTypeData();
    fetchDepartmentData();
    fetchFloorData();
  }, []);

  const fetchBuildingData = async () => {
    try {
      const response = await fetch("/api/building/list-building");
      const responseData = await response.json();
      setBuildingList(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await fetch("/api/department/list-department");
      const responseData = await response.json();
      setDepartmentList(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchTypeData = async () => {
    try {
      const response = await fetch("/api/type/list-type");
      const responseData = await response.json();
      setTypeList(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchFloorData = async () => {
    try {
      const response = await fetch("/api/floor/list-floor");
      const responseData = await response.json();
      setFloorList(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartDateChange = (christDate) => {
    setStartDate(christDate);
  };

  const handleEndDateChange = (christDate) => {
    setExpireDate(christDate);
  };

  const toast = useToast();
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      equip_type: e.target.elements.equip_type.value,
      equip_department: e.target.elements.equip_department.value,
      equip_floor: e.target.elements.equip_floor.value,
      equip_location: data.equip_location,
      equip_date_start: startDate,
      equip_date_expire: expireDate,
      equip_building: e.target.elements.equip_building.value,
    };

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        toast({
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    }


    fetch("/api/device/add-device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: "บันทึกข้อมูลสำเร็จ",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });

          // Clear the form fields
          setStartDate("");
          setExpireDate("");
          setData({
            equip_type: "",
            equip_depart: "",
            equip_location: "",
          });
          // Reset the form fields
          formRef.current.reset();
          props.fetchData();
        } else {
          toast({
            title: "บันทึกข้อมูลไม่สำเร็จ",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
  };

  return (
    <>
      <Box margin="auto"  bg='white' borderRadius="xl" boxShadow="base" p={3}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <Flex direction="row">
            <FormControl flex="1" mr={4}>
              <FormLabel>อาคาร</FormLabel>
              <Select placeholder="-- เลือกอาคาร --" name="equip_building">
                {buildingList.map((item) => (
                  <option
                    key={item.equip_building_id}
                    value={item.equip_building_id}
                  >
                    {item.equip_building_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl flex="1" mr={4}>
              <FormLabel>ชั้น</FormLabel>
              <Select placeholder="-- เลือกชั้น --" name="equip_floor">
                {floorList.map((item) => (
                  <option key={item.equip_floor_id} value={item.equip_floor_id}>
                    {item.equip_floor_value}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl flex="1" mr={4}>
              <FormLabel>หน่วยงาน</FormLabel>
              <Select placeholder="-- เลือกหน่วยงาน --" name="equip_department">
                {departmentList.map((item) => (
                  <option
                    key={item.equip_department_id}
                    value={item.equip_department_id}
                  >
                    {item.equip_department_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl flex="1" mr={4}>
              <FormLabel>สถานที่ติดตั้ง</FormLabel>
              <Input
                type="text"
                onChange={handleChange}
                value={data.equip_location}
                name="equip_location"
                id="equip_location"
              />
            </FormControl>
            <FormControl flex="1" mr={4}>
              <FormLabel>ชนิด</FormLabel>
              <Select placeholder="-- เลือกชนิด --" name="equip_type">
                {typeList.map((item) => (
                  <option key={item.equip_type_id} value={item.equip_type_id}>
                    {item.equip_type_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl flex="1" mr={4}>
              <FormLabel>วันที่บรรจุก๊าซ</FormLabel>
              <ThaiDatePicker
                name="equip_date_start"
                id="equip_date_start"
                value={startDate}
                onChange={handleStartDateChange}
                inputProps={{
                  placeholder: "วันที่อัดก๊าซ",
                  displayFormat: "D MMMM YYYY",
                }}
              />
            </FormControl>
            <FormControl flex="1" mr={4}>
              <FormLabel>วันที่หมดอายุ</FormLabel>
              <ThaiDatePicker
                id="equip_date_expire"
                value={expireDate}
                onChange={handleEndDateChange}
                inputProps={{
                  placeholder: "วันที่หมดอายุ",
                  displayFormat: "D MMMM YYYY",
                }}
              />
            </FormControl>
          </Flex>
          <Flex direction="row">
          <Button mt={4} color="white" type="submit" fontWeight="normal" fontSize="xl" bgGradient='linear(to-r, #f59120 3.89%, #fa5645 103.33%)' 
          _hover={{
            bgGradient:'linear(to-r, #f59120 3.89%, #fa5645 103.33%)',
            color: 'white',
            fontSize: 'xl',
          }}
          >
           <Box as={FiPlusCircle} mr={1.5} />
            เพิ่มอุปกรณ์
          </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};
export default AddDataForm;
