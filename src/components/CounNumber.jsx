import React, { useEffect, useMemo, useRef, useState } from 'react'
import ButtonComponents from './ButtonComponents'
import { Form } from 'react-bootstrap'
export default function CounNumber() {
    const [count, setCount] = useState(0)
    const myRef = useRef()
    const [inputValue, setInputValue ] = useState()

    useEffect(() => {
        console.log("This is useEffect in React js..." + count)

        myRef.current.focus()

       
    }, [count])

    const calcullators = (num) => {
        return num* 2;
    }

    const doubleCount = useMemo(() => calcullators(count), [count])

    return (
    <div>
    <div>
      <p>dsfkl</p>
      <ButtonComponents onClick={() => setCount(count + 1)} text="count" type="button" background="yellow"/>
    </div>

    <div>
        <p>This is useRef</p>
        <p>expensiveresult: {doubleCount}</p>
        <Form.Control ref={myRef} type='text' onChange={(e) => setInputValue(e?.target?.value)} value={inputValue}/>
    </div>
    </div >
  )
}
