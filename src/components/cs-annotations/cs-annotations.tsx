import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import * as cornerstoneTools from 'cornerstone-tools'
import { useAppStateContext } from '../../contexts/use-app-state-context.hook'
import { FileUploadStatus } from '../../types'

type CSAnnotationsProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function CSAnnotations({ element }: CSAnnotationsProps) {
   const { fileUploadState } = useAppStateContext()
   const isListenerAddedRef = useRef(false)
   const [annotationCount, setAnnotationCount] = useState(0)

   const handleOnMeasurementEventAdd = useCallback(() => {
      setAnnotationCount((prev) => prev + 1)
   }, [])

   useEffect(() => {
      if (!element.current) {
         return
      }

      if (isListenerAddedRef.current && fileUploadState.status !== FileUploadStatus.Uploaded) {
         isListenerAddedRef.current = false
         element.current.removeEventListener(
            cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
            handleOnMeasurementEventAdd,
            false,
         )
         return
      }

      if (!isListenerAddedRef.current && fileUploadState.status === FileUploadStatus.Uploaded) {
         isListenerAddedRef.current = true
         element.current.addEventListener(
            cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
            handleOnMeasurementEventAdd,
            false,
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fileUploadState.status])

   useEffect(() => {
      setAnnotationCount(0)
   }, [fileUploadState])

   return <div>There are {annotationCount} annotations completed!</div>
}
