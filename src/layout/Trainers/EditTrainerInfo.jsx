import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOnce } from "../../hooks/useFetchOnce";

function EditTrainerInfo() {
  const navigate = useNavigate();
  // Extracts student ID from URL parameters
  const { id } = useParams();

  console.log(id);
  // Fetch student data using a custom hook (useFetch)

  const [Fetch, data, loading, error] = useFetchOnce(
    `/api/user/details?`,
    true
  );
  console.log(data);
  // State to store form parameters

  // Updates params when data is fetched
  useEffect(() => {
    Fetch(`studentId=${id}`);
  }, []);

  // State to store form parameters
  const [params, setParams] = useState({});

  // Updates params when data is fetched
  useEffect(() => {
    if (data) {
      setParams(data.data);
    }
  }, [data]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    // Dynamically updates the corresponding form parameter
    const { name, value, type, files } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(`/api/trainers/update-trainer`);

  // Handles form submission
  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("image", params.sprofilepicUrl);
    formdata.append("banner-image", params.sbackgroundUrl);
    e.preventDefault();
    // Calls the handleUpdate function from the custom hook
    handleUpdate(`trainId=${e.target.id}`, params).then(() => {
      // Displays a success message using SweetAlert library
      swal("Good job!", "Student Updated Successfully", "success");
      navigate("/trainers");
      window.location.reload();
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
      {data?.data && (
        <div className="w-100 p-3 bg-main">
          <form
            className="forms-sample w-100 m-2 p-4 card"
            onSubmit={handleSubmit}
            id={params?.id}
          >
            <div className="w-100 d-flex gap-3">
              <div className="form-group w-100 row">
                <div className="col-4">
                  <label htmlFor="exampleInputUsername1">Trainer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sname"
                    value={params?.sname}
                    placeholder="Trainers Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputEmail1">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sgender"
                    value={params?.sgender}
                    placeholder="Gender"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputMobile">Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="sdob"
                    value={params?.sdob}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputMobile">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={params?.address}
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputMobile">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="scity"
                    value={params?.scity}
                    placeholder="City"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Pin code</label>
                  <input
                    type="number"
                    className="form-control"
                    name="spincode"
                    value={params?.spincode}
                    placeholder="Pincode"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Profile Pic</label>
                  <input
                    type="file"
                    className="form-control"
                    name="sprofilepicUrl"
                    placeholder="picture"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">About</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sabout"
                    value={params?.sabout}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sstatus"
                    value={params?.sstatus}
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
                  <label htmlFor="exampleInputDOB">Whatsapp</label>
                  <input
                    type="number"
                    className="form-control"
                    name="swhatsapp"
                    value={params?.swhatsapp}
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
                <div className="col-4">
                  <label htmlFor="exampleInputDOB"> intro</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sintro"
                    value={params?.sintro}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Banner</label>
                  <input
                    type="file"
                    className="form-control"
                    name="sbackgroundUrl"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="exampleInputDOB">Rating </label>
                  <input
                    type="number"
                    className="form-control"
                    name="srating"
                    value={params?.srating}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit and cancel buttons */}
            <button type="submit" className="btn my-2 btn-primary ">
              Submit
            </button>
            <button type="reset" className="btn my-2 btn-light">
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditTrainerInfo;
