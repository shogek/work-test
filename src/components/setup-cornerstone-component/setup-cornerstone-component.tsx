import { useRef } from 'react'
import * as cornerstone from 'cornerstone-core'
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import * as cornerstoneTools from 'cornerstone-tools'
import * as cornerstoneMath from 'cornerstone-math'
import * as dicomParser from 'dicom-parser'
import Hammer from 'hammerjs'

const setupCornerstone = (): void => {
   cornerstoneTools.external.cornerstone = cornerstone
   cornerstoneTools.external.cornerstoneMath = cornerstoneMath
   cornerstoneTools.external.Hammer = Hammer
   cornerstoneWADOImageLoader.external.cornerstone = cornerstone
   cornerstoneWADOImageLoader.external.dicomParser = dicomParser

   cornerstoneTools.init({
      globalToolSyncEnabled: true,
      showSVGCursors: true,
   })
}

export function SetupCornerstoneComponent() {
   const isInitRef = useRef(false)

   // TODO: Double check that this gets called once even in StrictMode?
   if (!isInitRef.current) {
      isInitRef.current = true
      setupCornerstone()
   }

   return <></>
}
