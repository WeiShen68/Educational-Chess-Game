<template>
  <router-view />
  <Notivue v-slot="item">
    <NotivueSwipe :item="item">
      <Notification :item="item" />
    </NotivueSwipe>
  </Notivue>
  <vtoast ref="vtoast" />
</template>

<script>
import vtoast from '@/components/vtoast'
import { Notivue, Notification, NotivueSwipe } from 'notivue'
export default {
  name: 'App',
  // metaInfo: {
  //   title: '&PAY | ADMIN | ',
  //   // titleTemplate: '%s | Material Dashboard Free',
  //   htmlAttrs: { lang: 'en' },
  //   meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  // },

  components: {
    vtoast,
    Notivue,
    Notification,
    NotivueSwipe,
  },

  mounted() {
    this.$root.vtoast = this.$refs.vtoast
  },
};
</script>

<style>

:root {
  /* Your variables */
  --header-height: 280px;
  --container-padding: 30px;
  --container-width: 1280px;

  /* Set the maximum width of the stream */
  --nv-root-width: var(--container-width);

  /* Add the top padding and place it below the header */
  --nv-root-top: calc(var(--header-height) + var(--container-padding));

  /* Add the same left-right paddings of your app container */
  --nv-root-left: var(--container-padding);
  --nv-root-right: var(--container-padding);
  --nv-width: 850px;
}

@media (max-width: 768px) {
  :root {
    --nv-root-x-align: center;
  }
}
</style>
