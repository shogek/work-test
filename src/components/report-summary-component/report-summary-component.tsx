import { useState } from 'react'

export function ReportSummaryComponent() {
   const [summaryStatus, setSummaryStatus] = useState('')
   const [successCount, setCounter] = useState(0)

   const debounceRequest = () => {
      // implement debounce send request
      // pass variables with current summary text and current annotation count
      sendRequest('ABC', 1)
   }

   const sendRequest = (text: string, annotations: number) => {
      // fix fetch based on response
      setSummaryStatus('mutating')
      fetch(`https://mocki.io/v1/3dd330f6-dabc-46e7-8763-be8c977f1667?text=${text}&annotations=${annotations}`)
      setSummaryStatus('success')
      setCounter(successCount + 1)
   }

   // clear counters and state on new image

   return (
      <>
         <input
            style={{ width: '512px', height: '512px', border: '1px solid black' }}
            onChange={debounceRequest}
            placeholder={'summary'}
         ></input>
         <span style={{ margin: '10px', color: 'red' }}>
            {summaryStatus} ( {successCount} )
         </span>
      </>
   )
}
