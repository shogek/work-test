import { createContext, PropsWithChildren, useState } from 'react'
import { FileState, FileStatus } from '../types'

type AppState = {
   fileState: FileState
   incrementAnnotations: () => void
   setFileUploadSuccess: (fileName: string) => void
   setFileUploadFailure: () => void
}

export const AppStateContext = createContext<AppState | null>(null)

type AppStateContextProviderProps = PropsWithChildren

export function AppStateContextProvider({ children }: AppStateContextProviderProps) {
   const [fileState, setFileState] = useState<FileState>({ status: FileStatus.NoFile, timestamp: Date.now() })

   const incrementAnnotations = () => {
      setFileState((prevState) => {
         return prevState.status !== FileStatus.Uploaded
            ? prevState
            : { ...prevState, annotations: prevState.annotations + 1 }
      })
   }

   const setFileUploadFailure = () => {
      setFileState({ status: FileStatus.Error, timestamp: Date.now() })
   }

   const setFileUploadSuccess = (fileName: string) => {
      setFileState({ status: FileStatus.Uploaded, name: fileName, annotations: 0, timestamp: Date.now() })
   }

   return (
      <AppStateContext.Provider
         value={{
            fileState,
            incrementAnnotations,
            setFileUploadSuccess,
            setFileUploadFailure,
         }}
      >
         {children}
      </AppStateContext.Provider>
   )
}
