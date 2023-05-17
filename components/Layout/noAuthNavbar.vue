<template>
  <div>
    <div v-show="isMobile"  class="modal-overlay"></div>
    <div class="cus">
      <div
        class="navbar px-3 px-lg-5 d-flex justify-content-between pr-5 pr-lg-0"
      >
        <div>
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
                :src="avatar"
              />
            </div>
            <div class="ml-2">
              <div class="account-name text-left">
                Nuella Udefi
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
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    openMobile() {
      this.isMobile = !this.isMobile
    },
    // goToPublisher() {
    //     this.$router.push({path: '/auth/login', query: {publisher: 'true'} })
    // }
  },
}
</script>

<style scoped>
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
