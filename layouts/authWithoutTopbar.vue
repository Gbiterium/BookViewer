<template>
  <div>
    <Transition name="slide-fade">
      <div v-if="$nuxt.isOffline" class="absolutebanner">
        <OfflineDefault />
      </div>
    </Transition>
    <div class="row">
    <Transition v-if="$nuxt.isOffline" name="slide-fade">
      <div class="site-nav offline col-md-2">
        <UtilsFilterComponent />
        <Navbar />
      </div>
    </Transition>

    <Transition v-else name="slide-fade">
      <div class="site-nav col-md-2">
        <Navbar />
        <UtilsFilterComponent />
      </div>
    </Transition>
    <Transition name="slide-fade">
    <div class="site-container col-md-10">
      <!-- <div class="conatiner"> -->
      <Nuxt />
      <!-- </div> -->
    </div>
    </Transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/noAuthNavbar.vue'
export default {
  components: {
    Navbar
  },
}
</script>


<style lang="css" scoped>
.site-nav.offline {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  z-index: 999;
}

.absolutebanner {
  position: fixed;
  top: 0rem;
  /* top: -100px; */
  z-index: 1001;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/* .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

.slide-fade-enter,
.slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.offlinewrapper {
  /* margin-top: 150px;
  height: 90vh; */
  /* margin-bottom: 150px; */
}
</style>

