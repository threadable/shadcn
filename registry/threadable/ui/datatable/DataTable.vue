<script setup lang="ts" generic="TData, TValue">
import { onMounted, type Ref, ref, watch } from "vue";
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  type Updater,
  useVueTable,
} from "@tanstack/vue-table";

import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/threadable/ui/table";
import TableNoResult from "@/registry/threadable/ui/datatable/TableNoResult.vue";
import LoadingSpinner from "@/registry/threadable/ui/loading-spinner/LoadingSpinner.vue";
import { H3Block, H4Block } from "@/registry/threadable/ui/typography";
import { CardBlock } from "@/registry/threadable/ui/card-block";

import {
  defaultPageSizes,
  defaultPageSize,
  useIsMobile,
} from "@/registry/threadable/lib/utils";
import { SelectItem } from "@/registry/threadable/ui/base-select";
import { watchDebounced } from "@vueuse/core";

import Select from "@/registry/threadable/ui/select/Select.vue";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/registry/threadable/ui/base-pagination";
import {
  PaginationNext,
  PaginationPrevious,
} from "@/registry/threadable/ui/pagination";

interface filterColumn {
  data: string;
  searchable: string;
  search: { value: string };
}

interface filterOrder {
  column: number;
  dir: string;
}

interface filterInterface {
  search?: string;
  length: number;
  start: number;
  columns: filterColumn[];
  order: filterOrder[];
}

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    page: number;
    total: number;
    numRows: number | string;
    loading: boolean;
    pageSize: number;
    pageSizes?: number[];
    filters: filterInterface;
    enableRowClick?: boolean;
    hidePagination?: boolean;
    noDataMessage?: string;
  }>(),
  {
    noDataMessage: undefined,
    hidePagination: false,
  },
);

const emits = defineEmits<{
  (e: "pageSizeChanges", value: number): void;
  (e: "pageChanges", value: number): void;
  (e: "sortChanges", value: SortingState): void;
  (e: "rowClick", row: TData): void;
}>();

const sorting = ref<SortingState>([]);
const handleSort = <T extends Updater<any>>(updaterOrValue: T, ref: Ref) => {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
  table.resetPageIndex();
  pageModel.value = Number(table.getState().pagination.pageIndex) + 1;
  emits("sortChanges", ref.value);
};
const setIntialSorting = () => {
  props.filters.order.forEach((item: filterOrder) => {
    table.setSorting((sortingState) => [
      ...sortingState,
      {
        id: props.filters.columns[item.column].data,
        desc: item.dir.toLowerCase() === "desc",
      },
    ]);
  });
};

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  rowCount: props.total,
  manualPagination: true,
  manualSorting: true,
  onSortingChange: (updaterOrValue) => handleSort(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});

const goToPageNumber = ref(1);
const goToPageNumberDebounced = ref(1);
const goToPageInvalid = ref(false);
const pageSizes = props.pageSizes || defaultPageSizes;
const pageSizeModel = ref(defaultPageSize);
const pageModel = ref(1);
const isMobile = useIsMobile();

const isActionsColumn = (
  column: ColumnDef<TData, TValue> & { id?: string },
) => {
  const columnIdentifier = String(
    column.id ?? ("accessorKey" in column ? column.accessorKey : ""),
  ).toLowerCase();

  return columnIdentifier === "actions";
};

const getRowActionCell = (row: any) => {
  return row
    .getVisibleCells()
    .find((cell: any) => isActionsColumn(cell.column.columnDef));
};

const getRowDataCells = (row: any) => {
  return row
    .getVisibleCells()
    .filter((cell: any) => !isActionsColumn(cell.column.columnDef));
};

const getRowTitleCell = (row: any) => {
  const dataCells = getRowDataCells(row);

  return (
    dataCells.find((cell: any) => cell.column.columnDef.meta?.mobileHeader) ??
    dataCells[0] ??
    null
  );
};

const getRowDetailCells = (row: any) => {
  const titleCell = getRowTitleCell(row);

  return getRowDataCells(row).filter((cell: any) => cell.id !== titleCell?.id);
};

const humanizeColumnIdentifier = (value: string) => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getMobileColumnLabel = (cell: any) => {
  const mobileLabel = cell.column.columnDef.meta?.mobileLabel;

  if (mobileLabel) {
    return mobileLabel;
  }

  return humanizeColumnIdentifier(
    String(cell.column.columnDef.accessorKey ?? cell.column.id ?? ""),
  );
};

const getHeaderSortState = (header: any) => {
  const sortDirection = header.column.getIsSorted();

  if (!sortDirection) {
    return "none";
  }

  return sortDirection === "asc" ? "ascending" : "descending";
};

