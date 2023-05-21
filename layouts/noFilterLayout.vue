<template>
  <div>
    <Transition name="slide-fade">
      <div class="site-nav">
        <Navbar />
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="container">
        <!-- <div class="conatiner"> -->
        <Nuxt />
        <!-- </div> -->
      </div>
    </Transition>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/noAuthNavbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="css" scoped>
.container {
  margin-top: 100px;
  margin-bottom: 50px;
}

.site-nav.offline {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  width: 100%;
  z-index: 999;
}

.absolutebanner {
  position: fixed;
  top: 0rem;
  z-index: 1001;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

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