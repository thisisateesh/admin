import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import useUpdate from "../../hooks/useUpdate";

function EditStudentInfo() {
  const navigate = useNavigate()
  // Extracts student ID from URL parameters
  const { id } = useParams();
  // Fetch student data using a custom hook (useFetch)

  const [Fetch, data, loading, error] = useFetchOnce(
    `/api/user/details?`,
    true
  );
  console.log(data)
  // State to store form parameters
  const [params, setParams] = useState();
 
  // Updates params when data is fetched
  useEffect(() => {
    Fetch(`studentId=${id}`);
  }, []);

  useEffect(() => {
    if (data.data) {
      setParams(data.data);
    }
  }, [data]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter
    const {name, type , value, files}=e.target
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type==="file" ? files[0] :value,
    }));
   
  };

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/api/user/update-student`);
  // Handles form submission
  const handleSubmit = (e) => {
    const formdata = new FormData()
    formdata.append("image", params.sprofilepicUrl)
    formdata.append("banner-image", params.sbackgroundUrl)
    console.log( e)
    e.preventDefault();
    // Calls the handleUpdate function from the custom hook
    handleUpdate(`studentId=${e.target.id}`, params).then(() => {
      // Displays a success message using SweetAlert library
      swal("Good job!", "Student Updated Successfully", "success");
      navigate("/students")
      window.location.reload()
    });
  };

  console.log(params);
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
            className="forms-sample w-100 m-2 p-4 card"
            onSubmit={handleSubmit}
          >
            <div className="w-100 d-flex gap-3">
              <div className="form-group w-100 row">
                <div className="col-4">
                  <label htmlFor="exampleInputUsername1">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sname"
                    value={params?.sname}
                    placeholder="Student Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sgender"
                    value={params?.sgender}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="semail"
                    value={params?.semail}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputMobile">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    name="spassword"
                    value={params?.spassword}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputMobile">Mobile</label>
                  <input
                    type="number"
                    className="form-control"
                    name="smobile"
                    value={params?.smobile}
                    placeholder="Mobile"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputMobile">Whatsapp</label>
                  <input
                    type="number"
                    className="form-control"
                    name="swhatsapp"
                    value={params?.swhatsapp}
                    placeholder="Whatsapp"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="sdob"
                    value={params?.sdob}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    value={params?.status}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="scity"
                    value={params?.scity}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="saddress"
                    value={params?.saddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="scountry"
                    value={params?.scountry}
                    onChange={handleChange}
                  />
                </div>
              
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Verified</label>
                  <input
                    type="text"
                    className="form-control"
                    name="varified"
                    value={params?.varified}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Profile Pic</label>
                  <input
                    type="file"
                    className="form-control"
                    name="sprofilepicUrl"
                    
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Background Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="sbackgroundUrl"
                    
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Pin Code</label>
                  <input
                    type="number"
                    className="form-control"
                    name="spincode"
                    value={params?.spincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Level of Education</label>
                  <input
                    type="text"
                    className="form-control"
                    name="levelOfeducation"
                    value={params?.levelOfeducation}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Pass Out Year</label>
                  <input
                    type="number"
                    className="form-control"
                    name="passOutYear"
                    value={params?.passOutYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sstate"
                    value={params?.sstate}
                    onChange={handleChange}
                  />
                </div>
               
                
               
                

                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Fcm</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sfcm"
                    value={params?.sfcm}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Lattitude</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slattitude"
                    value={params?.slattitude}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slongitude"
                    value={params?.slongitude}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit and cancel buttons */}

                <button
                  type="submit"
                  id={params?.id || ""}
                  onClick={handleSubmit}
                  className="btn my-2 btn-primary "
                >
                  Submit
                </button>
                <button type="reset" className="btn my-2 btn-light">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditStudentInfo;
