import { LoaderIcon } from "react-hot-toast";
import { Commet } from "react-loading-indicators";
function Loader() {
  return (
    <div
      style={{
        color: "var(--primary-600)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <p> Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
  );
}
export function MainLoader() {
  return (
    <div
      style={{
        width: "100vw",
        color: "var(--primary-600)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <Commet color="#3424d6" size="medium" text="" textColor="#2f1de2" />
    </div>
  );
}
export default Loader;
