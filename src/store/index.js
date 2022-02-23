import {createStore} from 'vuex'

const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    isLoading: false,
    isFrameLoading: false,
    isSignedIn: false,
}

const store = createStore({
        state: state,
        mutations: {
            SIGNIN(state) {
                state.isSignedIn = true;
            },
            LOGOUT(state) {
                state.isSignedIn = false;
            },
            FINISHED(state) {
                state.isLoading = false;
            },
            LOAD(state) {
                state.isLoading = true;
            },
            FINISHED_FRAME(state) {
                state.isFrameLoading = false;
            },
            LOAD_FRAME(state) {
                state.isFrameLoading = true;
            },
        },
        actions: {
            SignIn({commit}, state) {
                commit("SIGNIN", state);
            },
            LogOut({commit}, state) {
                commit("LOGOUT", state);
            },
            Finished({commit}, state) {
                commit("FINISHED", state);
            },
            Load({commit}, state) {
                commit("LOAD", state);
            },
            Finished_frame({commit}, state) {
                commit("FINISHED_FRAME", state);
            },
            Load_frame({commit}, state) {
                commit("LOAD_FRAME", state);
            }
        }
    },
);
export default store;