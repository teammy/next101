import React, { useState, useEffect } from "react";

function AssignUserSelect() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/user/assign_user")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.person_firstname}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AssignUserSelect;