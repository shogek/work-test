import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import * as cornerstoneTools from 'cornerstone-tools'
import { useAppStateContext } from '../../contexts/use-app-state-context.hook'
import { FileStatus } from '../../types'

type CSAnnotationsProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function CSAnnotations({ element }: CSAnnotationsProps) {
   const { fileState, incrementAnnotations } = useAppStateContext()
   const isListenerAddedRef = useRef(false)

   const annotationCount = fileState.status === FileStatus.Uploaded ? fileState.annotations : 0

   const handleOnMeasurementEventAdd = useCallback(() => {
      incrementAnnotations()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // TODO: Make this readable for god's sake
   useEffect(() => {
      if (!element.current) {
         return
      }

      if (isListenerAddedRef.current && fileState.status !== FileStatus.Uploaded) {
         isListenerAddedRef.current = false
         element.current.removeEventListener(
            cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
            handleOnMeasurementEventAdd,
            false,
         )
         return
      }

      if (!isListenerAddedRef.current && fileState.status === FileStatus.Uploaded) {
         isListenerAddedRef.current = true
         element.current.addEventListener(
            cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
            handleOnMeasurementEventAdd,
            false,
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [fileState.status])

   return <div>There are {annotationCount} annotations completed!</div>
}
