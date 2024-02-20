import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader.jsx";
import Stores from "../components/Stores.jsx";
import apiService from "../utils/apiService.jsx";

export default function StoresList() {
  const { getStores } = apiService;

  const { data: stores, isLoading } = useQuery({
    queryFn: () => getStores(), 
    queryKey: ["stores"],
  });


  if (isLoading) {
    <Preloader />;
  }

  return (
    <>
      <div className="flex flex-row justify-between h-full bg-white">
        <section className=" w-[800px] h-full overflow-y-scroll grow">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center px-12 
           mt-10">
           {stores &&
              stores
                .filter((store) => store.products && store.products.length > 0) // Filter out stores with zero products
                .map((item, i) => (
                  <Link to={`/storefront?id=${item._id}`} className="w-full" key={i}>
                    <Stores data={item} />
                  </Link>
                ))}
          </ul>
          {/* <Footer /> */}
        </section>
      </div>
    </>
  );
}
