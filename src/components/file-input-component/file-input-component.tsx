import * as cornerstone from 'cornerstone-core'
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import { ChangeEvent, MutableRefObject } from 'react'

async function loadAndViewImage(file: File, element: HTMLElement) {
   cornerstone.enable(element)

   const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file)

   try {
      const dataset = await cornerstone.loadAndCacheImage(imageId)
      cornerstone.displayImage(element, dataset)
   } catch (error) {
      console.error('Error loading image:', error)
   }
}

type FileInputComponentProps = {
   element: MutableRefObject<HTMLDivElement | null>
}

export function FileInputComponent({ element }: FileInputComponentProps) {
   const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      if (!files?.length || !element.current) {
         return
      }

      const image = files[0]
      loadAndViewImage(image, element.current)
   }

   return (
      <form>
         <input type="file" onChange={handleUpload} />
      </form>
   )
}
