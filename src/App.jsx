import React, { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  // useref is used to get the value of the input field

  const passref = useRef(null)

  // useCallBack  it is memorize the function and it will not re-render the function


  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "@#$%^&*"
    }

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))

    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passref.current.select();
    passref.current.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password])


  //useEffect it will re-render the function

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])


  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-52 h-52
     bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3 text-3xl '>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className=" outline-none w-full px-4 py-2 text-xl"
          placeholder="Password"
          value={password}
          readOnly
          ref={passref}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-cyan-500 text-white px-4 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex  text-lg gap-x-5'>
        <div className='flex items-center gap-x-3'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer  '
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
