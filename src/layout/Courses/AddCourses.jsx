import React, { useState } from "react";
import { useAdd } from "../../hooks/useAdd";
import { useFetch } from "../../hooks/useFetch";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function AddCourses() {
  const navigate = useNavigate();

  //fetching the category data for specific id and title

  const [data, error, loading] = useFetch("/api/courses/all-course", true);

  console.log(data);
  const initialFormData = {
    cslug: "",
    ctitle: "",
    cintro: "",
    AccessPeriodDays: "",
    caddon: "",
    cstatus: "",
    ccategory: "",
    csubcategory: "",
    ctype: "",
    cduration: "",
    cfees: "",
    cofferfees: "",
    ctrainer: "",
    cthumbnail: null,
    ccoverimage: null,
    cdemovideo: null,
    ckeywords: "",
    cmodules: "",
    cdescription: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  //add courses to the database
  const [addData] = useAdd(`/api/courses/create-course`);
  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("image", formdata.ccoverimage);
    formdata.append("banner", formdata.cthumbnail);
    formdata.append("video", formdata.cdemovideo);
    e.preventDefault();
    //logic to submit data
    addData(formData)
      .then(() => {
        swal({
          title: "Good job!",
          text: "Your data has been submitted",
          icon: "success",
        }).then(() => {
          navigate("/courses");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        swal({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while submitting the form",
        });
      });
    console.log("Form Submitted", formData);
  };

  console.log(formData);
  return (
    <div className="w-100 p-3 bg-main">
      <form
        // Form for Adding Course information
        className="forms-sample w-100 m-2 p-4 card"
        onSubmit={handleSubmit}
      >
        {/* Form inputs for course details */}
        <div className="w-100  gap-3">
          {/* Form group for coursename*/}
          <div className="form-group  row">
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

            <div className="col-4 text-black flex flex-col">
              <label for="category">Category</label>

              <div>
                <select
                  name="ccategory"
                  value={formData.ccategory}
                  onChange={handleChange}
                  id="category"
                  className="form-select"
                >
                  <option selected>Open this select menu</option>
                  {data?.data &&
                    data?.data.map((elm) => {
                      const { _id, title } = elm.ccategory;
                      console.log(_id, title);

                      return (
                        <>
                          <option value={_id}>{title}</option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-4 text-black flex flex-col">
              <label for="subcategory">Subcategory</label>

              <div>
                <select
                  name="csubcategory"
                  value={formData.csubcategory}
                  onChange={handleChange}
                  id="subcategory"
                  className="form-select"
                >
                  <option selected>Open this select menu</option>
                  {data?.data &&
                    data?.data.map((elm) => {
                      const { _id, title } = elm.csubcategory;
                      console.log(_id, title);

                      return (
                        <>
                          <option value={_id}>{title}</option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Duration</label>
              <input
                type="number"
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
                type="number"
                className="form-control"
                value={formData?.cfees}
                name="cfees"
                placeholder="Course Fees"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Offer Fees</label>
              <input
                type="number"
                className="form-control"
                value={formData?.cofferfees}
                name="cofferfees"
                placeholder="Course Offer Fees"
                onChange={handleChange}
              />
            </div>
            <div className="col-4 text-black flex flex-col">
              <label for="ctrainer">Course Trainer</label>

              <div>
                <select
                  name="ctrainer"
                  value={formData.ctrainer}
                  onChange={handleChange}
                  id="ctrainer"
                  className="form-select"
                >
                  <option selected>Open this select menu</option>
                  {data?.data &&
                    data?.data.map((elm) => {
                      const { _id, sname } = elm.ctrainer;
                      console.log(_id, sname);

                      return (
                        <>
                          <option value={_id}>{sname}</option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Thumbnail</label>
              <input
                type="file"
                className="form-control"
                name="cthumbnail"
                placeholder="Course Duration"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Cover Image</label>
              <input
                type="file"
                className="form-control"
                name="ccoverimage"
                placeholder="Course Cover Image"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Course Demo Video</label>
              <input
                type="file"
                className="form-control"
                name="cdemovideo"
                placeholder="Course Demo Video"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Course Keywords</label>
              <input
                type="text"
                className="form-control"
                value={formData?.ckeywords}
                name="ckeywords"
                placeholder="Course keywords"
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label htmlFor="exampleInputUsername1">Course Discription</label>
              <textarea
                name="cdescription"
                id=""
                handleChange={formData?.cdescription}
                className="form-control"
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Submit and cancel buttons */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 rounded-sm py-2 my-2  w-100"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-gray-200 hover:bg-gray-300  py-2  rounded-sm my-2 btn-light w-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourses;
