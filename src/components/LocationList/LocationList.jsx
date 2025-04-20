import { Link } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { MainLoader } from "../Loader/Loader";
function LocationList() {
  const { data, isLoading } = useFetch(
    "https://server-xb4n.onrender.com/hotels",
    ""
  );

  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div className="max-w-[1280px] mx-auto my-8">
      <h2 className="mb-4 font-bold sm:text-2xl mx-2">Nearby Locations</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] m-2 gap-8">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className="rounded-lg shadow-2xl ring-1 ring-gray-300 hover:brightness-110 hover:-translate-y-1
              transition-all duration-300 ease-in-out p-4"
              >
                <img
                  className="w-full h-80 object-cover object-center rounded-lg mb-2"
                  src={item.xl_picture_url}
                  alt={item.name}
                />
                <div className="space-y-1">
                  <p className="font-medium">{item.smart_location}</p>
                  <p className="text-[var(--text-400)]">{item.name}</p>
                  <p className="font-medium flex items-center">
                    €&nbsp;{item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
