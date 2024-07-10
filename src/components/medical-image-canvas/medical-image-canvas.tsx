import { MutableRefObject } from 'react'

type MedicalImageCanvasProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function MedicalImageCanvas({ element }: MedicalImageCanvasProps) {
   return (
      <div ref={element} style={{ width: '512px', height: '512px', border: '1px solid black' }}>
         <canvas className="cornerstone-canvas" />
      </div>
   )
}
