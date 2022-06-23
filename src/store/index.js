import {
  createStore
} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    logined: false,
    user: {
      id: "",
      username: "qww",
      group: "",
      role: "",
      description: ""
    },
    version: "0.0.1",
    ALLOWED_ROLE: ["leader", "member"],
    config: [{
        type: "heading",
        headingValue: "User"
      }, {
        type: "datePicker",
        value: "2022",
        prop: {
          type: "year"
        },
        itemWrapProp: {
          label: "Year"
        }
      },
      {

        type: "input",
        value: "",
        prop: {
          type: "text"
        },
        itemWrapProp: {
          label: "Username"
        }
      },
      {
        value: "",
        type: "select",
        itemWrapProp: {
          label: "Group"
        },
        options: [{
          value: "Wet",
          label: "Wet group"
        }, {
          value: "Dry",
          label: "Dry group"
        }, {
          value: "HP",
          label: "HP group"
        }]
      },
      {
        value: "",
        type: "select",
        itemWrapProp: {
          label: "Role"
        },
        options: [{
          value: "member",
          label: "Member"
        }, {
          value: "leader",
          label: "Leader"
        }]
      },
      {
        value: "",
        type: "input",
        prop: {
          type: "textarea"
        },
        itemWrapProp: {
          label: "Descripion"
        }
      },
      {
        type: "divider"
      },
      {
        type: "heading",
        headingValue: "Commmon"
      },
      {
        value: "en",
        type: "select",
        itemWrapProp: {
          label: "Language"
        },
        options: [{
          value: "en",
          label: "English"
        }, {
          value: "zh",
          label: "中文简体"
        }]
      }, {
        value: "light",
        type: "select",
        itemWrapProp: {
          label: "Theme"
        },
        options: [{
          value: "light",
          label: "Light"
        }, {
          value: "dark",
          label: "Dark"
        }]
      },
      {
        type: "divider"
      },
      {
        type: "heading",
        headingValue: "Update"
      },
      {
        type: "switch",
        value: true,
        itemWrapProp: {
          label: "AutoUpdate"
        }
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});