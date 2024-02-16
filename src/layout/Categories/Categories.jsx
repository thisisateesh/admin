import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import useUpdate from "../../hooks/useUpdate";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import { useDeleteOne } from "../../hooks/useDeleteOne";
import { useAdd } from "../../hooks/useAdd";
import {
  SubcatContext,
  UsesubcategoriesContext,
} from "../../context/SubcatContext";

function Categories() {
  const navigate = useNavigate();
  

  const {subcatData, setData , setLoading ,setError ,categoryId, setcatId
  }=UsesubcategoriesContext()


  
  // fetching the subcategory data for particcular category data
  const getSubcategories = async (e) => {
    e.preventDefault();
    console.log("event ka data is " + e.target.id);
   setcatId(e.target.id)

   
    try{
      setLoading(true)
      const res = await axios.get(`/api/categories/sub-cat?catg=${e.target.id}`)
      console.log(res.data)
      if(res.status===200){
        
        console.log(await res.data)
        setLoading(false)
        setData(await res.data)
        console.log(subcatData)
      }else{
        console.log("somethind fizzt")
      }
    }catch(error){
      console.log(error)
      setError({
        status:true,
        error:error.message
      })
    }
  };

  const [params, setparams] = useState({
    title: "",
    imageUrl: "",
    sequence: "",
    status: "1",
    description: "",
  });
  console.log(
    params.title,
    params.imageUrl,
    params.description,
    params.sequence,
    params.status
  );
  //handle addition of category
  const handleChange = (event) => {
    console.log(event.target)
    const { name, value, type, files } = event.target;
    setparams({
      ...params,
      [name]:type==="file" ? files[0]: value
    });
  };

  const [addData] = useAdd(`http://api.logicmitra.com:8086/api/categories/create-cat`,)


  const handleSubmit =  (event) => {
event.preventDefault()
const formData = new FormData();
formData.append("image", params.imageUrl);


    
    event.preventDefault();
   
    addData(params).then(()=>{
      swal({
        title: "Good job!",
        text: "Your data has been submitted",
        icon: "success"
      }).then(()=>{
       
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
  }).catch((error) => {
    console.error("Error occurred:", error);
    swal({
      icon: "error",
      title: "Oops...",
      text: "An error occurred while submitting the form"
    });
  })
    console.log(params)
  };



  console.log(params)
  // delete the particular Categories
  const { Delete } = useDeleteOne(`/api/categories/delete-cat?catId=`);

  // Handle deletion of a category
  const handleDelete = async (e) => {
    console.log("cate id is ", e.target.id);
    swal({
      title: "Are you sure?",
      text: "you want to delete this !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Delete(e.target.id);

        window.location.reload();
      } else {
        swal("Your  is safe");
      }
    });
  };

  // Fetch category data using a custom hook (useFetch)
  const [data, error, loading] = useFetch("/api/categories/list", true);

  console.log(data);

  

  return (
    <div className="w-100 p-3 bg-main relative">
      <section className="section">
        <div className="section-header">
          <h1>Category List</h1>
          <div className="section-header-breadcrumb"></div>
        </div>
      </section>

      {/* Categories Table */}
      <div className="row gap-5 p-3">
        <div className="card col-7">
          <div className="card-body ">
            <div className="table-responsive ">
              {/* Display loading message while data is being fetched */}
              {loading && <h1 className="text-black">Loading...</h1>}
              {/* Display error message if there's an error */}
              {error && <h1 className="text-black">{error.message}</h1>}
              {/* Display Category data if available */}
              {data.data && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Image</th>
                      
                      <th scope="col">Status</th>
                      <th scope="col">Sequence</th>
                      <th scope="col">Subcat</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {/* Map through trainers data and display in table rows */}
                    {data.data.map((item) => (
                      <tr key={item.title}>
                        <td>{item.title}</td>
                        <td>
                          <img src={`https://api.logicmitra.com/uploads/categories/${item.imageUrl}`} alt="image" />
                        </td>
                        
                        <td>{item.status===1 ? "Active ": "Inactive"}</td>
                        <td>{item.sequence}</td>

                        <td className="w-full">
                          {/* This button will show te subcatehory card */}
                          <button className="btn " onClick={getSubcategories}>
                            <Link
                              to={"/categories/subcategories"}
                              className="icon bg-primary"
                              id={item.id}
                            >
                              <i id={item.id} className="bi bi-eye-fill"></i>
                            </Link>
                          </button>
                        </td>
                        <td>
                          {/* Action links for each trainer */}
                          <Link
                            id={item.id}
                            className=" icon bg-danger icon"
                            onClick={handleDelete}
                          >
                            <i id={item.id} className="bi bi-trash3"></i>
                          </Link>{" "}
                          <Link
                            className="icon bg-warning"
                            to={`/categories/edit/${item.id}`}
                          >
                            <i class="bi bi-pencil-square"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        {data.data && (
          <form className="card  col-4 py-4 shadow-lg  h-50" onSubmit={handleSubmit}>
            <div className="">
              <p className="text-black">Title</p>
              <input
                onChange={handleChange}
                name="title"
                value={params?.title}
                type="text"
                className="form-control my-2"
              />
            </div>
            <div className="">
              <p className="text-black">Image Url</p>
              <input
                onChange={handleChange}
                name="imageUrl"
                // value={params?.imageUrl}
                type="file"
                multiple={true}
                className="form-control my-2"
              />
            </div>

            <div className="">
              <p className="text-black">Status</p>

             
             <div className="d-flex justify-content-start text-black gap-4 align-items-center my-2">
             
              
              <div className=" ">
              <input
                defaultChecked
                 
                  type="radio"
                  id="active"
                  name="status"
                  value={1}
                  checked={params?.status==1}
                  
                  onChange={handleChange}
                />
              Active
             
              </div>

              
               
               <div className=""> 
               <input
                  
                  type="radio"
                  id="inactive"
                  value={0}
                  name="status"
                  
                  onChange={handleChange}
                  
                  checked={params?.status==0}
                />
               Inactive
              
               </div>
             </div>
              


            </div>
            <div className="">
              <p className="text-black">Sequence</p>
              <input
                onChange={handleChange}
                name="sequence"
                value={params?.sequence}
                type="number"
                className="form-control my-2"
              />
            </div>
            <div className="">
              <p className="text-black">Description</p>
              <textarea
                type="text"
                className="form-control my-2"
                value={params?.description}
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* {similar fields} */}
            <button className="btn btn-primary mt-3">Add Category</button>
          </form>
        )}
      </div>
      {/* Card to show and add subcategories */}
    </div>
  );
}

export default Categories;
