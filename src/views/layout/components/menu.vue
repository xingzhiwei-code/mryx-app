<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1]
          ? $router.currentRoute.matched[1].name
          : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="item in $store.state.menuRoutes">
        <a-sub-menu v-if="!item.meta.hidden" :key="item.name">
          <span slot="title">
            <a-icon type="mail" />
            <span>{{ item.meta.title }}</span>
          </span>
          <template v-for="i in item.children">
            <a-menu-item v-if="!i.meta.hidden" :key="i.name">
              <router-link :to="{ name: i.name }"></router-link>
              {{ i.meta.title }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {};
</script>
