<template>
  <tr>
    <td v-for="(value, key) in item" :key="key" v-text="item[key]" />
  </tr>
</template>

<script lang="ts">
import { TableItemInterface } from "@/types/table";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TableTr extends Vue {
  @Prop({ type: Object, required: true })
  readonly item!: TableItemInterface;
}
</script>
