import { MutableRefObject, useRef } from 'react'
import * as cornerstoneTools from 'cornerstone-tools'

type CSToolsButtonsProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function CSToolsButtons({ element }: CSToolsButtonsProps) {
   const isToolEnabledRef = useRef(false)

   const enableTool = () => {
      if (isToolEnabledRef.current) {
         return
      }

      isToolEnabledRef.current = true
      cornerstoneTools.addToolForElement(element.current, cornerstoneTools.LengthTool)
      cornerstoneTools.setToolActiveForElement(element.current, 'Length', { mouseButtonMask: 1 })
   }

   const disableTool = () => {
      isToolEnabledRef.current = false
      // TODO: When an annotation tool is disabled, existing annotations for that tool are hidden.
      // TODO: Is this a bug?
      cornerstoneTools.setToolDisabledForElement(element.current, 'Length', { mouseButtonMask: 1 })
   }

   return (
      <div>
         <button
            style={{
               backgroundColor: '#333',
               color: '#FFF',
               padding: '5px',
               margin: '10px',
            }}
            onClick={enableTool}
         >
            Enable tools
         </button>
         <div></div>
         <button
            style={{
               backgroundColor: '#333',
               color: '#FFF',
               padding: '5px',
               margin: '10px',
            }}
            onClick={disableTool}
         >
            Disable tools
         </button>
      </div>
   )
}
