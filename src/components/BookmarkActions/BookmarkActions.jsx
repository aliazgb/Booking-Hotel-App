import React from "react";
import { IoIosOptions } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

function BookmarkActions({ handleEditPerson, handleEditDate, handleDelete, item }) {
  return (
    <div className="flex justify-between gap-3.5">
      <button className="" onClick={(e) => handleEditPerson(e, item.id)}>
        <IoIosOptions />
      </button>
      <button onClick={() => handleEditDate(item.id, item.date)}>
        <CiCalendarDate />
      </button>
      <button onClick={() => handleDelete(item.id)}>
        <RxCross2 />
      </button>
    </div>
  );
}

export default BookmarkActions;
