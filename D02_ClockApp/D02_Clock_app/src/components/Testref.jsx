import React,{useState,useEffect} from 'react'

const Testref = () => {
    const [input, setInput] = useState('')
    const inputRef = useRef();
    const handleClick = () => {
        inputElement.current.focus();
    }
  return (
    <div>
    <input
     value={input}
    onChange={(e)=> setInput(e.target.value)} placeholder='Enter any value '/>
    <input type='button'/>
    </div>
  )
}

export default Testref
