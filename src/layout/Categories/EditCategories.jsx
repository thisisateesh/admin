import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

import useUpdate from "../../hooks/useUpdate";
import { useFetch } from "../../hooks/useFetch";

function EditCategories() {



  const navigate =useNavigate()
  // Extracts category title from URL parameters
  
const {id}=useParams()
const catId=id

  // Fetch category data using a custom hook (useFetch)

  const [ data, error, loading] = useFetch(`/api/categories/cat-detail?catId=${catId}`, catId);

  

  

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
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type==="file" ? files[0] :value,
    }));
  };
 
 	
 console.log(params)

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate ] = useUpdate(`http://api.logicmitra.com:8086/api/categories/update-cat`);

  console.log(params)
  // Handles form submission
  const handleSubmit = (e) => {
    console.log(e)
    const formData = new FormData();
formData.append("image", params.imageUrl);

    e.preventDefault();
    // Calls the handleUpdate function from the custom hook
    handleUpdate(`catId=${e.target.id}` ,params).then(() => {
      // Displays a success message using SweetAlert library
      swal("Good job!", "Category Updated Successfully", "success");
      navigate("/categories")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    });
  };

  return (
    <>
      {/* Display error message if there's an error */}
      {error && error.message}

      {/* Display loading message while data is being fetched */}
      {loading && "Loading..."}

      {/* Render the form if data is available */}
      {data.data && (
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
                // value={params?.imageUrl}
                name="imageUrl"
               
                onChange={handleChange}
              />
            </div>
               
           
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Status</label>
             
             <div className="text-black d-flex gap-2">
             <input
                
                 
                type="radio"
                id="active"
                name="status"
                value={1}
                checked={params?.status==1}
                
                onChange={handleChange}
              />
              Active
               <input
              
               
              type="radio"
              id="active"
              name="status"
              value={0}
              checked={params?.status==0}
              
              onChange={handleChange}
            />
            Inactive
             </div>
            </div>

            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Sequence</label>
              <input
                type="number"
                className="form-control"
                value={params?.sequence}
                name="sequence"
                placeholder="sequence"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Description</label>
              <textarea
                type="text"
                cols="30"
                rows="10"
                className="form-control"
                value={params?.description}
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

export default EditCategories;

