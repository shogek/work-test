import { ChangeEvent, useState } from 'react'

// TODO: Explain that there is a discrepancy in the document regarding what should be included in the "text" field
// TODO: Explain that the request always fails if it has additional request parameters

enum RequestStatus {
   Initial = 'initial',
   Mutating = 'mutating',
   Error = 'error',
   Success = 'success',
}

let REQUEST_TIMEOUT_ID: number | undefined
const REQUEST_DEBOUNCE_MS = 1_000

export function ReportSummaryComponent() {
   const [summary, setSummary] = useState('')
   const [successfulRequestCount, setSuccessfulRequestCount] = useState(0)
   const [requestStatus, setRequestStatus] = useState(RequestStatus.Initial)

   const debounceRequest = async (e: ChangeEvent<HTMLInputElement>) => {
      setSummary(e.target.value)

      clearTimeout(REQUEST_TIMEOUT_ID)
      REQUEST_TIMEOUT_ID = setTimeout(() => sendRequest(e.target.value, 1), REQUEST_DEBOUNCE_MS)
   }

   const sendRequest = async (text: string, annotations: number) => {
      setRequestStatus(RequestStatus.Mutating)

      const url = `https://668d5423099db4c579f29906.mockapi.io/test?text=${text}&annotations=${annotations}`

      try {
         const response = await fetch(url)
         if (!response.ok) {
            setRequestStatus(RequestStatus.Error)
            return
         }

         setRequestStatus(RequestStatus.Success)
         setSuccessfulRequestCount((prev) => prev + 1)
      } catch (error) {
         setRequestStatus(RequestStatus.Error)
      }
   }

   // TODO: Clear counters and state on new image

   return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
         <input
            value={summary}
            style={{ width: '512px', height: '512px', border: '1px solid black' }}
            onChange={(e) => debounceRequest(e)}
            placeholder={'summary'}
         ></input>

         <span style={{ margin: '10px', color: 'red' }}>
            {requestStatus} {successfulRequestCount > 0 && <>( {successfulRequestCount} )</>}
         </span>
      </div>
   )
}
