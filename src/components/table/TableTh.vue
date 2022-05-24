<template>
  <th class="th" @click="sort">
    {{ item.title }}
    <arrow-sorted-icon v-if="sortAsc" class="th_icon" :class="arrowClasses" />
  </th>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TableHeadItems, TableSorted } from "@/types/table";
import ArrowSortedIcon from "@/assets/ArrowSortedIcon.vue";

@Component({
  components: {
    ArrowSortedIcon,
  },
})
export default class TableTh extends Vue {
  @Prop({ type: Object, required: true })
  readonly item!: TableHeadItems;

  private sortAsc: TableSorted | null = null;

  get arrowClasses() {
    return {
      th_icon_desc: this.sortAsc === TableSorted.ASC,
    };
  }

  sort() {
    this.$emit("sort", this.item.prop, this.sortAsc);
    if (this.sortAsc === TableSorted.ASC) {
      this.sortAsc = TableSorted.DESC;
    } else {
      this.sortAsc = this.sortAsc ? null : TableSorted.ASC;
    }
  }
}
</script>

<style lang="scss" scoped>
.th {
  padding: 1rem;
  background-color: #c2c2c2;
  position: sticky;
  top: 0;
  transition: 0.2s linear;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #fff;
    color: #000;
  }

  &_icon {
    width: 15px;
    height: 15px;

    &_desc {
      transform: rotate(180deg);
    }
  }
}
</style>
