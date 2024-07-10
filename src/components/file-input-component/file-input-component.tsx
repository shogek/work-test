import * as cornerstone from 'cornerstone-core'
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import { ChangeEvent, MutableRefObject } from 'react'
import { FileUploadStatus, OperationResult } from '../../types'
import { useAppStateContext } from '../../contexts/use-app-state-context.hook'

async function tryLoadAndViewImage(file: File, element: HTMLElement): Promise<OperationResult> {
   cornerstone.enable(element)

   const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file)

   try {
      const dataset = await cornerstone.loadAndCacheImage(imageId)
      cornerstone.displayImage(element, dataset)
      return { isSuccess: true }
   } catch (error) {
      console.error('Error loading image:', error)
      /** TODO: This removes the existing image on error but doesn't show a new one on success */
      // cornerstone.disable(element)
      return { isSuccess: false }
   }
}

type FileInputComponentProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function FileInputComponent({ element }: FileInputComponentProps) {
   const { setFileUploadState } = useAppStateContext()

   const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      if (!files?.length || !element.current) {
         return
      }

      const image = files[0]
      const result = await tryLoadAndViewImage(image, element.current)
      if (!result.isSuccess) {
         setFileUploadState({ status: FileUploadStatus.Error })
         return
      }

      setFileUploadState({ status: FileUploadStatus.Uploaded, name: image.name })
   }

   return (
      <form>
         <input type="file" onChange={handleUpload} />
      </form>
   )
}
