import { AiOutlineCaretDown } from 'react-icons/ai'


const InputField = ({dropDown, field, defaultValue}) => {
  return (
    <div className="text-md flex flex-col items-start gap-4 font-semibold">
      <h4>{field}</h4>
      <div className="relative max-w-[600px] w-full rounded-xl border border-gray-400 p-3 px-4">
        <input
          type="text"
          className="h-full w-[90%] text-gray-700 outline-none"
          defaultValue={defaultValue}
        />
        <AiOutlineCaretDown
          className={`absolute ${dropDown ? 'visible' : 'invisible'}
        right-2 top-[40%] cursor-pointer text-gray-600 
        `}
        />
      </div>
    </div>
  )
}

export default InputField