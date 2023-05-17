<template>
  <div>
    <div class="card">
        <!-- @tab-selected="handleOnSelectTab($event)" -->
        <UtilsBaseCardTab>
        <template
            v-for="(tab, index) in ['All', 'Reading', 'Favorite']"
          >
          <UtilsCardTab :key="index" :title="tab">
            <div v-if="loading">
  <div class="row mt-3">
    <div v-for="n in 4" :key="n" class="col-lg-3">
      <div class="mt-3">
        <b-skeleton width="100%" height="109px" />
      </div>
    </div>
  </div>
</div>
            <div v-if='show && !loading' class="card-body">
              <div class="row mb-4">
                <div class="col-lg-3 small-card">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12">BOOKS</h5>
                      <span class="text-blue fs-30">{{ bookshelf.length }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 small-card">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12">FAVORITE</h5>
                      <span class="text-blue fs-30">0</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 small-card">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12">TOTAL STUDY TIME</h5>
                      <span class="text-blue fs-30">300 hrs</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 small-card">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="fs-12 text-uppercase">Top Subject</h5>
                      <span class="text-blue fs-30">Mathematics</span>
                    </div>
                  </div>
                </div>
              </div>
            <div class="row mt-3">
        <div v-for="el in bookshelf"
        :key="el.id" class="col-lg-2 mb-3 pointer">
        <div @click.prevent="handleClick(el)">
          <div class="img-container">
              <img :src="'data:image/png;base64,' + el.book_cover">
            </div>
            <div class="mt-1 fs-12">
              <div>{{ el.name }}</div>
              <div class="text-grey book-details">{{ el.author }}</div>
              <div class="text-grey book-details">{{ el.level.join(", ") }}</div>
            </div>
            </div>
            </div>
      </div>
    </div>
            <div v-if='!show && !loading' class="card-body px-xl-5 d-flex justify-content-center align-items-center">
                <div>
            <div class="d-flex justify-content-center align-items-center">
              <img src="@/assets/img/noContent.png" alt="">
              </div>
              <div class="d-flex justify-content-center align-items-center fs-14 text-grey mt-2 mb-4">
              <span>No book added to bookshelf yet</span>
              </div>
            <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-primary px-3 py-2">Browse Libary</button>
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
    layout: 'authWithoutTopbar',
    data () {
      return {
        bookshelf: [],
        loading: false,
        show: true
      }
    },
    watch: {
    "$route.query": {
      async handler(val) {
        await this.getBooks(val);
      },
    },
  },
      async mounted() {
        await this.getBooks()
      },
      methods: {
        handleClick (item) {
      console.log(item, 'element')
      this.$router.push(`/bookshelf/${item.id}`)
    },
    async getBooks (item) {
      try {
          this.loading = true
          const { data } = await this.$axios.get('/app/myshelf', {
          params: {
            curriculum: this.$route.query.curriculum ? item.curriculum.map((el) => el) : "",
            date: this.$route.query.date ? item.date : "",
            name: this.$route.query.name ? item.name : "",
            subject: this.$route.query.subject ? item.subject : "",
            format: this.$route.query.format ? item.format : "",
            level: this.$route.query.level ? item.level : "",
            category: this.$route.query.category ? item.category : "",
          },
        })
          this.bookshelf = data.data
          if(this.bookshelf.length > 0) {
            this.show = true
          } else {
            this.show = false
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
    }
      }
}
</script>

<style scoped>
.card-body {
    min-height: 500px;
}
.img-container img{
  width: 100%;
  height: 160px;
  aspect-ratio: 104/160;
}
.small-card .card {
  height: 109px;
  width: 100%;
  border: 0.4px solid #EAEAF1;
box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.05);
border-radius: 4px;
}
.small-card h5 {
  font-weight: 300;
}
.small-card span {
  font-weight: 250;
}
</style>