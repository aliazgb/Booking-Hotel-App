import React, { useEffect } from "react";
import { useBookMark } from "../../Context/BookMarkProvider";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams;
  const { getBookmark, isLoadingCurrentBookmark, currentBookMark } =
    useBookMark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrentBookmark || !currentBookMark) return <Loader />;

  return <div>SingleBookmark</div>;
}

export default SingleBookmark;
