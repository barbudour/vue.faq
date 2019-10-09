<template>
<!--
  columns - массив имен колонок. элемент массива = {name: 'Длительность', code: null, sort: false},
  tableData - массив данных которые отображаются
  paginatorInputData - данные пагинатора (count, next, prev)
  showSlot - флаг показывать ли слот(для действий)
  clickInSlot - событие клика на область слота(в событии документ, в который кликнули)
  changePage - emit для родительского компонента ({limit, offset, filter})
  showSearch
 -->
  <div class="table-wrapper animated fadeIn faster">
    <!-- <div class="table-search" v-if="showSearch !== false">
      <input-search-component :placeholder="'Поиск данных'">
        <img src="@/assets/img/search.svg" alt="">
      </input-search-component>
    </div> -->
    <table class="table">
      <thead class="thead">
        <tr class="thead-tr">
          <td class="thead-td" v-if="showCheckbox !== false">
            <!-- убираю выбрать все, т.к. это нигде не используется, но осталю чекбокс чтобы выбирать камеру -->
            <!-- <div @click="selectAllItems()">
              <input type="checkbox" name="index" id="checkbox-select-all" :value="selectAll" v-model="selectAll">
              <label for="checkbox-select-all"></label>
            </div> -->
          </td>
          <td class="thead-td"
            v-for="(col, index) in columns" :key="index"
            @click="sortByField(col.code)">
              {{ col.name }}
            <div class="thead-td-sort" v-show="col.sort !== false">
              <img src="@/assets/img/sort.png" alt="">
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tbody-tr" v-for="(item, index) in tableData" :key="index">
          <td class="tbody-td" v-if="showCheckbox !== false">
            <div @click="selectItem(index, item)">
              <input type="checkbox" :name="index" :id="'checkbox-' + index" :value="index" v-model="selected">
              <label :for="'checkbox' + index"></label>
            </div>
          </td>
          <td class="tbody-td" v-for="(itemField, index) in item" :key="index" v-html="itemField"></td>
          <td class="tbody-td"  v-if="showSlot" @click="clickInSlot(item)">
            <slot name="actions"></slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginator">
      <div class="paginator-navigation-left" id="active" v-if="currentPage > 3">
        <img src="@/assets/img/chevron-double-left-active.svg" @click="emitChangePage({value: 1, name: '1'})" alt="" class="paginator-navigation-left-double-arrow paginator-navigation-left-double-arrow-active">
        <img src="@/assets/img/chevron-left-active.svg" @click="emitChangePage({value: currentPage - 1, name: currentPage - 1})" alt="" class="paginator-navigation-left-arrow paginator-navigation-left-arrow-active">
      </div>
      <div class="paginator-navigation-left" id="disabled" v-else>
        <img src="@/assets/img/chevron-double-left-disabled.svg" alt="" class="paginator-navigation-left-double-arrow">
        <img src="@/assets/img/chevron-left-disabled.svg" alt="" class="paginator-navigation-left-arrow">
      </div>
      <div class="paginator-page"
        :class="{'paginator-page-selected': item.name === currentPage}"
        v-for="(item, index) in pageList" :key="index"
        @click="emitChangePage(item)">
        {{ item.name }}
      </div>
      <div class="paginator-navigation-right" v-if="currentPage < tablePaginator.lastPage && tablePaginator.lastPage > 5">
        <img src="@/assets/img/chevron-right-active.svg" @click="emitChangePage({value: currentPage + 1, name: currentPage + 1})" alt="" class="paginator-navigation-right-arrow paginator-navigation-right-arrow-active">
        <img src="@/assets/img/chevron-double-right-active.svg" @click="emitChangePage({value: tablePaginator.lastPage, name: tablePaginator.lastPage})" alt="" class="paginator-navigation-right-double-arrow paginator-navigation-right-double-arrow-active">
      </div>
      <div class="paginator-navigation-right" v-else>
        <img src="@/assets/img/chevron-right-disabled.svg" alt="" class="paginator-navigation-right-arrow">
        <img src="@/assets/img/chevron-double-right-disabled.svg" alt="" class="paginator-navigation-right-double-arrow">
      </div>
    </div>
  </div>
</template>

<script>
// import inputSearch from '@common/input/inputSearch'

