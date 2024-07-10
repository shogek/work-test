import { useAppStateContext } from '../../contexts/use-app-state-context.hook'

export function ErrorMessage() {
   const { fileUploadState } = useAppStateContext()

   if (!fileUploadState.hasError) {
      return <></>
   }

   // Show this component ONLY when we cannot parse DICOM file (f.e. not a DICOM or bad structure)
   return <>Cannot parse DICOM! Please try another file.</>
}
