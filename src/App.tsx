import { useRef } from 'react'
import { FileInputComponent } from './components/file-input-component/file-input-component'
import { MedicalImageCanvas } from './components/medical-image-canvas/medical-image-canvas'
import { SetupCornerstoneComponent } from './components/setup-cornerstone-component/setup-cornerstone-component'
import { ErrorMessage } from './components/error-message/error-message'
import { CSToolsButtons } from './components/cs-tools-buttons/cs-tools-buttons'
import { CSAnnotations } from './components/cs-annotations/cs-annotations'
import { ReportSummaryComponent } from './components/report-summary-component/report-summary-component'
import './app.css'

function App() {
   const imageRef = useRef<HTMLCanvasElement | null>(null)

   return (
      <div>
         <SetupCornerstoneComponent></SetupCornerstoneComponent>
         <FileInputComponent element={imageRef}></FileInputComponent>
         <MedicalImageCanvas element={imageRef}></MedicalImageCanvas>
         <ErrorMessage></ErrorMessage>
         <CSToolsButtons element={imageRef}></CSToolsButtons>
         <CSAnnotations></CSAnnotations>
         <ReportSummaryComponent></ReportSummaryComponent>
      </div>
   )
}

export default App
