import { createApp, ref } from 'vue';
import App from './index.vue';
import { pinia } from '../../store';
import router from '../../router';
import SvgIcon from "@/components/SvgIcon";
import Link from "@/components/Link.vue";
import { keepData } from '@/store/plugins/keepData';
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
pinia.use(keepData({
    idList: [
        'userStore',
        'configStore',
        'templateStore',
        'competitionStore'
    ]
}));
const app = createApp(App);
app.use(pinia).use(router).use(ref).mount('#app');
app.component("SvgIcon", SvgIcon);
app.component("Link", Link);

