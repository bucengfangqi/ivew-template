import Vue from "vue";
import "../theme/index.less";
import {
  Message,
  Button,
  Table,
  Switch,
  Row,
  Col,
  Card,
  Page,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Option,
} from "view-design";
Vue.prototype.$Message = Message;

Vue.component("Button", Button);
Vue.component("Table", Table);
Vue.component("i-switch", Switch);
Vue.component("Row", Row);
Vue.component("Col", Col);
Vue.component("Card", Card);
Vue.component("Page", Page);
Vue.component("Divider", Divider);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("Input", Input);
Vue.component("InputNumber", InputNumber);
Vue.component("DatePicker", DatePicker);
Vue.component("Select", Select);
Vue.component("Option", Option);
