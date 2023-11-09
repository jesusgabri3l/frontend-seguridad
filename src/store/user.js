import { create } from 'zustand';

const userStore = create(((set) => ({
user: {
    iat: null,
    id: null,
    lastName: null,
    name: null,
    username: null,
},
setUser: (body) => set(() => ({user: body})),
logoutUser: () => set({ user: {id: null, name: null, username: null, token: null}}),
})));

export { userStore }