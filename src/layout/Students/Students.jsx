import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import swal from "sweetalert";
import { useDeleteOne } from "../../hooks/useDeleteOne";

function Students() {
  const navigate = useNavigate();
  //setting parameters for future requests
  const [params, setParams] = useState({
    name: "",
    startDate: "",
    endDate: "",
    filter: "",
  });

  //fetching student data
  const [data, error, loading] = useFetch("http://api.logicmitra.com:8086/api/user/list", params);

  console.log("sutdetadat" , data)
  //setting student categories count
  const [totalStudents, setTotalStudents] = useState(0);
  const [organizationStudents, setOrganisationStudents] = useState(0);
  const [inactiveStudents, setInactiveStudents] = useState(0);
  const [blockedStudents, setBlockedStudents] = useState(0);
  useEffect(() => {
    setTotalStudents(0);
    setBlockedStudents(0);
    setInactiveStudents(0);
    setOrganisationStudents(0);
    data?.data?.map((item) => {
      setTotalStudents((prevTotal) => prevTotal + 1);
      if (item.status === "blocked") {
        setBlockedStudents((blockedStudents) => blockedStudents + 1);
      } else if (item.status === "1") {
        setOrganisationStudents(
          (organisationStudents) => organisationStudents + 1
        );
      } else if (item.status === "0") {
        setInactiveStudents((inactiveStudents) => inactiveStudents + 1);
      }
    });
  }, [data, params]);

  //handling filters
  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };
  
  const { Delete } = useDeleteOne(`/api/user/delete-student?studentId=`);

  //handling delete student request
  const handleDelete = async (e) => {
    swal({
      title: "Are you sure?",
      text: "you want to delete this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        Delete(e.target.id);

        navigate("/students")
        setParams((prev) => prev);
        window.location.reload()
      } else {
        swal("Your data is safe");
      }
    });
  };

  return (
    <div className="col col-md-10 p-3 bg-main">
      <section className="section">
        <div className="section-header d-flex justify-content-between align-items-center">
          <h1>Students List</h1>
          <div className="">
            <Link to="/students/add" className="btn btn-primary">
              Add Student
            </Link>
          </div>
        </div>
      </section>
      <div className="row ">
        <Card title="Total Students" value={totalStudents} bgColor="bg-1" />
        <Card
          title="Organization Students"
          value={organizationStudents}
          bgColor="bg-2"
        />
        <Card
          title="Inactive Students"
          value={inactiveStudents}
          bgColor="bg-3"
        />
        <Card title="Blocked Students" value={blockedStudents} bgColor="bg-4" />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card ">
            <div className="card-body row">
              <div className="border-bottom mb-3 border-black">
                <h4 className="text-black">Filters</h4>
              </div>
              <div className="col-3 text-black position-relative">
                <label htmlFor="search">Search</label>
                <input
                  type="text"
                  className="form-control fs-6 ps-5"
                  id="search"
                  name="name"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  placeholder=""
                />
                <i className="bi bi-search text-black top-50 icon position-absolute"></i>
              </div>
              <div className="col-3 text-black">
                <label htmlFor="start-date">Start Date</label>
                <input
                  type="date"
                  className="form-control "
                  name="startDate"
                  id="start-date"
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 text-black">
                <label htmlFor="end-date">End Date</label>
                <input
                  type="date"
                  className="form-control "
                  id="endDate"
                  placeholder=""
                  onChange={handleChange}
                  name="end-date"
                />
              </div>
              <div className="col-3 text-black">
                <label htmlFor="filters">Filters</label>
                <select
                  id="filters"
                  className="form-select "
                  value={params.filter}
                  onChange={handleChange}
                  name="filter"
                  aria-label=""
                >
                  <option className="h-100">Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card w-100">
        <div className="card-body ">
          {loading && <h1 className="text-black">Loading...</h1>}
          {error && <h1 className="text-black">{error.message}</h1>}
          
          {
            
            
  
              data?.data && (
          
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col"> Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    <th scope="col">D.O.B</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Courses</th>
                    <th scope="col">Wallet</th>

                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {data?.data?.map((item) => (
                    <tr key={item.id}>
                      {/* {console.log(item.id)} */}
                      {/* <td className="py-1">
                            <img src="../../images/faces/face1.jpg" alt="image"/>
                          </td> */}
                      <td>{item.sname}</td>
                      <td>{item.smobile}</td>
                      <td> {item.semail}</td>
                      <td>{item.scity}</td>
                      <td>{item.sdob}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.status}</td>
                      <td>{item.courses.length}</td>
                      <td>{item.swalletAmt}</td>
                      <td>
                        <Link
                          className=" icon bg-danger icon"
                          onClick={handleDelete}
                        >
                         <i  id={item.id} className="bi bi-trash3"></i>
                        
                         
                        </Link>{" "}
                        <Link
                          className=" icon bg-primary"
                          to={`/students/view/${item.id}`}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </Link>{" "}
                        <Link
                          className="icon bg-warning"
                          to={`/students/edit/${item.id}`}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
