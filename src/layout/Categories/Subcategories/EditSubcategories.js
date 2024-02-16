import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useFetch } from "../../../hooks/useFetch";
import useUpdate from "../../../hooks/useUpdate";


function EditSubcategories() {



  const navigate =useNavigate()
  // Extracts category title from URL parameters
  
const {id}=useParams()
const subcatId=id

  // Fetch category data using a custom hook (useFetch)

  const [ data, error, loading] = useFetch(`/api/categories/subcat-detail?subcatId=${subcatId}`, subcatId);

  

  

  // State to store form parameters
  const [params, setParams] = useState({});

  console.log(params?.status)
  // Updates params when data is fetched
  useEffect(() => {
    
    if (data) {
      setParams(data.data);
    }
  }, [data, loading , error]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter
    const { name, value, type, files } = e.target;
    setParams({
      ...params,
      [name]:type==="file" ? files[0]: value
    });
   
  };
 
 	
 console.log(params)

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate ] = useUpdate(`http://api.logicmitra.com:8086/api/categories/update-subcat`);

  console.log(params)
  // Handles form submission
  const handleSubmit = (e) => {

    const formdata=new FormData()
    formdata.append("image", params.imageUrl)
    console.log(e)
    e.preventDefault();
    // Calls the handleUpdate function from the custom hook
    handleUpdate(`subcatId=${e.target.id}` ,params).then(() => {
      // Displays a success message using SweetAlert library
      swal("Good job!", "Category Updated Successfully", "success");
      navigate("/categories/subcategories")
      window.location.reload()
    });
  };





  return (
    <>
      {/* Display error message if there's an error */}
      {error && error.message}

      {/* Display loading message while data is being fetched */}
      {loading && "Loading..."}

      {/* Render the form if data is available */}
      {data?.data && (
        <div className="w-100 p-3 bg-main">
          <form
            // Form for updating category information
            className="forms-sample w-100 m-2 p-4 card"
            onSubmit={handleSubmit}
            id={params?.id}
          >
            {/* Form inputs for category details */}
            <div className="w-100 d-flex gap-3">
              {/* Form group for title */}
              <div className="form-group w-100 row">

              <div className="col-4">
              <label htmlFor="exampleInputUsername1">Title</label>
              <input
                type="text"
                className="form-control"
                value={params?.title}
                name="title"
                placeholder="title"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">ImageUrl</label>
              <input
                type="file"
                className="form-control"
               
                name="imageUrl"
                placeholder="imageUrl"
                onChange={handleChange}
              />
            </div>
               
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Sequence</label>
              <input
                type="text"
                className="form-control"
                value={params?.sequence}
                name="sequence"
                placeholder="sequence"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Status</label>
              <input
                type="text"
                className="form-control"
                value={params?.status}
                name="status"
                placeholder="status"
                onChange={handleChange}
              />
            </div>
               
            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Description</label>
              <textarea
                type="text"
                cols="10"
                rows="10"
                className="form-control"
                value={params?.descprition}
                name="description"
                placeholder="Description"
                onChange={handleChange}
              ></textarea>
            </div>
              </div>
             
            </div>

            {/* Submit and cancel buttons */}
            <button type="submit" className="btn btn-primary mr-2">
              Submit
            </button>
            <button type="reset" className="btn btn-light">
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditSubcategories;

