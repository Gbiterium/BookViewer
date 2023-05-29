<template>
  <div>
    <div class="card">
      <!-- @tab-selected="handleOnSelectTab($event)" -->
      <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
        <template v-for="(tab, index) in ['All', 'Reading', 'Favorite']">
          <UtilsCardTab :key="index" :title="tab">
            <div v-if="loading">
              <div class="row mt-3">
                <div v-for="n in 4" :key="n" class="col-md-6 col-lg-3">
                  <div class="mt-3">
                    <b-skeleton width="100%" height="109px" />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="show && !loading" class="card-body card-area">
              <div class="row mb-4">
                <div class="col-md-6 col-lg-3 small-card mb-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12">BOOKS</h5>
                      <span class="text-blue fs-30">{{
                        bookshelf.length
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 small-card mb-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12">FAVORITE</h5>
                      <span class="text-blue fs-30">{{ favorites.length }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 small-card mb-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12">TOTAL STUDY TIME</h5>
                      <span class="text-blue fs-30">300 hrs</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 small-card mb-3">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12 text-uppercase">Top Subject</h5>
                      <span class="text-blue fs-30">Mathematics</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="all" class="grid-container mt-3">
                <div v-for="el in bookshelf" :key="el.id" class="mb-3 pointer">
                  <div @click.prevent="handleClick(el)">
                    <div class="img-container">
                      <img :src="`${$config.BASE_URL}${el.book_cover}`" />
                    </div>
                    <div class="mt-1 fs-12">
                      <div v-if="isMobile" class="text-capitalize">{{ truncate(el.name, 23) }}</div>
                <div v-else class="text-capitalize">{{ truncate(el.name, 65) }}</div>
                      <div class="text-grey book-details d-none d-md-block">{{ el.author }}</div>
                      <div class="text-grey book-details d-none d-md-block">
                        {{ el.level.join(", ") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="grid-container mt-3">
                <div v-for="el in favorites" :key="el.id" class="mb-3 pointer">
                  <div @click.prevent="handleClick(el)">
                    <div class="img-container">
                      <img :src="`${$config.BASE_URL}${el.book_cover}`" />
                    </div>
                    <div class="mt-1 fs-12">
                      <div v-if="isMobile" class="text-capitalize">{{ truncate(el.name, 23) }}</div>
                <div v-else class="text-capitalize">{{ truncate(el.name, 65) }}</div>
                      <div class="text-grey book-details d-none d-md-block">{{ el.author }}</div>
                      <div class="text-grey book-details d-none d-md-block">
                        {{ el.level.join(", ") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!show && !loading"
              class="card-body card-area px-xl-5 d-flex justify-content-center align-items-center"
            >
              <div>
                <div class="d-flex justify-content-center align-items-center">
                  <img src="@/assets/img/noContent.png" alt="" />
                </div>
                <div
                  class="d-flex justify-content-center align-items-center fs-14 text-grey mt-2 mb-4"
                >
                  <span>No book added to bookshelf yet</span>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                  <button class="btn btn-primary px-3 py-2">
                    Browse Libary
                  </button>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </UtilsCardTab>
        </template>
      </UtilsBaseCardTab>
    </div>
  </div>
</template>

<script>
export default {
  layout: "authWithoutTopbar",
  data() {
    return {
      bookshelf: [],
      loading: false,
      show: true,
      favorites: [],
      all: false,
      isMobile: false
    };
  },
  watch: {
    "$route.query": {
      async handler(val) {
        await this.getBooks(val);
      },
    },
  },
  async mounted() {
    await this.getBooks();
    await this.getFavorites()
    await this.isMobileDevice()
  },
  methods: {
    handleClick(item) {
      this.$router.push(`/bookshelf/${item.id}`);
    },
    async getBooks(item) {
      try {
        this.loading = true;
        const { data } = await this.$axios.get("/app/myshelf", {
          params: {
            curriculum: this.$route.query.curriculum
              ? item.curriculum.map((el) => el)
              : "",
            date: this.$route.query.date ? item.date : "",
            name: this.$route.query.name ? item.name : "",
            subject: this.$route.query.subject ? item.subject : "",
            format: this.$route.query.format ? item.format : "",
            level: this.$route.query.level ? item.level : "",
            // category: this.$route.query.category ? item.category : "",
            ...(this.$route.query.category
              ? { categories: item.category }
              : {}),
          },
        });
        this.bookshelf = data.data;
        if (this.bookshelf.length > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    isMobileDevice() {
      if (window.innerWidth <= 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    async getFavorites() {
      try{
        const { data } = await this.$axios.get('/app/my_favorites/')
        this.favorites = data.data
      } catch (error) {
        console.log(error)
      }
    },
    async handleOnSelectTab(e) {
      if (e === "All") {
        // await this.getBooks();
        this.all = true
      }
      // if (e === "Reading") {

      // }
      if (e === "Favorite") {
        // await this.getFavorites()
        this.all = false
      }
    },
  },
};
</script>

<style scoped>
.card-area {
  min-height: 500px;
}
.img-container img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.small-card .card {
  height: 109px;
  width: 100%;
  border: 0.4px solid #eaeaf1;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.small-card h5 {
  font-weight: 300;
}
.small-card span {
  font-weight: 250;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}
@media screen and (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .img-container img {
    height: 120px;
    width: 100%;
  }
}
</style>
