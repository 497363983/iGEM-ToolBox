import { createApp, ref } from 'vue'
import App from './index.vue'
import router from '../../router'
import store from '../../store'
import SvgIcon from "@/components/SvgIcon";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import ControlBar from "@/components/ControlBar";
// import TopBar from '@/components/TopBar'
const app = createApp(App);
app.component("SvgIcon",SvgIcon);
// app.component("ControlBar",ControlBar);
// app.component("TopBar",TopBar);
app.use(store).use(router).use(ref).mount('#app');