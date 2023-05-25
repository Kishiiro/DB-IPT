import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddPaymentModal = ({ setShowModal, setReload }: any) => {
    const customerNumber = useRef<any>("");
    const checkNumber = useRef<any>("");
    const paymentDate = useRef<any>("");
    const amount = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
        customerNumber: customerNumber.current.value,
        checkNumber: checkNumber.current.value,
        paymentDate: paymentDate.current.value,
        amount: amount.current.value, 
    };

    const response = await Axios.post("/payments/create", data);
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
        Add Payments
      </h1>
      <form onSubmit={submitHandler}>
        <div className="flex gap-8 items-center">
          <div>
            <div className="flex items-center gap-4">
              <div className="mb-4">
                <label
                  htmlFor="customerNumber"
                  className="font-semibold text-[1.15rem]"
                >
                Customer Number
                </label>
                <input
                  ref={customerNumber}
                  id="customerNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="checkNumber"
                  className="font-semibold text-[1.15rem]"
                >
                Check Number
                </label>
                <input
                  ref={checkNumber}
                  id="checkNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="paymentDate"
                  className="font-semibold text-[1.15rem]"
                >
                Payment Date
                </label>
                <input
                  ref={paymentDate}
                  id="paymentDate"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="amount"
                  className="font-semibold text-[1.15rem]"
                >
                Amount
                </label>
                <input
                  ref={amount}
                  id="amount"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-sky-400 mt-[1.5rem] text-white h-[2.8rem] rounded w-[20rem] font-semibold transition-all duration-[0.3s] ease-in-out hover:bg-blue-600"
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddPaymentModal;