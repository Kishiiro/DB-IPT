import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const EditPaymentModal = ({
  setShowEditModal,
  setReload,
  editPayment,
}: any) => {
  const customerNumberRef = useRef<any>("");
  const checkNumberRef = useRef<any>("");
  const paymentDateRef = useRef<any>("");
  const amountRef = useRef<any>("");


  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
        customerNumber: customerNumberRef.current.value,
        checkNumber: checkNumberRef.current.value,
        paymentDate: paymentDateRef.current.value,
        amount: amountRef.current.value,
    };

    const response = await Axios.put(
      `/payments/${editPayment.customerNumber}`,
      data
    );
    setReload((prev: any) => prev + 1);
    setShowEditModal(false);
    console.log(data);
    console.log(response.data);
  };

  return (
    <Modal
      onClick={() => setShowEditModal(false)}
      className="flex flex-col justify-center items-center bg-white"
    >
      <h1 className="font-bold text-[2rem] mb-[1.5rem]  text-sky-400">
        Edit Payment
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
                  ref={customerNumberRef}
                  defaultValue={editPayment.customerNumber}
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
                  ref={checkNumberRef}
                  defaultValue={editPayment.checkNumber}
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
                  ref={paymentDateRef}
                  defaultValue={editPayment.paymentDate}
                  id="requiredDate"
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
                  ref={amountRef}
                  id="amount"
                  defaultValue={editPayment.amount}
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditPaymentModal;