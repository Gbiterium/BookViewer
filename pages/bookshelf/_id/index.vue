<template>
  <div class="container book">
    <div class="card">
      <div class="card-body py-xl-5 px-xl-5">
        <div class="row">
          <div class="col-md-4 col-lg-3 left-side">
            <div v-if="loading">
              <div class="grid-container mt-3">
                <div class="mt-3">
                  <b-skeleton width="100%" height="338px" />
                </div>
              </div>
            </div>
            <div v-else class="thumbnail">
              <img :src="book.book_cover" />
            </div>
            <button
              class="btn btn-primary mt-4"
              @click.prevent="addToBookshelf"
            >
              Add to Bookshelf
              <b-spinner
                class="ml-1"
                v-if="isLoading"
                label="Spinning"
                style="width: 1rem; height: 1rem"
              ></b-spinner>
            </button>
            <button
              class="btn btn-outline-primary mt-2"
              @click.prevent="addToFavorite"
            >
              Add to Favorite
              <b-spinner
                class="ml-1"
                v-if="isBusy"
                label="Spinning"
                style="width: 1rem; height: 1rem"
              ></b-spinner>
            </button>
            <button
              class="btn btn-outline-primary mt-2"
              @click.prevent="editBook"
            >
              Preview Snippet
            </button>
          </div>
          <div class="col-md-8 col-lg-9 details">
            <div class="fs-20">{{ book.name }}</div>
            <div>{{ book.author }}</div>
            <div class="mt-4">
              <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
                <template
                  v-for="(tab, index) in ['Details', 'Rating & Review']"
                >
                  <UtilsCardTab :key="index" :title="tab">
                    <div v-if="showDetails" class="about-book">
                      <div class="mt-2">
                        <h4 class="fs-18">About this Book</h4>
                        <p class="fs-14 text-grey">
                          {{ book.short_description }}
                        </p>
                      </div>
                      <div class="mt-4">
                        <h4 class="fs-18">More Information</h4>
                        <table class="mt-3">
                          <tr>
                            <td>Primary Language</td>
                            <td>{{ book.primary_book_language }}</td>
                          </tr>
                          <tr>
                            <td>Curriculum</td>
                            <td>
                              {{ curriculums ? curriculums.join(", ") : "" }}
                            </td>
                          </tr>
                          <tr>
                            <td>Subject</td>
                            <td>{{ subjects ? subjects.join(", ") : "" }}</td>
                          </tr>
                          <tr>
                            <td>Grade Level</td>
                            <td>
                              {{ book.level ? book.level.join(", ") : "" }}
                            </td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>
                              {{
                                book.categories
                                  ? book.categories.join(", ")
                                  : ""
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Format</td>
                            <td>{{ book.format }}</td>
                          </tr>
                          <tr>
                            <td>Size</td>
                            <td>{{ book.size }}</td>
                          </tr>
                          <tr>
                            <td>Pages</td>
                            <td>{{ book.number_of_pages }}</td>
                          </tr>
                          <tr>
                            <td>Published</td>
                            <td>{{ formatDate(book.publication_date) }}</td>
                          </tr>
                        </table>
                      </div>
                      <!-- <div class="mt-4">
              <h4 class="fs-18">More From Author</h4>
              <div class="row mt-3">

              </div>
            </div> -->
                    </div>
                    <div v-if="showRating" class="rating mt-2">
                      <h4 class="fs-18">Student Rating and Reviews</h4>
                      <div class="d-flex align-items-center">
                        <div class="mt-5 mr-4">
                          <span class="font-weight-600 rating-value">{{
                            averageRating ? averageRating.toFixed(1) : "0.0"
                          }}</span>
                          <star-rating
                            :show-rating="false"
                            :max-rating="5"
                            :star-size="12"
                            :padding="5"
                            :read-only="true"
                            v-model="averageRating"
                            active-color="#FF9C09"
                            :increment="0.5"
                          ></star-rating>
                        </div>
                        <div class="flex-grow-1 mt-3">
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">5</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 5).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1 slide-in"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">4</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 4).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">3</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 3).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">2</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 2).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-grey mr-2 fs-14">1</div>
                            <b-progress
                              :value="
                                reviews.filter((el) => el.rating === 1).length
                              "
                              :max="reviews.length"
                              height="8px"
                              variant="warning"
                              class="flex-grow-1"
                            ></b-progress>
                          </div>
                        </div>
                      </div>
                      <div class="mt-4 review-details">
                        <button
                          class="btn btn-light btn-abs p-2 fs-12"
                          @click.prevent="$bvModal.show('reviewBook')"
                        >
                          Write a Review
                        </button>
                        <div v-if="reviews.length > 0" class="fs-14">
                          <div v-for="el in reviews" :key="el.id">
                            <div class="mb-4">
                              <div class="d-flex align-items-center mobile-top">
                                <!-- <div class="mobile-top"> -->
                                <span class="mr-2">{{ el.title }}</span>
                                <star-rating
                                  class="mb-2"
                                  :show-rating="false"
                                  :rating="el.rating"
                                  :star-size="14"
                                  :padding="5"
                                  :read-only="true"
                                  active-color="#FF9C09"
                                ></star-rating>
                                <!-- </div> -->
                              </div>
                              <div>
                                <span class="text-grey">by</span>
                                {{ user.first_name }} {{ user.last_name }} -
                                <span class="text-grey">{{
                                  formatDate(el.date_created)
                                }}</span>
                              </div>
                              <p class="text-grey capitalize mt-1">
                                {{ el.review_text }}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div v-else class="text-grey">No reviews yet</div>
                      </div>
                    </div>
                  </UtilsCardTab>
                </template>
              </UtilsBaseCardTab>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalWrapper id="reviewBook" title="Review Book" :no-footer="true">
      <div class="row">
        <div class="col-md-7">
          <small>Title</small>
          <input v-model="title" class="form-control" type="text" />
        </div>
        <div class="col-md-5">
          <small>Rate this book</small>
          <star-rating
            :show-rating="false"
            :max-rating="5"
            :star-size="28"
            :padding="5"
            v-model="selectedRating"
            active-color="#FF9C09"
          ></star-rating>
        </div>
      </div>
      <div class="mt-3">
        <small>Review</small>
        <textarea v-model="review" class="form-control" rows="4"></textarea>
      </div>
      <div class="d-flex justify-content-end my-3">
        <button
          class="btn btn-light px-4 py-2 mr-2"
          @click.prevent="$bvModal.hide('reviewBook')"
        >
          Cancel
        </button>
        <button class="btn btn-primary px-4 py-2" @click.prevent="submitReview">
          Submit
        </button>
      </div>
    </ModalWrapper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";
export default {
  layout: "noFilterLayout",
  data() {
    return {
      showDetails: true,
      showRating: false,
      book: [],
      subjects: [],
      curriculums: [],
      loading: false,
      selectedRating: 0,
      title: "",
      review: "",
      averageRating: 0,
      reviews: [],
      isLoading: false,
      isBusy: false,
      user: {},
    };
  },
  async fetch() {
    try {
      this.loading = true;
      const { data } = await this.$axios.get(
        `/app/fetch_book/${this.$route.params.id}/`
      );
      this.book = data;
      this.subjects = data.subject.map((el) => el.name);
      this.curriculums = data.curriculum.map((el) => el.name);
      await this.getReview();
      // await this.getMoreFromAuthor()
      if (this.$cookies.get("user-details")) {
        this.user = this.$cookies.get("user-details");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    ...mapGetters("reader", ["getReader"]),
  },
  methods: {
    async submitReview() {
      try {
        const response = await this.$axios.post("/app/add_book_review/", {
          review_text: this.review,
          rating: this.selectedRating,
          book: this.$route.params.id,
          title: this.title,
          user: this.getReader.user_profile,
        });
        if (response.status === 200) {
          this.$bvModal.hide("reviewBook");
          if (response.status === 200) {
            this.$toast({
              type: "success",
              text: "review submitted successfully",
            });
          }
          (this.title = ""), (this.selectedRating = 0), (this.review = "");
          await this.getReview();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getReview() {
      try {
        const { data } = await this.$axios.get(
          `/app/book/${this.$route.params.id}/reviews/`
        );
        this.reviews = data.data;
        this.averageRating =
          this.reviews.reduce((sum, rating) => sum + rating.rating, 0) /
          this.reviews.length;
      } catch (error) {
        console.log(error);
      }
    },
    async getMoreFromAuthor() {
      try {
        const response = await this.$axios.get(
          `/app/more_from_author?author_name=${this.book.author}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async addToBookshelf() {
      try {
        this.isLoading = true;
        const response = await this.$axios.get(
          `/app/book/${this.$route.params.id}/add_to_shelf`
        );
        if (response.status === 200) {
          this.$toast({
            type: "success",
            text: "book successfully added to shelf",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async addToFavorite() {
      try {
        this.isBusy = true;
        const response = await this.$axios.get(
          `/app/book/${this.$route.params.id}/add_to_favorites`
        );
        if (response.status === 200) {
          this.$toast({
            type: "success",
            text: "book successfully added to favorites",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isBusy = false;
      }
    },
    editBook() {
      this.$router.push({
        path: "/publisher/bookshelf/create-book",
        query: {
          book_id: this.$route.params.id,
        },
      });
    },
    async handleOnSelectTab(e) {
      if (e === "Details") {
        // mine
        this.showDetails = true;
        this.showRating = false;
      }
      if (e === "Rating & Review") {
        // class
        // await this.getReview()
        this.showRating = true;
        this.showDetails = false;
      }
    },
    formatDate(date) {
      const newdate = DateTime.fromISO(date);
      const formattedDate = newdate.toFormat("dd LLL yyyy");
      return formattedDate;
    },
  },
};
</script>

<style scoped>
.thumbnail img {
  height: 338px;
  width: 100%;
  object-fit: cover;
}
.book {
  animation: slide-fade 0.5s ease-out 0s;
}
.rating {
  /* line-height: 0 !important; */
}
.left-side button {
  width: 100%;
}
table {
  font-size: 14px;
  width: 100%;
}
td,
th {
  /* border: 1px solid #dddddd; */
  text-align: left;
  padding: 8px;
}
.capitalize::first-letter {
  text-transform: uppercase;
}

tr:nth-child(odd) {
  background-color: #f8f8f8;
}
small {
  font-size: 12px !important;
}
.rating-value {
  font-size: 64px;
  line-height: 0 !important;
}
.review-details {
  position: relative;
}
.btn-abs {
  position: absolute;
  right: 0;
}
@media screen and (max-width: 767px) {
  .thumbnail img {
    width: 100%;
  }
  .left-side button {
    width: 100%;
  }
  .details {
    margin-top: 20px;
  }
  .mobile-top {
    margin-top: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
