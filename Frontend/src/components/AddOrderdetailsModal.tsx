import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddOrderdetailsModal = ({ setShowModal, setReload }: any) => {
  const orderNumberRef = useRef<any>("");
  const productCodeRef = useRef<any>("");
  const quantityOrderedRef = useRef<any>("");
  const priceEachRef = useRef<any>("");
  const orderLineNumberRef = useRef<any>("");


  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      orderNumber: orderNumberRef.current.value,
      productCode: productCodeRef.current.value,
      quantityOrdered: quantityOrderedRef.current.value,
      priceEach: priceEachRef.current.value,
      orderLineNumber: orderLineNumberRef.current.value,
    };

    const response = await Axios.post("/orderdetails/create", data);
    setReload((prev: any) => prev + 1);
    setShowModal(false);
    console.log(data);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowModal(false)}
      className="flex flex-col justify-center items-center bg-white"
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem] text-sky-400">
        Add Order Details
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="orderNumber"
                  className="font-semibold text-[1.15rem]"
                >
                  Order Number
                </label>
                <input
                  ref={orderNumberRef}
                  id="orderNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productCode"
                  className="font-semibold text-[1.15rem]"
                >
                  Product Code
                </label>
                <input
                  ref={productCodeRef}
                  id="productCode"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="quantityOrdered"
                  className="font-semibold text-[1.15rem]"
                >
                  Quantity Ordered
                </label>
                <input
                  ref={quantityOrderedRef}
                  id="quantityOrdered"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-[1rem]">
                <label
                  htmlFor="priceEach"
                  className="font-semibold text-[1.15rem]"
                >
                  Price Each
                </label>
                <input
                  ref={priceEachRef}
                  id="priceEach"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="mb-[1rem]">
                  <label
                    htmlFor="orderLineNumber"
                    className="font-semibold text-[1.15rem]"
                  >
                    Order Line Number
                  </label>
                  <input
                    ref={orderLineNumberRef}
                    id="orderLineNumber"
                    type="text"
                    className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-sky-400 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-blue-600"
              >
                Add Order Details
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderdetailsModal;
