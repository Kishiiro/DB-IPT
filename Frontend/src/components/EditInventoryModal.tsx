import { useRef } from "react";
import Modal from "./modal";
import Axios from "axios";

const AddInventoryModal = ({
  setShowEditModal,
  setReload,
  editInventory,
}: any) => {
  const productCodeRef = useRef<any>("");
  const officeCodeRef = useRef<any>("");
  const quantityInStockRef = useRef<any>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      productCode: productCodeRef.current.value,
      officeCode: officeCodeRef.current.value,
      quantityInStock: Number(quantityInStockRef.current.value),
    };

    const response = await Axios.put(
      `/inventories/${editInventory.productCode}`,
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
        Edit Inventory
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
                  Product Code
                </label>
                <input
                  ref={productCodeRef}
                  id="orderNumber"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="font-semibold text-[1.15rem]"
                >
                Quantity In Stock
                </label>
                <input
                  ref={quantityInStockRef}
                  id="lastName"
                  type="text"
                  className="block mt-[0.5rem] bg-white border border-solid border-gray-300 h-[2.5rem] w-[18rem] outline-none p-[1rem] rounded"
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="requiredDate"
                  className="font-semibold text-[1.15rem]"
                >
                Office Code
                </label>
                <input
                  ref={officeCodeRef}
                  id="requiredDate"
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

export default AddInventoryModal;