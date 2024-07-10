import { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/use-debounce.hook'

// TODO: Explain that there is a discrepancy in the document regarding what should be included in the "text" field
// TODO: Explain that the request always fails if it has additional request parameters

enum RequestStatus {
   Initial = 'initial',
   Mutating = 'mutating',
   Error = 'error',
   Success = 'success',
}

export function ReportSummaryComponent() {
   const [summary, setSummary] = useState('')
   const debouncedSummary = useDebounce({ value: summary, delayInMs: 1_000 })
   const [successfulRequestCount, setSuccessfulRequestCount] = useState(0)
   const [requestStatus, setRequestStatus] = useState(RequestStatus.Initial)

   useEffect(() => {
      if (!debouncedSummary) {
         return
      }

      sendRequest(debouncedSummary, 1)
   }, [debouncedSummary])

   // TODO: Bring back the `debounceRequest` method as per requirements

   const sendRequest = (text: string, annotations: number) => {
      setRequestStatus(RequestStatus.Mutating)

      const url = `https://668d5423099db4c579f29906.mockapi.io/test?text=${text}&annotations=${annotations}`
      fetch(url)
         .then((response) => {
            if (!response.ok) {
               setRequestStatus(RequestStatus.Error)
               return
            }

            setRequestStatus(RequestStatus.Success)
            setSuccessfulRequestCount((prev) => prev + 1)
         })
         .catch(() => {
            setRequestStatus(RequestStatus.Error)
         })
   }

   // TODO: Clear counters and state on new image

   return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
         <input
            value={summary}
            style={{ width: '512px', height: '512px', border: '1px solid black' }}
            onChange={(e) => setSummary(e.target.value)}
            placeholder={'summary'}
         ></input>
         <span style={{ margin: '10px', color: 'red' }}>
            {requestStatus} ( {successfulRequestCount} )
         </span>
      </div>
   )
}
