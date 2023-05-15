import { Input } from '@chakra-ui/react'
import { useState,useEffect } from 'react'

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
        setData({ equip_building_name: "" }); // Clear the input field
      }
    } catch (error) {
      console.error('Failed to submit data:', error);
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch('/api/building/add-building');
      const responseData = await response.json();
      setListData(responseData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
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
          'Content-Type': 'application/json',
        },
      });
  
      setListData((prevData) => prevData.filter((item) => item.equip_building_id !== itemId));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="equip_building_name">อาคาร</label>
      <input
        type="text"
        name="equip_building_name"
        id="equip_building_name"
        value={data.equip_type}
        onChange={handleChange}
      />
      <button type="submit">เพิ่มข้อมูล</button>
    </form>
    <div>
      <h1>Data List</h1>
      <ul>
        {listdata.map((item) => (
          <li key={item.equip_building_id}>
            <span>{item.equip_building_id}</span>
            <span>{item.equip_building_name}</span>
            <button onClick={() => handleDelete(item.equip_building_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default AddBuildingForm;