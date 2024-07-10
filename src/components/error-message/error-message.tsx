import { useAppStateContext } from '../../contexts/use-app-state-context.hook'
import { FileStatus } from '../../types'

export function ErrorMessage() {
   const { fileState } = useAppStateContext()

   if (fileState.status !== FileStatus.Error) {
      return <></>
   }

   // Show this component ONLY when we cannot parse DICOM file (f.e. not a DICOM or bad structure)
   return <>Cannot parse DICOM! Please try another file.</>
}