export default {
  name: 'table-compoenent',
  props: ['columns', 'tableData', 'paginatorInputData', 'showSlot', 'showSearch', 'showCheckbox'],
  // components: {
  //   'input-search-component': inputSearch
  // },
  data () {
    return {
      selected: [],
      selectAll: false,
      // paginator
      currentPage: 1,
      limit: 5,
      sortBy: null
    }
  },
  computed: {
    tablePaginator () { // объект пагинатора
      let _lastPage = Math.floor(this.paginatorInputData.count / this.limit)
      if (this.paginatorInputData.count % this.limit !== 0) {
        _lastPage++
      }
      return {
        count: this.paginatorInputData.count,
        next: this.paginatorInputData.next,
        previous: this.paginatorInputData.previous,
        limit: 5,
        offset: (this.currentPage - 1) * this.limit,
        currentPage: this.currentPage,
        lastPage: _lastPage
      }
    },
    pageList () { // вычисляет показываетмые страницы
      let pageArr = []
      if (this.tablePaginator.currentPage === 1 && this.tablePaginator.lastPage > 4) { // если первая страница и их больше 4
        for (let i = 1; i < 4; i++) { // заполнить 1,2,3
          pageArr.push({value: i, name: i})
        }
        pageArr.push({value: null, name: '...'}) // заполнить "..."
        pageArr.push({value: this.tablePaginator.lastPage, name: this.tablePaginator.lastPage}) // заполнить последней страницей
      } else if (this.tablePaginator.currentPage < 5 && this.tablePaginator.lastPage < 5) { // если в первой петерке и их всего меньше 5
        for (let i = 1; i <= this.tablePaginator.lastPage; i++) {
          pageArr.push({value: i, name: i})
        }
      } else if (this.tablePaginator.currentPage <= this.tablePaginator.lastPage - 4) { // если страница не первая и не последняя(и между последний отображаемой и последней есть еще)
        pageArr.push({value: this.tablePaginator.currentPage - 1, name: this.tablePaginator.currentPage - 1}) // предпоследняя
        pageArr.push({value: this.tablePaginator.currentPage, name: this.tablePaginator.currentPage}) // остальное
        pageArr.push({value: this.tablePaginator.currentPage + 1, name: this.tablePaginator.currentPage + 1})
        pageArr.push({value: null, name: '...'})
        pageArr.push({value: this.tablePaginator.lastPage, name: this.tablePaginator.lastPage}) // последняя
      } else if (this.tablePaginator.currentPage > this.tablePaginator.lastPage - 4) { // если в последних страницах
        for (let i = this.tablePaginator.lastPage - 4; i < this.tablePaginator.lastPage + 1; i++) {
          pageArr.push({value: i, name: i})
        }
      }
      return pageArr
    }
  },
  methods: {
    sortByField (fieldName) {
      // console.log(fieldName)
      if (this.sortBy !== fieldName) { // если сортируем по новому полю или не сортировали до этого
        this.sortBy = fieldName
      } else { // если по тому же полю, то добавить обратную сортировку
        this.sortBy = fieldName.substring(1, fieldName.length)
      }
      this.emitChangePage({value: 1, name: 1})
    },
    selectAllItems () {
      // this.selectAll = !this.selectAll
      if (!this.selectAll) { // если нажали выбрать все
        for (let rowIndex in this.tableData) {
          if (this.selected.indexOf(rowIndex) === -1) {
            this.selected.push(rowIndex)
          }
        }
      } else { // если нажали снять "выбрать все"
        for (let i = 0; i < this.selected.length + 1; i++) {
          this.selected.splice(0, 1)
        }
      }
    },
    emitChangePage (page) {
      this.selected.splice(0, this.selected.length)
      if ((page.value !== null && page.value !== this.currentPage) || this.sortBy !== null) {
        let _offset = (page.value - 1) * this.tablePaginator.limit
        this.$emit('changePage', {limit: this.tablePaginator.limit, offset: _offset, sort: this.sortBy})
        this.currentPage = page.value
      }
    },
    clickInSlot (item) {
      this.$emit('clickInSlot', item)
    },
    selectItem (index, item) {
      // это обычный выбор, когда можно выбрать много элементов
      // let pos = this.selected.indexOf(index)
      // if (pos !== -1) {
      //   this.selected.splice(pos, 1)
      // } else {
      //   this.selected.push(index)
      // }
      // а это выбор только одной камеры
      let pos = this.selected.indexOf(index)
      if (pos !== -1) {
        this.selected.splice(pos, 1)
        this.$emit('selectItem', null)
      } else if (this.selected.length > 0) {
        this.selected.splice(0, this.selected.length)
        this.selected.push(index)
        this.$emit('selectItem', {item: item, index: index})
      } else {
        this.selected.push(index)
        this.$emit('selectItem', {item: item, index: index})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/varibles.scss";
// @import "../../assets/styles/global.scss";

.table-search {
  width: 100%;

  &-input {
    width: 100%;
  }
}

.table-wrapper {
  width: 100%;
}
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid $color-border;
  border-top: none;
  text-align: center;
}

.thead {
  background-color: $color-very-light-gray;

  &-tr {
    min-height: 45px;
    padding: 13px 22px 13px 30px;
    font-weight: 600;
  }

  &-td {
    min-width: 75px;
    max-width: 230px;
    padding: 11px;
    white-space: nowrap;
    cursor: pointer;
  }

  &-td-sort {
    display: inline;
    margin-left: 3px;
  }
}

.tbody {
  &-tr {
    height: 73px;
    border: 1px solid $color-border;
  }

  &-tr:hover {
    background-color: $color-table-hover;
  }

  &-td {
    padding: 10px;
    min-width: 75px;
    max-width: 230px;
  }
}

// пагинатор
.paginator {
  margin-top: 30px;
  display: flex;

  &-page {
    margin-left: 35px;
    cursor: pointer;
  }

  &-page-selected {
    font-size: 20px;
    font-weight: 500;
    margin-top: -4px;
  }

  &-navigation-right-arrow {
    margin-top: 1px;
    margin-left: 37px;
    height: 16px;
  }
  &-navigation-right-arrow-active:hover {
    cursor: pointer;
  }
  &-navigation-right-double-arrow {
    margin-top: 1px;
    margin-left: 37px;
    height: 16px;
  }
  &-navigation-right-double-arrow-active:hover {
    cursor: pointer;
  }

  &-navigation-left-arrow {
    margin-top: 1px;
    margin-right: 37px;
    height: 16px;
  }
  &-navigation-left-arrow-active:hover {
    cursor: pointer;
  }
  &-navigation-left-double-arrow {
    margin-top: 1px;
    margin-right: 37px;
    height: 16px;
  }
  &-navigation-left-double-arrow-active:hover {
    cursor: pointer;
  }
}
</style>