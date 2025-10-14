import { createRouter, createWebHistory } from 'vue-router';
import Kaishiyemian from '../pages/kaishiyemian/kaishiyemian.vue';
import Yonghuduangerenzhuye from '../pages/yonghuduangerenzhuye/yonghuduangerenzhuye.vue';
import Yonghuduanjiankangdangan from '../pages/yonghuduanjiankangdangan/yonghuduanjiankangdangan.vue';
import Yonghuduanyuyuecanzeyishijiemian from '../pages/yonghuduanyuyuecanzeyishijiemian/yonghuduanyuyuecanzeyishijiemian.vue';
import Yonghuduanyuyuecnzeyiyuanjiemian from '../pages/yonghuduanyuyuecnzeyiyuanjiemian/yonghuduanyuyuecnzeyiyuanjiemian.vue';
import Yonghuduanyuyuechaosheng_shouye from '../pages/yonghuduanyuyuechaosheng_shouye/yonghuduanyuyuechaosheng_shouye.vue';
import Yishiduangerenzhuye from '../pages/yishiduangerenzhuye/yishiduangerenzhuye.vue';
import Yishiduangongxiaxuanzehoujiemian from '../pages/yishiduangongxiaxuanzehoujiemian/yishiduangongxiaxuanzehoujiemian.vue';
import Yishiduangongxiaku_chushijiemian from '../pages/yishiduangongxiaku_chushijiemian/yishiduangongxiaku_chushijiemian.vue';
import Yishiduan_jianchabaogaodan from '../pages/yishiduan_jianchabaogaodan/yishiduan_jianchabaogaodan.vue';
import Yishiduanzhinengnxi_fenxijiemian from '../pages/yishiduanzhinengnxi_fenxijiemian/yishiduanzhinengnxi_fenxijiemian.vue';
import Yishiduanzhinengxi_chushijiemian from '../pages/yishiduanzhinengxi_chushijiemian/yishiduanzhinengxi_chushijiemian.vue';
import Yishiduanyingxiagguanli_youshuju from '../pages/yishiduanyingxiagguanli_youshuju/yishiduanyingxiagguanli_youshuju.vue';
import Yishiduanyingxiangguanli_wushuju from '../pages/yishiduanyingxiangguanli_wushuju/yishiduanyingxiangguanli_wushuju.vue';
import Denglujiemianweiuxuandedanchuang from '../pages/denglujiemianweiuxuandedanchuang/denglujiemianweiuxuandedanchuang.vue';
import Yonghuduandengluyemian from '../pages/yonghuduandengluyemian/yonghuduandengluyemian.vue';
import Yishiduandengluyemian from '../pages/yishiduandengluyemian/yishiduandengluyemian.vue';
import Yishiduanzhuce from '../pages/yishiduanzhuce/yishiduanzhuce.vue';
import Yonghuduanzhuce from '../pages/yonghuduanzhuce/yonghuduanzhuce.vue';
import Lejiewomen from '../pages/lejiewomen/lejiewomen.vue';

const routes = [
  {
    path: '/',
    name: 'kaishiyemian',
    component: Kaishiyemian,
  },
  {
    path: '/yonghuduangerenzhuye',
    name: 'yonghuduangerenzhuye',
    component: Yonghuduangerenzhuye,
  },
  {
    path: '/yonghuduanjiankangdangan',
    name: 'yonghuduanjiankangdangan',
    component: Yonghuduanjiankangdangan,
  },
  {
    path: '/yonghuduanyuyuecanzeyishijiemian',
    name: 'yonghuduanyuyuecanzeyishijiemian',
    component: Yonghuduanyuyuecanzeyishijiemian,
  },
  {
    path: '/yonghuduanyuyuecnzeyiyuanjiemian',
    name: 'yonghuduanyuyuecnzeyiyuanjiemian',
    component: Yonghuduanyuyuecnzeyiyuanjiemian,
  },
  {
    path: '/yonghuduanyuyuechaosheng_shouye',
    name: 'yonghuduanyuyuechaosheng_shouye',
    component: Yonghuduanyuyuechaosheng_shouye,
  },
  {
    path: '/yishiduangerenzhuye',
    name: 'yishiduangerenzhuye',
    component: Yishiduangerenzhuye,
  },
  {
    path: '/yishiduangongxiaxuanzehoujiemian',
    name: 'yishiduangongxiaxuanzehoujiemian',
    component: Yishiduangongxiaxuanzehoujiemian,
  },
  {
    path: '/yishiduangongxiaku_chushijiemian',
    name: 'yishiduangongxiaku_chushijiemian',
    component: Yishiduangongxiaku_chushijiemian,
  },
  {
    path: '/yishiduan_jianchabaogaodan',
    name: 'yishiduan_jianchabaogaodan',
    component: Yishiduan_jianchabaogaodan,
  },
  {
    path: '/yishiduanzhinengnxi_fenxijiemian',
    name: 'yishiduanzhinengnxi_fenxijiemian',
    component: Yishiduanzhinengnxi_fenxijiemian,
  },
  {
    path: '/yishiduanzhinengxi_chushijiemian',
    name: 'yishiduanzhinengxi_chushijiemian',
    component: Yishiduanzhinengxi_chushijiemian,
  },
  {
    path: '/yishiduanyingxiagguanli_youshuju',
    name: 'yishiduanyingxiagguanli_youshuju',
    component: Yishiduanyingxiagguanli_youshuju,
  },
  {
    path: '/yishiduanyingxiangguanli_wushuju',
    name: 'yishiduanyingxiangguanli_wushuju',
    component: Yishiduanyingxiangguanli_wushuju,
  },
  {
    path: '/denglujiemianweiuxuandedanchuang',
    name: 'denglujiemianweiuxuandedanchuang',
    component: Denglujiemianweiuxuandedanchuang,
  },
  {
    path: '/yonghuduandengluyemian',
    name: 'yonghuduandengluyemian',
    component: Yonghuduandengluyemian,
  },
  {
    path: '/yishiduandengluyemian',
    name: 'yishiduandengluyemian',
    component: Yishiduandengluyemian,
  },
  {
    path: '/yishiduanzhuce',
    name: 'yishiduanzhuce',
    component: Yishiduanzhuce,
  },
  {
    path: '/yonghuduanzhuce',
    name: 'yonghuduanzhuce',
    component: Yonghuduanzhuce,
  },
  {
    path: '/lejiewomen',
    name: 'lejiewomen',
    component: Lejiewomen,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;