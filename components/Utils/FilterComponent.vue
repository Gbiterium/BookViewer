<template>
  <div class="filter-sidebar site-sidebar">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center px-3">
          <span class="font-weight-600 fs-16">Filter</span>
          <div>
            <span class="text-grey fs-12 mr-3 pointer" @click="clearFilter"
              >Clear</span
            >
            <span class="text-grey fs-12 pointer" @click="applyFilter"
              >Apply</span
            >
          </div>
        </div>
        <div class="my-3 px-3">
          <div class="search-input mr-3">
            <input
              v-model="name"
              type="search"
              class="form-control"
              placeholder="Search"
            />
            <b-icon-search class="search-icon fs-14"></b-icon-search>
          </div>
        </div>
        <DropdownToggle label="Curriculum">
          <b-form-group>
            <b-form-checkbox-group
              id="curriculum"
              class="py-2"
              v-model="selected"
              :options="curriculums"
            ></b-form-checkbox-group>
          </b-form-group>
        </DropdownToggle>
        <DropdownToggle label="Subjects">
          <b-form-group>
            <b-form-radio-group
              id="subjects"
              v-model="subject"
              :options="subjects"
            ></b-form-radio-group>
          </b-form-group>
        </DropdownToggle>
        <DropdownToggle label="Grade Level">
          <b-form-group>
            <b-form-radio-group
              id="level"
              v-model="grade_level"
              :options="grade_level_list"
            ></b-form-radio-group>
          </b-form-group>
        </DropdownToggle>
        <DropdownToggle label="Category">
          <b-form-group>
            <b-form-radio-group
              id="category"
              v-model="category"
              :options="categories_list"
            ></b-form-radio-group>
          </b-form-group>
        </DropdownToggle>
        <DropdownToggle label="Format">
          <b-form-group>
            <b-form-radio-group
              id="format"
              v-model="format"
              :options="format_list"
            ></b-form-radio-group>
          </b-form-group>
        </DropdownToggle>
        <div class="border-bottom">
          <DropdownToggle label="Date Posted">
            <b-form-group>
              <b-form-radio-group
                id="date"
                v-model="selectedDate"
                :options="dateOptions"
              ></b-form-radio-group>
            </b-form-group>
            <div v-if="show" class="d-flex align-items-center pb-3">
              <div class="date">
                <v-date-picker v-model="start_date" mode="date">
                  <template #default="{ togglePopover }">
                    <span @click="togglePopover()">
                      <input
                        class="form-control"
                        placeholder="Start Date"
                        :value="start_date | date"
                      />
                    </span>
                  </template>
                </v-date-picker>
                <b-icon-calendar4 class="fs-10 calendar-icon" />
              </div>
              <span class="mx-1 fs-10 text-grey">to</span>
              <div class="date">
                <v-date-picker v-model="end_date" mode="date">
                  <template #default="{ togglePopover }">
                    <span @click="togglePopover()">
                      <input
                        class="form-control"
                        placeholder="End Date"
                        :value="end_date | date"
                      />
                    </span>
                  </template>
                </v-date-picker>
                <b-icon-calendar4 class="fs-10 calendar-icon" />
              </div>
            </div>
          </DropdownToggle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  data() {
    return {
      show: false,
      selected: [],
      selectedDate: "",
      date: new Date(),
      name: "",
      subject: "",
      subjects: [],
      curriculums: [],
      grade_level_list: ["Primary 1", "Primary 2"],
      format_list: ["Textbook", "PDF"],
      grade_level: "",
      format: "",
      category: "",
      categories_list: ["fiction", "historical"],
      dateOptions: [
        { text: "All time", value: "" },
        { text: "7 Days", value: "7 Days" },
        { text: "30 Days", value: "30 Days" },
        { text: "Custom", value: "Custom" },
        // { text: 'This one is Disabled', value: 'third', disabled: true },
        // { text: 'This is the 4th radio', value: { fourth: 4 } }
      ],
      start_date: "",
      end_date: "",
      show: false,
    };
  },
  watch: {
    selectedDate(val) {
      // console.log(val)
      this.show = false;
      const currentDate = new Date();
      if (val === "7 Days") {
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 7);
        this.start_date = startDate;
        this.end_date = currentDate;
      } else if (val === "30 Days") {
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 30);
        this.start_date = startDate;
        this.end_date = currentDate;
      } else if (val === "Custom") {
        this.show = true;
      } else {
        this.start_date = ""
        this.end_date = ""
      }
    },
  },
  async created() {
    await this.getSubjects();
    await this.getCurriculum();
  },
  methods: {
    showContent() {
      this.show = true;
    },
    hideContent() {
      this.show = false;
    },
    async getSubjects() {
      try {
        const response = await this.$axios.get("/app/list_subjects");
        this.subjects = response.data.map((el) => el.name);
      } catch (error) {
        console.log(error);
      }
    },
    async getCurriculum() {
      try {
        const response = await this.$axios.get("/app/list_curriculum");
        this.curriculums = response.data.map((el) => el.name);
      } catch (error) {
        console.log(error);
      }
    },
    applyFilter() {
      const data = {
        curriculum: this.selected,
        // date: this.selectedDate,
        name: this.name,
        subject: this.subject,
        category: this.category,
        level: this.grade_level,
        format: this.format,
        start_date: this.start_date ? this.formatDate(this.start_date) :'',
        end_date: this.end_date ? this.formatDate(this.end_date) : '',
      };
      this.$router.push({
        query: {
          ...data,
        },
      });
    },
    clearFilter() {
      this.selected = "";
      this.selectedDate = "";
      this.name = "";
      this.subject = "";
      this.format = "";
      this.grade_level = "";
      this.category = "";
      this.start_date = "";
      this.end_date = "";

      this.$router.push({
        query: {},
      });
    },
    formatDate(date) {
      const oldDate = date.toISOString();
      const newDate = DateTime.fromISO(oldDate).toISODate();
      return newDate;
    },
  },
};
</script>

<style scoped>
.card {
  width: 230px;
  height: 800px;
}
.card-body {
  padding: 1.25rem 0 !important;
}
.filter-sidebar {
  margin-top: 100px;
}
.search-input input {
  width: 100%;
  padding-left: calc(15px + 15px + 0.2rem);
  font-size: 14px;
}
.search-input {
  position: relative;
}
.search-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #828a96;
}
.dropdown-list {
  background: #fbfdfe;
}
.date {
  position: relative;
}
.calendar-icon {
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #8f9aa3;
}
.date input {
  height: 26px;
  font-size: 10px;
  padding-left: 20px;
}
</style>
