import { create } from 'zustand';

const userStore = create(((set) => ({
user: {
    iat: null,
    id: null,
    lastName: null,
    name: null,
    username: null,
},
count: 0,
setUser: (body) => set(() => ({user: body})),
logoutUser: () => set({ user: {id: null, name: null, username: null, token: null}}),
increment : () => set((state) => ({count : state.count + 1}))
})));
window.store = userStore;
export { userStore }