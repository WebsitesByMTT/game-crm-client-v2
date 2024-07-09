const Delete = ({ title, id, handleDelete, setOpen }) => {
  return (
    <div>
      <p className="">
        Are you sure you want to delete this <span>{title}</span>
      </p>
      <div className="flex gap-10 pt-5">
        <button
          className="px-4 py-2 rounded-md viewgradient text-black"
          onClick={() => handleDelete(id)}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 rounded-md deletegradient text-black"
          onClick={() => setOpen(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Delete;
