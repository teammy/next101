import { useState,useCallback } from "react";
import { ThaiDatePicker } from "thaidatepicker-react";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");

const AddDataForm = () => {
  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [data, setData] = useState({
    equip_type: "",
    equip_depart: "",
    equip_location: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData  = {
      equip_type: data.equip_type,
      equip_depart: data.equip_depart,
      equip_location: data.equip_location,
      equip_date_start: startDate,
      equip_date_expire: expireDate,
    };

    fetch("/api/add-list-device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="equip_type">ชื่ออุปกรณ์</label>
      <input
        type="text"
        name="equip_type"
        id="equip_type"
        value={data.equip_type}
        onChange={handleChange}
      />
      <label htmlFor="equip_depart">แผนก</label>
      <input
        type="text"
        name="equip_depart"
        id="equip_depart"
        value={data.equip_depart}
        onChange={handleChange}
      />
      <label htmlFor="equip_depart">สถานที่ติดตั้ง</label>
      <input
        type="text"
        name="equip_location"
        id="equip_location"
        value={data.equip_location}
        onChange={handleChange}
      />
      <label htmlFor="equip_date_start">วันที่อัดก๊าซ</label>
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
      <label htmlFor="equip_date_expire">วันที่หมดอายุ</label>
      <ThaiDatePicker 
        id="equip_date_expire"
        value={expireDate}
        onChange={handleEndDateChange}
        inputProps={{
          placeholder: "วันที่หมดอายุ",
          displayFormat: "D MMMM YYYY",
        }}

      />

      <button type="submit">เพิ่มข้อมูล</button>
    </form>
  );

};
export default AddDataForm;