<template>
  <div id="app">
    <div class="actions">
      <label for="countItems">
        <input
          v-model.number="countItems"
          id="countItems"
          type="number"
          placeholder="Сколько сгенерировать строк?"
          class="input"
        />
      </label>
      <button class="button" @click="generateTableData">Сгенерировать</button>
    </div>
    <div v-if="Error">{{ Error.message }}</div>
    <app-table :items="items" />
    <app-loader v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TableItemInterface } from "./types/table";
import { mockResponseData } from "@/api/index";
import AppTable from "./components/table/AppTable.vue";
import AppLoader from "./components/AppLoader.vue";

@Component({
  components: {
    AppTable,
    AppLoader,
  },
})
export default class App extends Vue {
  private items: TableItemInterface[] = [];
  private countItems: number | null = null;
  private loading = false;
  private Error: Error | null = null;

  async generateTableData() {
    try {
      this.loading = true;
      const data = await mockResponseData(this.countItems ?? 50);

      this.items = data ?? [];
    } catch (err) {
      const error = err as Error;
      this.Error = error;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.actions {
  margin-bottom: 2rem;
}

.input {
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  min-width: 250px;
}

.button {
  padding: 16px 20px;
  background-color: transparent;
  border-radius: 5px;
  transition: 0.2s linear;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #000;
    color: #fff;
  }
}
</style>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  padding: 50px;
}
</style>
