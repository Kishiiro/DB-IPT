import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const SalesByMonth = () => {
  const [salesData, setSalesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.post("products/salesbymonth", {
          cancelToken: ourRequest.token,
        });
        setSalesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return (
    <>
      <div className="bg-cyan-300 w-full h-15 p-8 items-center flex">
        <h1 className="text-white font-bold text-4xl">Sales By Month</h1>
      </div>
      <div className="container md:mx-auto mt-8 mb-6">
        <div className=" text-left mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-sky-400 hover:bg-red-500 duration-300 transition-all ease-in-out text-white font-semibold py-2 px-4 rounded"
          >
            Homepage
          </button>
        </div>
        <table
          cellPadding={10}
          className=" text-center h-auto w-full border  border-black"
        >
          <thead className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-cyan-200 to-transparent opacity-20 dark:opacity-100">
            <tr>
              <th className="py-2 px-4">Year</th>
              <th className="py-2 px-4">Month</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Total Quantity</th>
              <th className="py-2 px-4">Total Sales</th>
            </tr>
          </thead>
          <tbody className="h-[20px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-sky-100 to-transparent opacity-20 dark:opacity-100">
            {salesData.map((sale: any, index: number) => (
              <>
              <tr key={sale.year}>
                <td>{sale.year}</td>
                <td>{sale.month}</td>
                <td>{sale.productName}</td>
                <td>{sale.totalQuantity}</td>
                <td>{sale.totalSales}</td>
              </tr>
              
              
              {index !== salesData.length - 1 && (
                <tr className="spacing-row">
                  <td colSpan={11} className="h-4">
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

export default SalesByMonth;
