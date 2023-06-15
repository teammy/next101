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

const AddBuildingForm = () => {
  const [listdata, setListData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState({
    equip_building_name: "",
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
      equip_building_name: data.equip_building_name,
    };

    try {
      const response = await fetch("/api/building/add-building", {
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
          equip_building_name: "",
        }));
        fetchData();
      }
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/building/list-building");
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
      await fetch(`/api/building/delete-building`, {
        method: "POST",
        body: JSON.stringify({ itemId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setListData((prevData) =>
        prevData.filter((item) => item.equip_building_id !== itemId)
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <>
     <Box margin="auto" bg='white' borderRadius="xl" p={3} mb={5}>
      <form onSubmit={handleSubmit}>
        <Flex direction="row">


          <FormControl flex="1">
            <Input
          type="text"
          name="equip_building_name"
          id="equip_building_name"
          value={data.equip_building_name}
          onChange={handleChange}
          placeholder="พิมพ์ชื่ออาคาร/สถานที่"
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
            เพิ่มอาคาร
          </Button>
          </FormControl>
        </Flex>

        
      </form>
    </Box>
      <Box bg='white' borderRadius="xl" p={3}>
        <TableContainer>
          <Table variant="simple">
           
            <Thead>
              <Tr>
                <Th>ชื่ออาคาร/สถานที่</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listdata.map((item) => (
                <Tr key={item.equip_building_id}>
                  <Td>{item.equip_building_name}</Td>
                  <Td>
                    
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(item.equip_building_id)}
                    >
                      ลบ
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AddBuildingForm;
