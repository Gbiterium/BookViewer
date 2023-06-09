<template>
  <div class="">
    <div class="feature-book">
      <VueSlickCarousel
        :arrows="true"
        :dots="true"
        :slidesToShow="2"
        :slidesToScroll="2"
        :responsive="[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]"
      >
        <!-- <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div> -->
        <div class="pr-md-3 pointer" @click.prevent="filterByFiction"><img src="@/assets/img/category1.png" /></div>
        <div class="pointer" @click.prevent="filterByHistorical"><img src="@/assets/img/category2.png" /></div>
      </VueSlickCarousel>
      <!-- <div class="col-lg-6">
      </div>
      <div class="col-lg-6">
      </div> -->
    </div>
    <div v-if="loading">
      <div class="grid-container mt-5">
        <div v-for="n in 5" :key="n" class="">
          <div class="mt-3">
            <b-skeleton width="170px" height="240px" />
          </div>
          <div class="mt-5">
            <b-skeleton width="170px" height="240px" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="i in categories" :key="i.id" class="my-5">
        <div class="d-flex justify-content-between align-items-center">
          <div class="fs-24 font-weight-600 text-capitalize">{{ i }}</div>
          <div
            v-if="groupedData[i].length > 4"
            class="fs-14 pointer"
            @click.prevent="seeAll(i)"
          >
            <span>See More </span>
            <b-icon-chevron-right />
          </div>
        </div>
        <div class="grid-container mt-3">
          <div
            v-for="el in groupedData[i].slice(0, 5)"
            :key="el.id"
            class="pointer"
          >
            <div @click.prevent="handleClick(el)">
              <div class="img-container">
                <img :src="`${$config.BASE_URL}${el.book_cover}`" />
              </div>
              <div class="mt-2">
                <div v-if="isMobile" class="text-capitalize">{{ truncate(el.name, 23) }}</div>
                <div v-else class="text-capitalize">{{ truncate(el.name, 65) }}</div>
                <div class="text-grey text-capitalize book-details d-none d-md-block">
                  {{ el.author }}
                </div>
                <div class="text-grey text-capitalize book-details d-none d-md-block">
                  {{ el.level.join(", ") }}
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
import Vue from "vue";
import { mapActions } from "vuex";
import _ from "lodash";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default Vue.extend({
  layout: "authWithoutTopbar",
  name: "IndexPage",
  components: { VueSlickCarousel },
  data() {
    return {
      label: ["fiction", "historical"],
      loading: false,
      books: [],
      isMobile: false,
    };
  },
  computed: {
    groupedData() {
      const groupedData = this.books.reduce((result, item) => {
        const categories = item.categories;
        categories.forEach((category) => {
          if (!result[category]) {
            result[category] = [];
          }
          result[category].push(item);
        });
        return result;
      }, {});
      return groupedData;
    },
    categories() {
      const categories = this.books.flatMap((el) => el.categories);
      const uniqCategories = _.uniq(categories);
      return uniqCategories;
    },
  },
  watch: {
    "$route.query": {
      async handler(val) {
        await this.getBookList(val);
      },
    },
  },
  async mounted() {
    const token = this.$cookies.get("reader-token");
    if (!token || this.$route.query.token) {
      await this.login();
    }
    await this.getBookList();
    this.isMobileDevice();
  },
  methods: {
    ...mapActions("reader", ["LOGIN_READER"]),
    async login() {
      try {
        const token = this.$cookies.get("slate-token");
        const response = await this.LOGIN_READER({
          slate_token: token,
          school: "560aeb58-f3af-464a-8dab-9192ce4228ca",
        });
      } catch (error) {
        console.log(error);
      }
    },
    filterByFiction() {
      this.$router.push({
        query: {category: 'fiction'}
      })
    },
    filterByHistorical() {
      this.$router.push({
        query: {category: 'historical'}
      })
    },
    isMobileDevice() {
      if (window.innerWidth <= 767) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    async getBookList(item) {
      try {
        this.loading = true;
        const { data } = await this.$axios.get("/app/list_books/", {
          params: {
            curriculum: this.$route.query.curriculum
              ? item.curriculum.map((el) => el)
              : "",
            date: this.$route.query.date ? item.date : "",
            name: this.$route.query.name ? item.name : "",
            subject: this.$route.query.subject ? item.subject : "",
            book_format: this.$route.query.format ? item.format : "",
            level: this.$route.query.level ? item.level : "",
            // category: this.$route.query.category ? item.category : "",
            ...(this.$route.query.category
              ? { categories: item.category }
              : {}),
            end_date: this.$route.query.end_date ? item.end_date : "",
            start_date: this.$route.query.start_date ? item.start_date : "",
          },
        });
        this.books = data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    handleClick(item) {
      this.$router.push(`/bookshelf/${item.id}`);
    },
    seeAll(item) {
      this.$router.push({
        path: "/library",
        query: {
          category: item,
        },
      });
    },
  },
});
</script>
<style scoped>
.feature-book img {
  width: 100%;
  height: 220px;
}
.img-container img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  /* object-position: top; */
}
.book-details {
  font-weight: 300;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem;
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .img-container img {
    height: 170px;
    width: 110px;
    /* object-position: top; */
  }
  .grid-container {
  gap: 1rem;
}
.feature-book img {
  height: 150px;
  margin-top: 20px
}
}
@media screen and (max-width: 767px) {
  .grid-container {
    overflow: auto;
    gap: 10px;
  }
  .feature-book img {
  height: 170px;
}
  .img-container img {
    height: 170px;
    width: 110px;
    /* object-position: top; */
  }
}
</style>
