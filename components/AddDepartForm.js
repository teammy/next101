import { useState, useEffect } from "react";
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
  Button,
  Input,
  Select,
  Box, FormControl, FormLabel,Flex 
} from "@chakra-ui/react";
import {FiPlusCircle,FiTrash2} from "react-icons/fi";

const AddDepartForm = () => {
  const [listdata, setListData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState({
    equip_department_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      equip_department_name: data.equip_department_name,
    };

    try {
      const response = await fetch("/api/department/add-department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newItem = await response.json();
        setListData((prevData) => [...prevData, newItem]); // Add the new item to the list
        setData((prevData) => ({
          ...prevData,
          equip_department_name: "",
        }));
        fetchData();
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/department/list-department");
      const responseData = await response.json();
      setListData(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Edit Item
  const handleEdit = (itemId) => {
    // Implement the logic to handle editing
    console.log(`Edit item with ID ${itemId}`);
  };

  const handleDelete = async (itemId) => {
    try {
      await fetch(`/api/department/delete-department`, {
        method: "POST",
        body: JSON.stringify({ itemId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setListData((prevData) =>
        prevData.filter((item) => item.equip_department_id !== itemId)
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <>
     <Box margin="auto" bg='white' borderRadius="xl" p={3} mb={5} boxShadow="base">
      <form onSubmit={handleSubmit}>
        <Flex direction="row">


          <FormControl flex="1" mr={4}>
            <Input
          type="text"
          name="equip_department_name"
          id="equip_department_name"
          value={data.equip_department_name}
          onChange={handleChange}
          placeholder="พิมพ์ชื่อหน่วยงาน"
          w={400}
        />
          </FormControl>

          <FormControl flex="1">
          <Button color="white" type="submit" fontWeight="normal" fontSize="xl" bgGradient='linear(to-r, #f59120 3.89%, #fa5645 103.33%)' 
          _hover={{
            bgGradient:'linear(to-r, #f59120 3.89%, #fa5645 103.33%)',
            color: 'white',
            fontSize: 'xl',
          }}
          >
            <Box as={FiPlusCircle} mr={1.5} />
            เพิ่มหน่วยงาน
          </Button>
          </FormControl>
        </Flex>

        
      </form>
    </Box>
    <Box bg='white' borderRadius="xl" p={3} boxShadow="base">
      <div>
        <TableContainer>
          <Table variant="simple">
           
            <Thead>
              <Tr>
                <Th fontSize="xl" color="#0040b2">ชื่อหน่วยงาน</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listdata.map((item) => (
                <Tr key={item.equip_department_id}>
                  <Td>{item.equip_department_name}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(item.equip_department_id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      </Box>
    </>
  );
};

export default AddDepartForm;
