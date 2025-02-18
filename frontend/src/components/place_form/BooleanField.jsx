const BooleanField = ({ value, setValue }) => {
  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => setValue(false)}
        type="button"
        className={`${
          value ? "bg-transparent" : "bg-secondary/20 py-1 px-3 rounded-lg"
        }`}
      >
        No
      </button>
      <button
        onClick={() => setValue(true)}
        type="button"
        className={`${
          !value ? "bg-transparent" : "bg-secondary/20 py-1 px-3 rounded-lg"
        }`}
      >
        Yes
      </button>
    </div>
  );
};

export default BooleanField;
