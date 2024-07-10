import { MutableRefObject } from 'react'

type MedicalImageCanvasProps = {
   element: MutableRefObject<HTMLCanvasElement | null>
}

export function MedicalImageCanvas({ element }: MedicalImageCanvasProps) {
   // TODO: Use the `element` prop
   return (
      <div style={{ width: '512px', height: '512px', border: '1px solid black' }}>
         <canvas className="cornerstone-canvas" />
      </div>
   )
}
