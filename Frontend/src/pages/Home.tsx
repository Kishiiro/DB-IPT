import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <body className="bg-gradient-to-r from-sky-300 to-cyan-200 antialiased leading-relaxed">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-8xl font-bold mb-4 text-gray-600">Select</h1>
        <div className="justify-center gap-4 p-4 rounded w-[350px] flex flex-row">
          <button
            onClick={() => navigate("/employee")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-600 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
          >
            Employee
          </button>
          {
            <button
              onClick={() => navigate("/order")}
              className="bg-sky-100 rounded-full p-5 px-10 text-gray-600 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
            >
              Orders
            </button>
          }
          <button
            onClick={() => navigate("/product")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-600 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
          >
            Product
          </button>
          <button
            onClick={() => navigate("/customer")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-600 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
          >
            Customer
          </button>
          <button
            onClick={() => navigate("/inventory")}
            className="bg-sky-100 rounded-full p-5 px-10 text-gray-600 uppercase text-2xl font-semibold tracking-widest my-5 self-start shadow-lg drop-shadow-lg hover:scale-105 duration-300  hover:bg-gradient-to-tr from-bg-rose-600 to-bg-sky-600 hover:text-white hover:shadow-slate-600 hover:shadow-lg hover:drop-shadow-2xl"
          >
            Inventory
          </button>

        </div>
      </div>
    </body>
  );
};

export default Home;
