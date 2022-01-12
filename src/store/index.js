import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
  plugins:[createPersistedState()],
  state: {
    logined: false,
    user: {
      id: "",
      username: "",
      group: "",
      role: ""
    },
    ALLOWED_ROLE: ["leader","member"],
    config: {
      language: "en",
      theme: ""
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});
