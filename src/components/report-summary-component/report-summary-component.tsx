import { ChangeEvent, useEffect, useState } from 'react'
import { useAppStateContext } from '../../contexts/use-app-state-context.hook'
import { FileStatus } from '../../types'

enum RequestStatus {
   Initial = 'initial',
   Mutating = 'mutating',
   Error = 'error',
   Success = 'success',
}

let REQUEST_TIMEOUT_ID: number | undefined
const REQUEST_DEBOUNCE_MS = 1_000

export function ReportSummaryComponent() {
   const { fileState } = useAppStateContext()
   const [summary, setSummary] = useState('')
   const [successfulRequestCount, setSuccessfulRequestCount] = useState(0)
   const [requestStatus, setRequestStatus] = useState(RequestStatus.Initial)

   useEffect(() => setSummary(''), [fileState.timestamp])

   const annotations = fileState.status === FileStatus.Uploaded ? fileState.annotations : 0

   const debounceRequest = (e: ChangeEvent<HTMLInputElement>) => {
      setSummary(e.target.value)

      const currentAnnotationCount = annotations

      clearTimeout(REQUEST_TIMEOUT_ID)
      REQUEST_TIMEOUT_ID = setTimeout(() => sendRequest(e.target.value, currentAnnotationCount), REQUEST_DEBOUNCE_MS)
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
