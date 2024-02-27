import {create}  from "zustand";


type User = {
    id: number;
    name: string;
    login: string;
    is_admin: number;
    work_regime: number;

}
type UserStore = {
    user: User | null
    setUser: (user: User) => void
    isOpenNav : boolean
    setIsOpenNav: (isOpenNav: boolean) => void
    signOut: () => void
}

export const userStore = create<UserStore>((set) => {
    return {
       user:null,
       setUser: (user: User) => set({user}),
       signOut: () => set({user: null}),
       isOpenNav: true,
       setIsOpenNav: (isOpenNav: boolean) => set({isOpenNav}),
    }
});