const calculatePageCount = () => {
  return Math.ceil(props.total / table.getState().pagination.pageSize);
};

const handleGoToPage = () => {
  goToPageInvalid.value = false;

  if (
    goToPageNumberDebounced.value > calculatePageCount() ||
    goToPageNumberDebounced.value < 1
  ) {
    goToPageInvalid.value = true;
    return;
  }

  pageModel.value = goToPageNumberDebounced.value;

  const page = goToPageNumberDebounced.value
    ? Number(goToPageNumberDebounced.value) - 1
    : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
  emits(
    "pageChanges",
    Number(table.getState().pagination.pageIndex) *
      Number(table.getState().pagination.pageSize),
  );
};

const handleNextPage = () => {
  table.nextPage();
  handlePageState();
};

const handlePreviousPage = () => {
  table.previousPage();
  handlePageState();
};

const handlePageClick = (pageNumber: number) => {
  table.setPageIndex(pageNumber - 1);
  handlePageState();
};

const handlePageState = () => {
  pageModel.value = Number(table.getState().pagination.pageIndex) + 1;
  emits(
    "pageChanges",
    Number(table.getState().pagination.pageIndex) *
      Number(table.getState().pagination.pageSize),
  );
};

const handlePageSizeChange = () => {
  table.setPageSize(Number(pageSizeModel.value));
  table.resetPageIndex();
  pageModel.value = Number(table.getState().pagination.pageIndex) + 1;
  emits("pageSizeChanges", Number(pageSizeModel.value));
};

onMounted(() => {
  pageSizeModel.value = props.pageSize;
  pageModel.value = props.page + 1;
  table.setPageSize(Number(props.pageSize));
  setTimeout(() => setIntialSorting(), 100);
});

watch(
  () => props.page,
  (page) => {
    const pageIndex = Number(page);

    if (!Number.isFinite(pageIndex)) {
      return;
    }

    pageModel.value = pageIndex + 1;
    table.setPageIndex(pageIndex);
  },
);

watch(
  () => props.pageSize,
  (pageSize) => {
    const nextPageSize = Number(pageSize);

    if (!Number.isFinite(nextPageSize) || nextPageSize <= 0) {
      return;
    }

    pageSizeModel.value = nextPageSize;
    table.setPageSize(nextPageSize);
  },
);

watchDebounced(
  goToPageNumberDebounced,
  () => {
    handleGoToPage();
  },
  { debounce: 1000, maxWait: 1000, deep: true },
);

function onRowClick(e: MouseEvent, row: any) {
  if (!props.enableRowClick) return;
  const t = e.target as HTMLElement | null;

  if (
    t &&
    t.closest(
      'button, a, input, textarea, select, [data-row-ignore], [role="button"]',
    )
  )
    return;

  emits("rowClick", row.original);
}

function onRowKeydown(e: KeyboardEvent, row: any) {
  if (!props.enableRowClick) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const t = e.target as HTMLElement | null;

    if (
      t &&
      t.closest(
        'button, a, input, textarea, select, [data-row-ignore], [role="button"]',
      )
    )
      return;

    emits("rowClick", row.original);
  }
}

function getRowInteractiveAttrs(row: any) {
  if (!props.enableRowClick) return {};
  return {
    role: "button",
    tabindex: 0,
    onClick: (e: MouseEvent) => onRowClick(e, row),
    onKeydown: (e: KeyboardEvent) => onRowKeydown(e, row),
  };
}
</script>

