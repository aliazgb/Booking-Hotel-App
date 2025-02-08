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
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <Commet color="var(--primary-700)" size="medium" />
      <p>Loading Data ...</p>
    </div>
  );
}
export default Loader;
