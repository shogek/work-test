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

/** Make sure that enabling happens only once */
let IS_CORNERSTONE_ENABLED = false

export function SetupCornerstoneComponent() {
   if (!IS_CORNERSTONE_ENABLED) {
      IS_CORNERSTONE_ENABLED = true
      setupCornerstone()
   }

   return <></>
}
