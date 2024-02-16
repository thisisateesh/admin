import axios from "axios"
import swal from "sweetalert"
const useDeleteOne = (url)=>{

    const Delete = async(id)=>{
        try {
            const response = await axios.delete(`${url}${id}`)

           
            if(response){
                swal("User Deleted SuccessFully!!!")
            }
            else{
                swal("Error while deleting data!!!");
            }
        } catch (error) {
            return error
        }
    }
    return {Delete}
    
}
export {useDeleteOne}