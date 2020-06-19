import Vue from 'vue'
import { Pagination, MessageBox, Message } from 'element-ui';

Vue.component(Pagination.name, Pagination)
// Vue.use(Pagination)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;