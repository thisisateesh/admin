import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useUpdate = (updateUrl) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleUpdate = async (id , updateData) => {//functon to update data
    try {
      setLoading(true);
      const response = await axios.put(`${updateUrl}?${id}`, updateData,
      {
        
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return [ handleUpdate, loading, error ]; 
};

export default useUpdate;
