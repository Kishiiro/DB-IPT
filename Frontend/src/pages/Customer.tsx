import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";

const Customer = () => {
  const [customers, setCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/Customers", {
          cancelToken: ourRequest.token,
        });
        setCustomer(response.data);
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
        <AddCustomerModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditCustomerModal
          editCustomer={editCustomer}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-cyan-300 w-full h-15 p-8 items-center flex">
        <h1 className="text-white font-bold text-4xl">Customers</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-right mb-6">
        <div className=" text-left mb-6">
            <button
              onClick={() => navigate("/")}
              className="bg-sky-400 hover:bg-red-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
            >
              Homepage
            </button>
            <button
              onClick={() => navigate("/payment")}
              className="bg-sky-400 hover:bg-red-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded ml-2"
            >
              Go to Payments
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
              <th className="py-2 px-4">Customer Number</th>
              <th className="py-2 px-4">Customer Name </th>
              <th className="py-2 px-4">Contact Last Name</th>
              <th className="py-2 px-4">Contact First Name</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Address Line 1</th>
              <th className="py-2 px-4">Address Line 2</th>
              <th className="py-2 px-4">City</th>
              <th className="py-2 px-4">State</th>
              <th className="py-2 px-4">Postal Code</th>
              <th className="py-2 px-4">Country</th>
              <th className="py-2 px-4">Employee Number</th>
              <th className="py-2 px-4">Credit Limit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-sky-100 to-transparent opacity-20 dark:opacity-100">
            {customers.map((customer: any, index: number) => (
              <>
                <tr key={customer.customerCode}>
                  <td>{customer.customerNumber}</td>
                  <td>{customer.customerName}</td>
                  <td>{customer.contactLastName}</td>
                  <td>{customer.contactFirstName}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.addressLine1}</td>
                  <td>{customer.addressLine2}</td>
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>{customer.postalCode}</td>
                  <td>{customer.country}</td>
                  <td>{customer.salesRepEmployeeNumber}</td>
                  <td>{customer.creditLimit}</td>
                  <td>
                    <button
                      onClick={async () => {
                        setEditCustomer({
                          customerNumber: customer.customerNumber,
                          customerName: customer.customerName,
                          contactLastName: customer.contactLastName,
                          contactFirstName: customer.contactFirstName,
                          phone: customer.phone,
                          addressLine1: customer.addressLine1,
                          addressLine2: customer.addressLine2,
                          city: customer.city,
                          state: customer.state,
                          postalCode: customer.postalCode,
                          country: customer.country,
                          salesRepEmployeeNumber:
                            customer.salesRepEmployeeNumber,
                          creditLimit: customer.creditLimit,
                        });
                        setShowEditModal(true);
                      }}
                      className="m-6 bg-blue-400 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                      &#9998;
                    </button>
                    {/* <button
                      onClick={async () => {
                        try {
                          var result = confirm("Want to delete?");
                          if (result) {
                            const response = await Axios.delete(
                              `customers/${customer.customerNumber}`
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
                    </button> */}
                  </td>
                </tr>
                {index !== customers.length - 1 && (
                  <tr className="spacing-row">
                    <td colSpan={14} className="h-4">
                      <hr className="border-gray-400" />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Customer;
