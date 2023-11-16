import { useEffect, useState } from "react"


export default function TestNi(){
    const [data, setData] = useState(1)

    useEffect(()=>{
        setTimeout(()=>{ setData(data+1)},500);
    },[data]);
    return (
        <>
            <h1>{data}</h1>
        </>
    )
}