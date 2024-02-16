import axios from "axios";
import swal from "sweetalert";

const useAdd = (url) => {
    const addData = async (params) => {
      try {
        const response = await axios.post(url , params,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
          ); //Adding the data

         
      } catch (error) {
        return error;
      }
    };
return [addData]
};
export { useAdd };
