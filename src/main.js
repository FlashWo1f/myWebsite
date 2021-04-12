import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import '@/style/global.less'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(router)
app.config.productionTip = false;
app.use(Antd)

app.mount('#app')
