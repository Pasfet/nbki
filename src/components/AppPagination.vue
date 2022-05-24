<template>
  <ul class="pagination">
    <li v-if="arrowsInitMax" class="pagination-item">
      <button type="button" :disabled="isInFirstPage" @click="onClickFirstPage">
        &#171;
      </button>
    </li>
    <li v-if="arrows" class="pagination-item">
      <button
        type="button"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        &#8249;
      </button>
    </li>

    <li v-for="page of pages" :key="page.name" class="pagination-item">
      <button
        type="button"
        :class="{ active: isPageActive(page.name) }"
        :disabled="page.isDisabled"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li v-if="arrows" class="pagination-item">
      <button type="button" :disabled="isInLastPage" @click="onClickNextPage">
        &#8250;
      </button>
    </li>
    <li v-if="arrowsInitMax" class="pagination-item">
      <button type="button" :disabled="isInLastPage" @click="onClickLastPage">
        &#187;
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppPagination extends Vue {
  @Prop({ type: Number, required: true })
  readonly totalLength!: number;

  @Prop({ type: Number, required: true })
  readonly perPage!: number;

  @Prop({ type: Number, required: true })
  readonly currentPage!: number;

  @Prop({ type: Boolean, default: true })
  readonly arrows?: boolean;

  @Prop({ type: Boolean, default: true })
  readonly arrowsInitMax?: boolean;

  @Prop({ type: Number, default: 3 })
  readonly maxVisibleButtons?: number;

  get totalPages() {
    return Math.ceil(this.totalLength / this.perPage);
  }
  get startPage() {
    if (this.currentPage === 1) {
      return 1;
    }

    if (this.currentPage === this.totalPages && this.maxVisibleButtons) {
      return this.totalPages - this.maxVisibleButtons + 1;
    }

    return this.currentPage - 1;
  }

  get pages() {
    if (!this.maxVisibleButtons) return [];

    const range = [];
    for (
      let i = this.startPage;
      i <=
      Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      i++
    ) {
      if (i === 0) {
        continue;
      }

      range.push({
        name: i,
        isDisabled: i === this.currentPage,
      });
    }
    return range;
  }

  get isInFirstPage() {
    return this.currentPage === 1;
  }
  get isInLastPage() {
    return this.currentPage === this.totalPages;
  }

  onClickFirstPage() {
    this.$emit("page-changed", 1);
  }

  onClickPreviousPage() {
    this.$emit("page-changed", this.currentPage - 1);
  }

  onClickPage(page: number) {
    if (page > this.totalPages) {
      this.$emit("page-changed", this.totalPages);
    }
    if (page <= 0) {
      this.$emit("page-changed", 1);
    }
    this.$emit("page-changed", page);
  }

  onClickNextPage() {
    this.$emit("page-changed", this.currentPage + 1);
  }

  onClickLastPage() {
    this.$emit("page-changed", this.totalPages);
  }

  isPageActive(page: number) {
    return this.currentPage === page;
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  text-align: center;
  margin-top: 20px;
  width: 50%;
  &-item {
    display: inline-block;
    button {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #e2e2e2;
      margin-right: 10px;
      transition: color 0.3s ease-in, background-color 0.3s ease-in;
      &:hover {
        cursor: pointer;
        background-color: #c2c2c2;
        color: #fff;
      }
    }
  }
}
.active {
  background-color: #c2c2c2;
  color: #ffffff;
}
</style>