<template>
  <div>
    <!-- Mobile Card Layout -->
    <div v-if="isMobile" class="md:hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-8">
        <LoadingSpinner />
      </div>

      <!-- Data Rows as Cards -->
      <div
        v-else-if="table.getRowModel().rows?.length"
        class="space-y-2"
        data-test="datatable-mobile-card-list"
      >
        <CardBlock
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          as="article"
          variant="datatable-mobile"
          :data-state="row.getIsSelected() ? 'selected' : undefined"
          data-test="datatable-mobile-card"
          v-bind="getRowInteractiveAttrs(row)"
          :class="[props.enableRowClick ? 'cursor-pointer' : '']"
        >
          <div class="flex items-center justify-between gap-2">
            <H3Block
              v-if="getRowTitleCell(row)"
              class="min-w-0 flex-1 truncate *:truncate"
              data-test="datatable-mobile-card-title"
              :data-column-id="getRowTitleCell(row).column.id"
            >
              <FlexRender
                :render="getRowTitleCell(row).column.columnDef.cell"
                :props="getRowTitleCell(row).getContext()"
              />
            </H3Block>

            <div v-if="getRowActionCell(row)" class="shrink-0">
              <FlexRender
                :render="getRowActionCell(row).column.columnDef.cell"
                :props="getRowActionCell(row).getContext()"
              />
            </div>
          </div>

          <div v-if="getRowDetailCells(row).length" class="mt-2 space-y-2">
            <div
              v-for="cell in getRowDetailCells(row)"
              :key="cell.id"
              class="flex items-start justify-between gap-3"
            >
              <H4Block
                :data-test="`datatable-mobile-field-label-${cell.column.id}`"
              >
                {{ getMobileColumnLabel(cell) }}
              </H4Block>

              <H4Block
                class="flex min-w-0 flex-1 justify-end text-right wrap-anywhere"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </H4Block>
            </div>
          </div>

          <div v-if="$slots['row-detail']">
            <slot name="row-detail" :row="row.original" />
          </div>
        </CardBlock>
      </div>

      <!-- Empty State -->
      <div v-else class="flex justify-center py-8">
        <TableNoResult :message="noDataMessage ?? 'No Results Found'" />
      </div>
    </div>

    <!-- Desktop Table Layout -->
    <div class="relative hidden md:block">
      <div class="">
        <Table>
          <TableHeader>
            <TableRow
              class="bg-primary hover:bg-primary"
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead
                v-for="header in headerGroup.headers"
                :key="header.id"
                :id="header.id"
                :aria-sort="
                  header.column.getCanSort()
                    ? getHeaderSortState(header)
                    : undefined
                "
                :data-test="
                  header.column.getCanSort()
                    ? `datatable-header-${header.column.id}`
                    : undefined
                "
                class="bold text-white"
              >
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody v-if="loading || !table.getRowModel().rows?.length">
            <TableRow v-if="loading">
              <TableCell :colspan="columns.length">
                <LoadingSpinner />
              </TableCell>
            </TableRow>
            <TableRow v-else>
              <TableCell :colspan="columns.length">
                <TableNoResult :message="noDataMessage ?? 'No Results Found'" />
              </TableCell>
            </TableRow>
          </TableBody>
          <tbody
            v-else
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :class="[
              row.index % 2 === 0 ? 'bg-white' : 'bg-black/5',
              'border-b transition-colors hover:bg-muted/50',
            ]"
          >
            <TableRow
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              v-bind="getRowInteractiveAttrs(row)"
              :class="props.enableRowClick ? 'cursor-pointer' : ''"
              class="border-b-0 bg-transparent text-primary hover:bg-transparent"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
            <tr v-if="$slots['row-detail']">
              <td :colspan="columns.length" class="p-0">
                <slot name="row-detail" :row="row.original" />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>

    <!-- Mobile Pagination (shown on both mobile and desktop) -->
    <div
      v-if="!hidePagination && table.getRowModel().rows?.length"
      class="flex flex-col-reverse items-center justify-between gap-6 py-4 md:flex-row"
    >
      <div class="flex items-center gap-2 text-sm text-primary">
        <span>Rows per page</span>
        <Select
          v-model="pageSizeModel"
          placeholder="Page Size"
          @update:modelValue="handlePageSizeChange"
          ariaLabel="Page Size Select"
          :triggerClass="'text-sm bg-white! border-black/5 rounded-all! focus:outline-none cursor-pointer shadow-none! p-0 h-7!'"
        >
          <template #items>
            <template v-for="p in pageSizes" :key="p">
              <SelectItem :aria-label="`${p} rows per page`" :value="p">
                {{ p }}
              </SelectItem>
            </template>
          </template>
        </Select>
        <span>of {{ total }} rows</span>
      </div>

      <div class="flex items-center gap-1">
        <Pagination
          v-slot="{ page }"
          :items-per-page="pageSizeModel"
          :total="total"
          :page="pageModel"
          :sibling-count="isMobile ? 0 : 1"
          show-edges
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious
              @click="handlePreviousPage"
              class="cursor-pointer"
              data-test="pagination-previous"
            />
            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                :data-test="'pagination-item-' + item.value"
                class="cursor-pointer rounded-full"
                :class="{
                  'border-primary! bg-primary! text-white hover:text-white':
                    item.value === page,
                }"
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
                @click="handlePageClick(item.value as number)"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis
                v-else-if="item.type === 'ellipsis'"
                :index="index"
              />
            </template>
            <PaginationNext
              @click="handleNextPage"
              class="cursor-pointer"
              data-test="pagination-next"
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </div>
</template>

<style scoped>
#actions {
  text-align: right;
}
</style>
