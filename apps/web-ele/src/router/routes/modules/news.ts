import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: -1,
      title: "新闻",
    },
    name: 'News',
    path: '/admin/news',
    children: [
      {
        meta: {
          affixTab: true,
          title: "新闻编列表",
        },
        name: 'NewsViewer',
        path: '/admin/news/viewer',
        component: () => import('#/views/news/viewer/index.vue'),
      },
      {
        meta: {
          title: "新闻编辑器",
        },
        name: 'NewsEditor',
        path: '/admin/news/editor',
        component: () => import('#/views/news/editor/index.vue'),
      },
    ],
  },
];

export default routes;
