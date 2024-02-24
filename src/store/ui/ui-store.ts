import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean
    toggleSideMenu: () => void
    openSideMenu: () => void
    closeSideMenu: () => void
}


export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  toggleSideMenu: () => set( ( state ) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false })
}))