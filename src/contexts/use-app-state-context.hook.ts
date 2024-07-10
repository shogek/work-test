import { useContext } from 'react'
import { AppStateContext } from './app-state.context'

export function useAppStateContext() {
   const context = useContext(AppStateContext)

   if (!context) {
      throw Error('useAppStateContext hook must be called within AppStateContext!')
   }

   return context
}
