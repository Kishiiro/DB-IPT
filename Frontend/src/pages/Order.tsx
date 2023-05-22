import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AddOrderModal from "../components/AddOrderModal";
import EditOrderModal from "../components/EditOrderModal";

const orders = () => {
  const [orders, setorderss] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState<any>({});
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get("/orders", {
          cancelToken: ourRequest.token,
        });
        setorderss(response.data);
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
        <AddOrderModal setReload={setReload} setShowModal={setShowModal} />
      )}
      {showEditModal && (
        <EditOrderModal
          editOrder={editOrder}
          setReload={setReload}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div className="bg-blue-500 w-full h-14 p-8 items-center flex">
        <h1 className="text-white font-bold text-2xl">Orders</h1>
      </div>
      <div className="container mx-auto mt-6 mb-6 ">
        <div className=" text-right mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
          >
            + Add
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-neutral-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>

        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Required Date</th>
              <th>Shipped Date</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Customer Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
            {orders.map((orders: any) => (
              <tr key={orders.orderNumber}>
                <td>{orders.orderNumber}</td>
                <td>{orders.orderDate}</td>
                <td>{orders.requiredDate}</td>
                <td>{orders.shippedDate}</td>
                <td>{orders.status}</td>
                <td>{orders.comments}</td>
                <td>{orders.customerNumber}</td>
                <td>
                  <button
                    onClick={async () => {
                      setEditOrder({
                        orderNumber: orders.orderNumber,
                        orderDate: orders.orderDate,
                        requiredDate: orders.requiredDate,
                        shippedDate: orders.shippedDate,
                        status: orders.status,
                        comments: orders.comments,
                        customerNumber: orders.customerNumber,
                      });
                      setShowEditModal(true);
                    }}
                    className="mr-4 bg-blue-400 hover:bg-blue-600 duration-300 transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
                  >
                    &#9998;
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        var result = confirm("Want to delete?");
                        if (result) {
                          const response = await Axios.delete(
                            `orders/${orders.orderNumber}`
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
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default orders;
