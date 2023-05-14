import { useState,useEffect } from "react";

const ListDevice = () => {
  const [listdata, setListData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/add-list-device');
      const responseData = await response.json();
      setListData(responseData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {listdata.map((item) => (
          <li key={item.equip_id}>
            <span>{item.equip_type}</span>
            <span>{item.equip_department}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListDevice;