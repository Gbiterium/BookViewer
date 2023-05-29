<template>
  <div>
    <div v-show="isMobile"  class="modal-overlay" @click="hideCard()"></div>
    <div class="cus">
      <div
        class="navbar px-3 px-lg-5 d-flex justify-content-between pr-5 pr-lg-0"
      >
        <div class="ml-4 ml-md-0 pl-2 pl-md-0 pointer">
          <nuxt-link to="/">
            <img src="~/assets/img/logo-white.png" class="logo"
          /></nuxt-link>
        </div>
        <div class="d-flex align-items-center flex-wrap">
          <nav
            id="nav-bar-items"
            class="nav-items d-none d-lg-flex order-last order-lg-first"
          >
            <div class="nav-item">
              <nuxt-link to="/" class="px-4 nav-item-link"> Recommeded Books</nuxt-link>
            </div>
            <div class="nav-item">
              <nuxt-link to="/e-library" class="px-4 nav-item-link"> E-Library</nuxt-link>
            </div>
            <div class="nav-item">
              <nuxt-link to="/bookshelf" class="px-4 nav-item-link"> My Bookshelf</nuxt-link>
            </div>

            <!-- <div class="nav-item">
            <a href=""  class="px-4" @click.prevent="goToPublisher"> Go to Publisher</a>
          </div> -->
          </nav>
          <div
            class="
              user-account-options
              d-flex
              align-items-center
              ml-lg-4 ml-3
              pr-lg-0
            "
          >
            <div class>
              <img
                class="account-image"
                :src="user.avatar"
              />
            </div>
            <div class="ml-2">
              <div class="account-name text-left">
                {{ user.first_name }} {{ user.last_name }}
              </div>
              <div class="d-none d-md-block dropdown account-dropdown">
                <a
                  href="#"
                  class="dropdown-toggle smalltxt"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Accounts</a
                >
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div class="dropdown-item pointer" @click="$router.push('/profile')"
                    >My Profile</div
                  >
                  <b-btn class="bg-danger ml-2 btn mt-1" @click="logout()"
                    >Log out
                  </b-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-lg-none relativecontainer">
        <div
          class="pointer d-lg-none ml-3 fixedcontainer"
          @click="openMobile()"
        >
          <span class="pt-3 resizeicon">
            <span
              class="iconify"
              data-inline="false"
              data-icon="eva:menu-fill"
            ></span
          ></span>
        </div>
      </div>
      <div v-if="isMobile" class="d-lg-none d-block">
        <nav
          id="nav-bar-items"
          class="mt-5 nav-items d-flex flex-column order-last order-lg-first"
        >
          <div class="nav-item py-3 mx-4">
              <nuxt-link to="/" class="nav-item-link text-white dropdownsize"> Recommeded Books</nuxt-link>
            </div>
            <div class="nav-item py-3 mx-4">
              <nuxt-link to="/e-library" class="nav-item-link text-white dropdownsize"> E-Library</nuxt-link>
            </div>
            <div class="nav-item py-3 mx-4">
              <nuxt-link to="/bookshelf" class="nav-item-link text-white dropdownsize"> My Bookshelf</nuxt-link>
            </div>
        </nav>
      </div>
    </div>
    <div class="d-block d-md-none">
      <div
        v-show="fullScreenMenu"
        class="closemobile"
        @click="closemenu()"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isMobile: false,
      avatar: "https://slate-assets.s3.amazonaws.com/media/slate/profiles/Logo.png",
      user: {},
      fullScreenMenu: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  created () {
    if(this.$cookies.get('user-details')) {
      this.user = this.$cookies.get('user-details') 
    }
  },
  methods: {
    openMobile() {
      this.isMobile = !this.isMobile
    },
    closemenu() {
      this.fullScreenMenu = false
    },
    hideCard() {
      this.isMobile = !this.isMobile
    },
    openMobile() {
      this.isMobile = !this.isMobile
    },
    logout() {
      this.$store.dispatch('reader/logout')
      const url = 'https://slate-staging-bnt8w.ondigitalocean.app/auth/login?viewer=true'
      window.location.href = url
    }
    // goToPublisher() {
    //     this.$router.push({path: '/auth/login', query: {publisher: 'true'} })
    // }
  },
}
</script>

<style scoped>
html {
  overflow-x: hidden;
}
.svgsize {
  width: 30px;
  height: 30px;
}

.closemobile {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 996;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 1;
  background: RGBA(0, 0, 0, 0.23);
}

.dropdownsize {
  font-size: 12px;
}

.resizeicon {
  font-size: 25px;
  line-height: 0;
  color: #fff;
}

/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 0;
  background: none;
} */

/* .borderfulltop {
  border-top: 7px solid #171e40;
} */

.darkermob {
  background: #0b0f1f;
}

.mobilecontainer {
  position: fixed;
  top: 40px;
  right: 0px;
  z-index: 1050;

  /* display: none; */
  width: 60%;
  height: 150vh;
  background: #f6f7ff;
  /* background: #171e40; */
  color: #fff;
  overflow: hidden;
  outline: 0;
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  -webkit-transform: translate(0, -50px);
  transform: translate(0, -50px);
}

.innermobcontainer {
  color: #171e40;
}

.mobilecontainer {
  width: 60%;
}

.mobilecontainer .mobilemenu {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding: 20px;
  margin: 0px;
  transition: 0.3s ease;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* overflow-x: hidden; */
  width: 100%;
  z-index: 1001;
}
.site-nav .navbar {
  background: #171e40;
  height: var(--navbar-height);
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  z-index: 999;
}

@media screen and (max-width: 991px) {
  .navbar {
    height: auto;
  }

  .logo {
    height: 26px;
  }
  .relativecontainer {
    position: relative;
  }
  .fixedcontainer {
    position: fixed;
    top: 15px;
    left: 0px;
    z-index: 1000;
  }

  .lightborder-bottom {
    border-bottom: 0.2px solid rgb(155, 155, 155);
  }

  .submenu {
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.09));
    background-color: #1a234b;
    border-radius: 0;
  }
  .cus {
    background-color: #161e40;
    /* padding-top: 10rem; */
    z-index: 1000;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  nav {
    position: absolute;
    z-index: 1001;
    background: #171e40;
    width: 100vw;
  }
}
@media screen and (max-width: 698px) {
  .logo {
    height: 20px;
  }

  .svgsize {
    width: 25px;
    height: 25px;
  }
  nav {
    position: absolute;
    z-index: 1001;
    background: #171e40;
    width: 100%;
  }
}
@media screen and (max-width: 408px) {
  .site-nav .navbar {
    flex-wrap: nowrap;
  }
  .account-name {
    font-size: 10px;
  }

  .logo {
    height: 15px;
  }
  .smalltxt,
  .dropdown-item {
    font-size: 10px;
  }
}
@media screen and (max-width: 575px) {
  .fixedcontainer {
    position: fixed;
    top: 10px;
  }
}

.dropdown-item {
  padding: 0.25rem 0.75rem;
  border-bottom: 0.5px solid #e7e8eb;
}
.dropdown-toggle {
  color: white;
}
.no-arrow {
  text-decoration: none;
}
.no-arrow::after {
  display: none;
}
.dropdown-menu {
  max-height: 600px;
  overflow: auto;
}
.very_visible {
  z-index: 1000;
}
</style>
.site-nav .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #171e40;
  height: var(--navbar-height);
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  z-index: 999;
}
@media screen and (max-width: 767px) {
  .logo{
    height: 15px;
  }
}
@media screen and (max-width: 991px) {
  .navbar {
    display: block;
  }

  .relativecontainer {
    position: relative;
  }
  .absolutecontainer {
    position: absolute;
    top: -40px;
    right: 10px;
  }

  .lightborder-bottom {
    border-bottom: 0.2px solid rgb(155, 155, 155);
  }

  .submenu {
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.09));
    background-color: #1a234b;
    border-radius: 0;
  }
}

.dropdown-item {
  padding: 0.25rem 0.75rem;
  border-bottom: 0.5px solid #e7e8eb;
}
.dropdown-toggle {
  color: white;
}
.no-arrow {
  text-decoration: none;
}
.no-arrow::after {
  display: none;
}
.dropdown-menu {
  overflow: auto;
}
.cus {
  background-color: #161e40;
}
a {
  color: white;
}
</style>
