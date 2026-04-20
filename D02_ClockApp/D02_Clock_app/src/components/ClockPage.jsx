import React, {useEffect, useState} from 'react'

const ClockPage = () => {
  const [hh, setHh] = useState(0)
  const [mm, setMm] = useState(0)
  const [ss, setSs] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let s = ss + 1;
      let m = mm + Math.floor(s / 60);
      s = s % 60;
      let h = hh + Math.floor(m / 60);
      m = m % 60;
      setSs(s);
      setMm(m);
      setHh(h);
    }, 1000);

    return () => {
      
    }
  }, [ss])

  return (
    <div>
      <div style={{display: 'inline-block'}}>{hh}</div>:
      <div style={{display: 'inline-block'}}>{mm}</div>:
      <div style={{display: 'inline-block'}}>{ss}</div>
      
    </div>
  )
}

export default ClockPage