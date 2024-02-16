import React,{useState} from "react";
import { useAdd } from "../../hooks/useAdd";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function AddStudent() {

  const navigate=useNavigate()
  const initialFormData = {
    userType:"student",
    sname:"",
      semail:"",
      smobile:"",
      languages:"",
      experience:"",
      sintro:"",
      sabout:"",
      sgender:"",
      sdob:"",
      scity:"",
      saddress:"",
      levelOfeducation:"",
      passOutYear:"",
      sstate:"",
      scountry:"",
      spincode:"",
      sstatus:"",
      swhatsapp:"",
      sfcm:"",
      slattitude:"",
  slongitude:"",
 sbackgroundUrl:null,

sprofilepicUrl:null

  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value , type , files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type ==="files" ? files[0] :value,
    }));
  };
  //useAdd here
  const [addData] = useAdd("/api/user/create_user")
  const handleSubmit = (e) => {
    const formdata= new FormData()
    formdata.append("image", formData.sprofilepicUrl)
    formdata.append("banner-image", formData.sbackgroundUrl)
    e.preventDefault();
   
    addData(formData).then(()=>{
     
      swal({
        title: "Good job!",
        text: "Your data has been submitted",
        icon: "success"
      }).then(()=>{
        window.location.reload()
        navigate("/students")
      })
         
         
        
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      swal({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while submitting the form"
      });
    })
  };

  console.log(formData);
  return (
    <div className="w-100 p-3 bg-main">
      <form className="forms-sample w-100 m-2 p-4 card" onSubmit={handleSubmit}>
        <div className="w-100 d-flex gap-3">
          <div className="form-group w-100 row">
            <div className="col-4">
              <label htmlFor="exampleInputUsername1">Student Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.sname}
                name="sname"
                placeholder="Student Name"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
          <label htmlFor="exampleInputUsername1">User Type</label>
          <input
            type="text"
            className="form-control"
            value={formData.userType}
            name="userType"
            placeholder="Trainers Name"
            onChange={handleChange}
          />
        </div>
            <div className="col-4">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.semail}
                name="semail"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
           
            <div className="col-4">
              <label htmlFor="exampleInputMobile">Mobile</label>
              <input
                type="number"
                className="form-control"
                value={formData.smobile}
                name="smobile"
                placeholder="Mobile"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputMobile">Whatsapp</label>
              <input
                type="number"
                className="form-control"
                value={formData.swhatsapp}
                name="swhatsapp"
                placeholder="Whatsapp"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputDOB">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={formData.sdob}
                name="sdob"
                placeholder="Date of Birth"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputDOB">Status</label>
              <input
                type="text"
                className="form-control"
                value={formData.sstatus}
                name="sstatus"
                placeholder="Status"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputDOB">City</label>
              <input
                type="text"
                className="form-control"
                value={formData.scity}
                name="scity"
                placeholder="City"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
              <label htmlFor="exampleInputDOB">Address</label>
              <input
                type="text"
                className="form-control"
                value={formData.saddress}
                name="saddress"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <div className="col-4">
          <label htmlFor="exampleInputMobile">State</label>
          <input
            type="text"
            className="form-control"
            value={formData.sstate}
            name="sstate" 
            placeholder="State"
            onChange={handleChange}
          />
        </div>
            <div className="col-4">
              <label htmlFor="exampleInputDOB">Country</label>
              <input
                type="text"
                className="form-control"
                value={formData.scountry}
                name="scountry"
                placeholder="Country"
                onChange={handleChange}
              />
            </div>
            
            
            <div className="col-4">
              <label htmlFor="exampleInputDOB">Profile Pic</label>
              <input
                type="file"
                className="form-control"
              
                name='sprofilepicUrl'
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
                value={formData.spincode}
                name="spincode"
                placeholder="Pin code"
                onChange={handleChange}
              />
            </div>
            
            <div className="col-4">
              <label htmlFor="exampleInputDOB">Gender</label>
              <input
                type="text"
                className="form-control"
                value={formData.sgender}
                name="sgender"
                placeholder="Gender"
                onChange={handleChange}
              />
            </div>
            
            <div className="col-12">
          <label htmlFor="exampleInputMobile">Intro</label>
          <textarea
            className="form-control"
            value={formData.sintro}
            name="sintro"  
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="exampleInputMobile">About</label>
          <textarea
            className="form-control"
            value={formData.sabout}
            name="sabout" 
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Experience</label>
          <input
            type="text"
            className="form-control"
            value={formData.experience}
            name="experience" 
            placeholder="Experience"
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Languages</label>
          <input
            type="text"
            className="form-control"
            value={formData.languages}
            name="languages" 
            placeholder="Language"
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Level Of Education</label>
          <input
            type="text"
            className="form-control"
            value={formData.levelOfeducation}
            name="levelOfeducation" 
            placeholder="Level of Education"
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Pass Out Year</label>
          <input
            type="number"
            className="form-control"
            value={formData.passOutYear}
            name="passOutYear" 
            placeholder="pass out year"
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Fcm</label>
          <input
            type="text"
            className="form-control"
            value={formData.sfcm}
            name="sfcm" 
            placeholder="Fcm "
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Lattitude</label>
          <input
            type="text"
            className="form-control"
            value={formData.slattitude}
            name="slattitude" 
            placeholder="Lattitude"
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="exampleInputMobile">Longitude</label>
          <input
            type="text"
            className="form-control"
            value={formData.slongitude}
            name="slongitude" 
            placeholder="Longitude"
            onChange={handleChange}
          />
        </div>
          </div>
        </div>

        {/* Submit and cancel buttons */}
        <button type="submit" className="btn my-2 btn-primary hover:btn-primary ">
          Submit
        </button>
        <button type="reset" className="btn my-2 btn-light">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
