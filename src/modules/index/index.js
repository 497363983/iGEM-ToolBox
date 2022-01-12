import { createApp, ref } from 'vue'
import App from './Index.vue'
import router from '../../router'
import store from '../../store'
import SvgIcon from "@/components/SvgIcon";
import ControlBar from "@/components/ControlBar";
const app = createApp(App);
app.component("SvgIcon",SvgIcon);
app.component("ControlBar",ControlBar);
app.use(store).use(router).use(ref).mount('#app');