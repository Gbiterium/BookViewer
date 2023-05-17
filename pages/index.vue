<template>
  <div class="">
    <div class="row feature-book">
      <div class="col-lg-6">
        <img src="@/assets/img/category1.png" />
      </div>
      <div class="col-lg-6">
        <img src="@/assets/img/category2.png" />
      </div>
    </div>
    <div v-if="loading">
          <div class="grid-container mt-5">
            <div v-for="n in 5" :key="n" class="">
              <div class="mt-3">
                <b-skeleton width="172px" height="270px" />
              </div>
              <div class="mt-5">
                <b-skeleton width="172px" height="270px" />
              </div>
            </div>
          </div>
        </div>
    <div v-else>
      <div v-for="i in categories" :key="i.id" class="my-5">
        <div class="d-flex justify-content-between align-items-center">
          <div class="fs-24 font-weight-600 text-capitalize">{{ i }}</div>
          <div class="fs-14 pointer" @click.prevent="seeAll(i)">
            <span>See More </span>
            <b-icon-chevron-right />
          </div>
        </div>
        <div class="grid-container mt-3">
          <div v-for="el in groupedData[i]" :key="el.id" class="pointer">
            <div @click.prevent="handleClick(el)">
              <div class="img-container">
                <img :src="'data:image/png;base64,' + el.book_cover" />
              </div>
              <div class="mt-2">
                <div>{{ el.name }}</div>
                <div class="text-grey book-details">{{ el.author }}</div>
                <div class="text-grey book-details">
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
import _ from 'lodash'
export default Vue.extend({
  layout: "authWithoutTopbar",
  name: "IndexPage",
  data() {
    return {
      label: ["fiction", "historical"],
      loading: false,
      books: []
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
      console.log(Object.keys(groupedData));
      return groupedData;
    },
    categories() {
      const categories = this.books.flatMap((el) => el.categories)
      const uniqCategories = _.uniq(categories)
      return uniqCategories
    }
  },
  watch: {
    "$route.query": {
      async handler(val) {
        await this.getBookList(val);
      },
    },
  },
  async created() {
    const token = this.$cookies.get("reader-token");
    if (!token) {
      await this.login();
    }
    await this.getBookList();
  },
  methods: {
    ...mapActions("reader", ["LOGIN_READER"]),
    async login() {
      const response = await this.LOGIN_READER({
        slate_token: "BWYo17CFELHMrguIQ3LTWxaz13Rj63VYebJHjkwD",
        school: "560aeb58-f3af-464a-8dab-9192ce4228ca",
      });
    },
    async getBookList(item) {
      try {
        this.loading = true;
        const { data } = await this.$axios.get("/app/list_books/", {
          params: {
            curriculum: this.$route.query.curriculum ? item.curriculum.map((el) => el) : "",
            date: this.$route.query.date ? item.date : "",
            name: this.$route.query.name ? item.name : "",
            subject: this.$route.query.subject ? item.subject : "",
            book_format: this.$route.query.format ? item.format : "",
            level: this.$route.query.level ? item.level : "",
            category: this.$route.query.category ? item.category : "",
            end_date: this.$route.query.end_date ? item.end_date :  "",
            start_date: this.$route.query.start_date ? item.start_date :  ""
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
    seeAll(item) {
      this.$router.push({path: '/library', query: {
        category: item
      }})
    }
  },
});
</script>
<style scoped>
.feature-book img {
  width: 100%;
  height: 220px;
}
.img-container img {
  width: 170px;
  height: 240px;
  object-fit: cover;
  /* object-position: top; */
}
.book-details {
  font-weight: 300;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
}
</style>
