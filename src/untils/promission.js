const roleRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Categroy',
  }, {
    name: 'ProductEdit',
  }],
};

// vip所有的权限直接加路由即可   写页面加判断

//  过滤没有权限的路由
/**
 *
 * @param {*} role 角色
 * @param {*} routes 路由集合
 */
export default function getMenuRoutes(role, routes) {
  // 角色所对应允许的路由
  // console.log(role, routes);
  const allowRoutesName = roleRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = r;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });

  return resultRoutes;
}
