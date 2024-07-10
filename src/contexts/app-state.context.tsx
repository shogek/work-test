import { createContext, PropsWithChildren, useState } from 'react'
import { FileUploadState, FileUploadStatus } from '../types'

type AppState = {
   fileUploadState: FileUploadState
   setFileUploadState: (state: FileUploadState) => void
}

export const AppStateContext = createContext<AppState | null>(null)

type AppStateContextProviderProps = PropsWithChildren

export function AppStateContextProvider({ children }: AppStateContextProviderProps) {
   const [fileUploadState, setFileUploadState] = useState<FileUploadState>({ status: FileUploadStatus.NoFile })

   return (
      <AppStateContext.Provider value={{ fileUploadState, setFileUploadState }}>{children}</AppStateContext.Provider>
   )
}
