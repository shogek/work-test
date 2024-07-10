import { useAppStateContext } from '../../contexts/use-app-state-context.hook'
import { FileUploadStatus } from '../../types'

export function ErrorMessage() {
   const { fileUploadState } = useAppStateContext()

   if (fileUploadState.status !== FileUploadStatus.Error) {
      return <></>
   }

   // Show this component ONLY when we cannot parse DICOM file (f.e. not a DICOM or bad structure)
   return <>Cannot parse DICOM! Please try another file.</>
}
