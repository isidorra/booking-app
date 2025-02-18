
const NumericField = ({value, setValue, minValue, maxValue}) => {

    const increase = () => {
        if(value - 1 >= minValue)
            setValue(value - 1);
    }

    const decrease = () => {
        if(value + 1 <= maxValue)
            setValue(value + 1);
    }
  return (
    <div className="flex items-center gap-5 text-lg">
        <button onClick={increase} type="button" className="border border-secondary/20 py-1 px-3 rounded-lg">-</button>
            <p>{value}</p>
        <button onClick={decrease} type="button" className="border border-secondary/20 py-1 px-3 rounded-lg">+</button>
    </div>
  )
}

export default NumericField