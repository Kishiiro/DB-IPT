import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AddModal from "../components/addmodal";
import EditModal from "../components/editmodal";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/employees", {
          cancelToken: ourRequest.token,
        });
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [reload]);

  return (
    <>
      {showModal && (
        <AddModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditModal
          editUser={editUser}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-cyan-300 w-full h-15 p-8 items-center flex">
        <h1 className="text-white font-bold text-4xl">Employees Management</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6 ">
        <div className=" text-right mb-6">
          <div className=" text-left mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-sky-400 hover:bg-red-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/office")}
              className="bg-sky-400 hover:bg-red-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded ml-2"
            >
              Go to Office
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
          >
            + Add
          </button>
        </div>

        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-cyan-200 to-transparent opacity-20 dark:opacity-100">
            <tr>
              <th>Employee Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Extension</th>
              <th>Email</th>
              <th>Office Code</th>
              <th>Reports To</th>
              <th>Job Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-sky-100 to-transparent opacity-20 dark:opacity-100">
            {employees.map((employees: any) => (
              <tr key={employees.employeeNumber}>
                <td>{employees.employeeNumber}</td>
                <td>{employees.firstName}</td>
                <td>{employees.lastName}</td>
                <td>{employees.extension}</td>
                <td>{employees.email}</td>
                <td>{employees.officeCode}</td>
                <td>{employees.reportsTo}</td>
                <td>{employees.jobTitle}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditUser({
                        employeeNumber: employees.employeeNumber,
                        lastName: employees.lastName,
                        firstName: employees.firstName,
                        extension: employees.extension,
                        email: employees.email,
                        officeCode: employees.officeCode,
                        reportsTo: employees.reportsTo,
                        jobTitle: employees.jobTitle,
                      });
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-blue-400 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  { <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `employees/${employees.employeeNumber}`
                          );
                          console.log(response.data);
                          setReload((prev) => prev + 1);
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="bg-red-400 hover:bg-red-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &times;
                  </button> }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default employees;
