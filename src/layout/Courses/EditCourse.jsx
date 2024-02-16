import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useUpdate from "../../hooks/useUpdate";
import swal from "sweetalert";

function EditCourses() {
  const navigate = useNavigate();
  //get current details of the cource
  const { id } = useParams();

  const courseId = id;

  const [data, loading, error] = useFetch(
    `/api/courses/course-detail?courseId=${courseId}`,
    courseId
  );
  //create a state to store all the data that will be sent with request
  const [formData, setFormData] = useState({
    ctitle: "",
    cstatus: "",
    cduration: "",
    cdescription: "",
    cthumbnail: null,
    cdemovideo: null,
    ccoverimage: null,
    ckeywords: "",
    cfees: "",
    cofferfees: "",
  });

  //when the data is fetched set it to the form data
  useEffect(() => {
    if (data) {
      setFormData(data.data);
    }
  }, [data, loading, error]);
  //create a functon to handle the change of the data
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevParams) => ({
      ...prevParams,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Uses a custom hook (useUpdate) for handling the update API call
  const [handleUpdate] = useUpdate(
    `http://api.logicmitra.com:8086/api/courses/update-course`
  );

  // console.log(formData.ctitle)
  //create a function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("images", formData.ccoverimage);
    formdata.append("thumbanil", formData.cthumbnail);
    formdata.append("video", formData.cdemovideo);

    // Calls the handleUpdate function from the custom hook
    handleUpdate(`courseId=${e.target.id}`, formData).then(() => {
      // Displays a success message using SweetAlert library
      swal("Good job!", "Category Updated Successfully", "success");
      navigate("/courses");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
    // console.log("form submitted", formData);
  };

  console.log(formData);
  return (
    <>
      {/* Display error message if there's an error */}
      {error && error.message}

      {/* Display loading message while data is being fetched */}
      {/* {loading && "Loading..."} */}

      {/* Render the form if data is available */}

      {!data.data ? (
        <>loading...</>
      ) : (
        <>
          <div className="w-100 p-3 bg-main">
            <form
              // Form for Adding Course information
              className="forms-sample w-100 m-2 p-4 card"
              onSubmit={handleSubmit}
              id={formData?.id}
            >
              {/* Form inputs for course details */}
              <div className="w-100 d-flex gap-3">
                {/* Form group for coursename*/}
                <div className="form-group w-100 row">
                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">Course Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.ctitle}
                      name="ctitle"
                      placeholder="Course Title"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">Course Status</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.cstatus}
                      name="cstatus"
                      placeholder="Course Status"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">
                      Course Duration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.cduration}
                      name="cduration"
                      placeholder="Course Duration"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">Course Fees</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.cfees}
                      name="cfees"
                      placeholder="Course Fees"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">
                      Course Offer Fees
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData?.cofferfees}
                      name="cofferfees"
                      placeholder="Course Offer Fees"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">
                      Course Thumbnail
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="cthumbnail"
                      placeholder="Course Duration"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">
                      Course Cover Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="ccoverimage"
                      placeholder="Course Cover Image"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="exampleInputUsername1">
                      Course Demo Video
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="cdemovideo"
                      placeholder="Course Demo Video"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="exampleInputUsername1">
                      Course Keywords
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="ckeywords"
                      value={formData?.ckeywords}
                      placeholder="Course keywords"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="exampleInputUsername1">
                      Course Discription
                    </label>
                    <textarea
                      name="cdescription"
                      value={formData?.cdescription}
                      id=""
                      className="form-control"
                      cols="30"
                      rows="10"
                      onChange={handleChange}
                    ></textarea>
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
        </>
      )}
    </>
  );
}

export default EditCourses;
