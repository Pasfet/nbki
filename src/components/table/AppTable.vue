<template>
  <div v-if="paginatedData.length">
    <table class="table">
      <thead>
        <tr class="table__head">
          <table-th
            v-for="(item, idx) in theadItems"
            :key="idx"
            :item="item"
            @sort="sort"
          />
        </tr>
      </thead>
      <tbody>
        <table-tr
          v-for="(item, idx) in sortableData"
          :key="item.id"
          :item="item"
          :idx="idx"
        />
      </tbody>
      <tfoot>
        <tr class="table__foot">
          <td colspan="5" v-text="totalSumText" />
        </tr>
      </tfoot>
    </table>
    <div class="actions">
      <app-pagination
        :total-length="items.length"
        :per-page="activePerPage"
        :current-page="page"
        @page-changed="changePage"
      />
      <app-dropdown
        :options="perPage"
        :selectedOption="activePerPage"
        label="Выводить по"
        @select="changePerPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  TableHeadItems,
  TableItemInterface,
  TablePropName,
  TableSorted,
} from "@/types/table";
import TableTh from "./TableTh.vue";
import TableTr from "./TableTr.vue";
import AppDropdown from "../AppDropdown.vue";
import AppPagination from "../AppPagination.vue";

@Component({
  components: {
    TableTh,
    TableTr,
    AppDropdown,
    AppPagination,
  },
})
export default class AppTable extends Vue {
  @Prop({ type: Array, required: true })
  readonly items!: TableItemInterface[];

  private page = 1;
  private perPage = [10, 50, 100];
  private activePerPage = 50;
  private sortBy = TablePropName.ID;
  private sortAsc: TableSorted = TableSorted.ASC;

  get theadItems(): TableHeadItems[] {
    return [
      { title: "ID", prop: TablePropName.ID },
      { title: "Наименование", prop: TablePropName.NAME },
      { title: "Цена", prop: TablePropName.PRICE },
      { title: "Количество", prop: TablePropName.COUNT },
      { title: "Стоимость", prop: TablePropName.TOTAL },
    ];
  }

  get paginatedData() {
    const start = (this.page - 1) * this.activePerPage;
    const end = start + this.activePerPage;

    return this.items.slice(start, end);
  }

  get sortableData() {
    return this.paginatedData.sort((a, b) => {
      if (
        this.sortAsc === TableSorted.ASC
          ? a[this.sortBy] > b[this.sortBy]
          : a[this.sortBy] < b[this.sortBy]
      ) {
        return 1;
      }
      if (
        this.sortAsc === TableSorted.ASC
          ? a[this.sortBy] < b[this.sortBy]
          : a[this.sortBy] > b[this.sortBy]
      ) {
        return -1;
      }

      return 0;
    });
  }

  get totalSum() {
    return this.items.reduce((sum, cur) => (sum += +cur.total), 0);
  }

  get totalSumText() {
    return `Итого: ${this.totalSum.toFixed(2)} ₽`;
  }

  @Watch("activePerPage")
  @Watch("sortBy")
  onClearPage() {
    this.page = 1;
  }

  sort(sortBy: TablePropName, asc: TableSorted) {
    this.sortAsc = asc;
    this.sortBy = sortBy;
  }

  changePage(page: number) {
    this.page = page;
  }

  changePerPage(perPage: number) {
    this.activePerPage = perPage;
  }
}
</script>

<style lang="scss" scoped>
$main-gray: #c2c2c2;

.table {
  margin: 0 auto;
  border: 1px solid $main-gray;
  border-radius: 10px;
  position: relative;
  border-collapse: collapse;
  display: block;
  position: relative;
  max-width: 70vw;
  max-height: 300px;
  overflow: auto;

  @media (max-width: 1024px) {
    max-width: 80vw;
  }

  &__head {
    th:nth-child(1) {
      width: 4%;
    }

    th:nth-child(2) {
      width: 20%;
    }
    th:nth-child(3) {
      width: 20%;
    }
    th:nth-child(4) {
      width: 30%;
    }
    th:nth-child(5) {
      width: 20%;
    }
  }

  &__foot {
    position: sticky;
    bottom: 0;
    padding: 1rem;
    background-color: $main-gray;
    color: #fff;
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 70vw;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

.pagination {
  list-style: none;
  width: 100%;
  padding: 0;
  flex-basis: 40%;

  &__item {
    padding: 0.5rem 1rem;
    border: 1px solid $main-gray;
    border-radius: 10px;
    transition: 0.2s linear;
    display: inline-block;

    &:hover,
    &:focus {
      cursor: pointer;
      background-color: $main-gray;
      color: #fff;
    }
  }
}

.page {
  &_active {
    background-color: $main-gray;
    color: #fff;
  }
  &_first::after {
    content: "...";
  }

  &_last::before {
    content: "...";
  }
}
</style>
