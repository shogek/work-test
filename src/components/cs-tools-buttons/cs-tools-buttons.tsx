import { MutableRefObject } from 'react'
import * as cornerstoneTools from 'cornerstone-tools'

type CSToolsButtonsProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function CSToolsButtons({ element }: CSToolsButtonsProps) {
   // TODO: Does it create new stuff if you keep repeatedly clicking it?
   const enableTool = () => {
      cornerstoneTools.addToolForElement(element.current, cornerstoneTools.LengthTool)
      cornerstoneTools.setToolActiveForElement(element.current, 'Length', { mouseButtonMask: 1 })
   }

   const disableTool = () => {
      // TODO: When an annotation tool is disabled, existing annotations for that tool are hidden.
      cornerstoneTools.setToolDisabledForElement(element.current, 'Length')
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
