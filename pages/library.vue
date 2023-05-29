<template>
  <div>
          <div class="fs-24 font-weight-600 text-capitalize border-bottom pb-3">{{ $route.query.category || $route.query.subject }}</div>
          <div v-if="loading">
      <div class="row mt-3">
        <div v-for="n in 6" :key="n" class="col-lg-2">
          <div class="mt-3">
            <b-skeleton width="100%" height="160px" />
          </div>
          <div class="mt-4">
            <b-skeleton width="100%" height="160px" />
          </div>
        </div>
      </div>
    </div>
          <div v-else class="grid-container mt-5">
          <div
            v-for="el in books"
            :key="el.id"
            class="mb-3 pointer"
          >
            <div @click.prevent="handleClick(el)">
              <div class="img-container">
                <img :src="`${$config.BASE_URL}${el.book_cover}`" />
              </div>
              <div class="mt-1 fs-12">
                <div v-if="isMobile" class="text-capitalize">{{ truncate(el.name, 23) }}</div>
                <div v-else class="text-capitalize">{{ truncate(el.name, 65) }}</div>
                <div class="text-grey text-capitalize book-details d-none d-md-block">{{ el.author }}</div>
                <div class="text-grey text-capitalize book-details d-none d-md-block">
                  {{ el.level.join(", ") }}
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    layout: "authWithoutTopbar",
    data () {
        return {
            books: [],
            loading: false,
            isMobile: false,
        }
    },
    watch: {
    "$route.query": {
      async handler(val) {
        await this.getBook(val);
      },
    },
  },
  async created () {
    await this.getBook()
    await this.isMobileDevice()
  },
  methods: {
        async getBook(item) {
      try {
        this.loading = true;
        const { data } = await this.$axios.get("/app/list_books/", {
          params: {
            curriculum: this.$route.query.curriculum ? item.curriculum.map((el) => el) : "",
            date: this.$route.query.date ? item.date : "",
            name: this.$route.query.name ? item.name : "",
            subject: this.$route.query.subject ? this.$route.query.subject || item.subject : "",
            book_format: this.$route.query.format ? item.format : "",
            level: this.$route.query.level ? item.level : "",
            // category: this.$route.query.category ? this.$route.query.category || item.category : "",
            ...(this.$route.query.category ? { categories: this.$route.query.category || item.category } : {}),
          },
        });
        this.books = data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    handleClick(item) {
      this.$router.push(`/bookshelf/${item.id}`);
    },
    isMobileDevice() {
      if (window.innerWidth <= 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source
    },
}
}
</script>

<style scoped>
.img-container img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  /* aspect-ratio: 120/160; */
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}
@media screen and (max-width: 767px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .img-container img {
    height: 140px;
    width: 100%;
  }
}
</style>