import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: "卡盒",
    },
    name: 'Cardbox',
    path: '/admin/cardbox',
    children: [
      {
        meta: {
          title: "卡盒系列上传",
        },
        name: 'CardboxUpload',
        path: '/admin/cardbox/upload',
        component: () => import('#/views/cardbox/upload/index.vue'),
      },
      {
        meta: {
          title: "卡盒系列列表",
        },
        name: 'CardboxGroupList',
        path: '/admin/cardbox/viewer',
        component: () => import('#/views/cardbox/viewer/index.vue'),
      },
    ],
  },
];

export default routes;
