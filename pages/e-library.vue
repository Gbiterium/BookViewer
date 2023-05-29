<template>
  <div>
    <div>
      <h4 class="fs-24 font-weight-600">Browse by Grades</h4>
      <div class="grades">
        <VueSlickCarousel
        :arrows="true"
        :dots="true"
        :slidesToShow="5"
        :slidesToScroll="5"
        :infinite="true"
        :responsive="[
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]"
      >
        <div
          class="grade-container pointer pr-3"
          v-for="el in level"
          :key="el.id"
        >
          <div @click.prevent="filterByGrade(el)">
            <img src="@/assets/img/level1.png" />
            <div class="d-flex justify-content-center">
              <span class="grade-abs text-white">{{ el }}</span>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
        <!-- <div class="grade-container pointer col-lg-2">
            <img src="@/assets/img/level2.png">
            <div class="d-flex justify-content-center">
            <span class="grade-abs text-white">JSS II</span>
            </div>
          </div>
          <div class="grade-container pointer col-lg-2">
            <img src="@/assets/img/level3.png">
            <div class="d-flex justify-content-center">
            <span class="grade-abs text-white">JSS III</span>
            </div>
          </div>
          <div class="grade-container pointer col-lg-2">
            <img src="@/assets/img/level4.png">
            <div class="d-flex justify-content-center">
            <span class="grade-abs text-white">SSS I</span>
            </div>
          </div>
          <div class="grade-container pointer col-lg-2">
          
            <img src="@/assets/img/level5.png">
            <div class="d-flex justify-content-center">
            <span class="grade-abs text-white">SSS II</span>
            </div>
            
          </div>
          <div class="grade-container pointer col-lg-2">
          
            <img src="@/assets/img/level6.png">
            <div class="d-flex justify-content-center">
            <span class="grade-abs text-white">SSS III</span>
            </div>
            
          </div> -->
      </div>
    </div>
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
    <div v-else>
      <div v-for="i in subjects" :key="i.id" class="my-5">
        <div class="d-flex justify-content-between align-items-center">
          <div class="fs-24 font-weight-600 text-capitalize">{{ i }}</div>
          <div v-if="groupedData[i].length > 7" class="fs-14 pointer" @click.prevent="seeAll(i)">
            <span>See All </span>
            <b-icon-chevron-right />
          </div>
        </div>
        <div class="grid-container mt-3">
          <div
            v-for="el in groupedData[i].slice(0, 8)"
            :key="el.id"
            class=" pointer"
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  layout: "authWithoutTopbar",
  components: { VueSlickCarousel },
  data() {
    return {
      // subjects: ['Economics', 'Geography', 'Science'],
      loading: false,
      level: ["Primary 1", "Primary 2"],
      books: [],
      isMobile: false,
    };
  },
  computed: {
    // ...mapGetters('reader', ['books']),
    groupedData() {
      const groupedData = this.books.reduce((result, item) => {
        const categories = item.subject.map((el) => el.name);
        //   this.subjects = categories
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
    subjects() {
      const subjects = this.books.flatMap((el) => el.subject);
      const subjectName = subjects.map((el) => el.name);
      const uniqSubjects = _.uniq(subjectName);
      return uniqSubjects;
    },
    // level() {
    //   const levels = this.books.flatMap((el) => el.level)
    //   const levelName = levels.map((el) => el)
    //   const uniqLevel = _.uniq(levelName)
    //   return uniqLevel
    // }
  },
  watch: {
    "$route.query": {
      async handler(val) {
        await this.getBookList(val);
      },
    },
  },
  async mounted() {
    await this.getBookList();
    await this.isMobileDevice()
  },
  methods: {
    ...mapActions("reader", ["GET_BOOKS"]),
    handleClick(item) {
      console.log(item, "element");
      this.$router.push(`/bookshelf/${item.id}`);
    },
    async filterByGrade(item) {
      this.$router.push({query: {level: item}})
      // this.loading = true;
      // const { data } = await this.$axios.get('/app/list_books/', { params: {
      //   level: item,
      // }
      // });
      // this.books = data.data;
      // this.loading = false;
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
    async getBookList(item) {
      try {
        this.loading = true;
        const { data } = await this.$axios.get("/app/list_books/", {
          params: {
            curriculum: this.$route.query.curriculum ? item.curriculum.map((el) => el) : "",
            date: this.$route.query.date ? item.date : "",
            name: this.$route.query.name ? item.name : "",
            subject: this.$route.query.subject ? item.subject : "",
            format: this.$route.query.format ? item.format : "",
            level: this.$route.query.level ? item.level : "",
            // category: this.$route.query.category ? item.category : "",
            ...(this.$route.query.category ? { categories: item.category } : {}),
          },
        });
        this.books = data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    seeAll(item) {
      this.$router.push({path: '/library', query: {
        subject: item
      }})
    }
  },
};
</script>

<style scoped>
.img-container img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  /* aspect-ratio: 120/160; */
}
.grades img {
  width: 100%;
  height: 99px;
}
.grade-container {
  position: relative;
}
.grade-abs {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}
@media screen and (max-width: 767px) {
  .grid-container {
    overflow: auto;
    gap: 10px;
  }
  .img-container img {
    height: 170px;
    width: 110px;
  }
  .grade-abs{
    font-size: 12px;
  }
}
</style>
