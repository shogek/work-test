import * as cornerstone from 'cornerstone-core'
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import { MutableRefObject } from 'react'

const loadAndViewImage = async (file: File, element: HTMLElement) => {
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
   element: MutableRefObject<HTMLCanvasElement | null>
}

export function FileInputComponent({ element }: FileInputComponentProps) {
   // when file is uploaded - run handleUpload
   // TODO: Use the method
   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      // get image file form event
      const image = undefined

      if (image && element?.current) {
         loadAndViewImage(image, element.current)
      }
   }
   return (
      <form>
         <input type="file" />
      </form>
   )
}
