import { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as cornerstoneTools from 'cornerstone-tools'
import { useAppStateContext } from '../../contexts/use-app-state-context.hook'

type CSAnnotationsProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

function measurementEventAdd(element: HTMLDivElement, callback: () => void) {
   const measurementCompletedEvent = cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED
   element.addEventListener(measurementCompletedEvent, callback, false)
}

export function CSAnnotations({ element }: CSAnnotationsProps) {
   const { fileUploadState } = useAppStateContext()
   const isListenerAddedRef = useRef(false)
   const [annotationCount, setAnnotationCount] = useState(0)

   const handleOnMeasurementEventAdd = () => {
      setAnnotationCount((prev) => prev + 1)
   }

   useEffect(() => {
      if (fileUploadState.hasError || !element.current) {
         return
      }

      if (!isListenerAddedRef.current) {
         measurementEventAdd(element.current, handleOnMeasurementEventAdd)
      }

      // TODO: Unsubscribe from the event

      return () => {
         // TODO: Unsubscribe from the event
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fileUploadState.hasError])

   // TODO: reset annotation count on image change.
   return <div>There are {annotationCount} annotations completed!</div>
}
