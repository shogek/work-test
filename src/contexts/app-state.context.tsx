import { createContext, PropsWithChildren, useState } from 'react'
import { FileUploadState } from '../types'

type AppState = {
   fileUploadState: FileUploadState
   setFileUploadState: (state: FileUploadState) => void
}

export const AppStateContext = createContext<AppState | null>(null)

type AppStateContextProviderProps = PropsWithChildren

export function AppStateContextProvider({ children }: AppStateContextProviderProps) {
   const [fileUploadState, setFileUploadState] = useState<FileUploadState>({ hasError: false })

   return (
      <AppStateContext.Provider value={{ fileUploadState, setFileUploadState }}>{children}</AppStateContext.Provider>
   )
}
