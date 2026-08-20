<script setup lang="ts">
import { computed, ref } from "vue";

import type { ColumnDef } from "@tanstack/vue-table";

import { DataTable } from "@/registry/threadable/ui/datatable";

import {
  PaginationNext,
  PaginationPrevious,
} from "@/registry/threadable/ui/pagination";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/registry/threadable/ui/base-pagination";

import { Select } from "@/registry/threadable/ui/select";

import { StepperBlock } from "@/registry/threadable/ui/stepper-block";

import TabsSelect from "@/registry/threadable/ui/tabs-select/TabsSelect.vue";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/threadable/ui/stepper";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/threadable/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/threadable/ui/table";

const selectedTab = ref("overview");

const tabsSelectValue = ref("overview");

const stepperSteps = [
  { value: 1, title: "Details" },
  { value: 2, title: "Review" },
  { value: 3, title: "Complete" },
];

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

interface DemoRow {
  name: string;
  status: string;
}

const tableRows: DemoRow[] = [
  { name: "Accessible component", status: "Ready" },
  { name: "Long content demonstrates wrapping", status: "Review" },
];

const tableColumns: ColumnDef<DemoRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
];

const tableFilters = {
  columns: [
    { data: "name", searchable: "true", search: { value: "" } },
    { data: "status", searchable: "true", search: { value: "" } },
  ],
  order: [],
  length: 10,
  start: 0,
};
</script>

<template>
  <section
    aria-labelledby="navigation-heading"
    class="rounded-xl border bg-card p-5 shadow-sm"
  >
    <div class="mb-5">
      <h2 id="navigation-heading" class="text-xl font-semibold">
        Navigation and data
      </h2>
    </div>
    <div class="grid gap-6 lg:grid-cols-2">
      <div
        data-testid="registry-component-tabs"
        data-component="tabs"
        class="space-y-3"
      >
        <Tabs v-model="selectedTab" class="w-full" activation-mode="automatic">
          <TabsList>
            <TabsTrigger data-testid="demo-tab-overview" value="overview"
              >Overview</TabsTrigger
            >
            <TabsTrigger data-testid="demo-tab-activity" value="activity"
              >Activity</TabsTrigger
            >
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview content</TabsContent>
          <TabsContent value="activity">Activity content</TabsContent>
          <TabsContent value="settings">Settings content</TabsContent>
        </Tabs>
      </div>
      <div
        data-testid="registry-component-tabs-select"
        data-component="tabs-select"
      >
        <TabsSelect
          v-model="tabsSelectValue"
          :tabs="tabs"
          select-aria-label="Select section"
        />
      </div>
      <div
        data-testid="registry-component-stepper-block"
        data-component="stepper-block"
      >
        <StepperBlock :steps="stepperSteps" :current-step="2" />
      </div>
      <div data-testid="registry-component-stepper" data-component="stepper">
        <Stepper :model-value="2" class="flex items-center">
          <StepperItem
            v-for="(step, index) in stepperSteps"
            :key="step.value"
            :step="step.value"
          >
            <StepperTrigger class="flex items-center gap-2">
              <StepperIndicator>{{ step.value }}</StepperIndicator>
              <StepperTitle as="span" class="hidden sm:block">{{
                step.title
              }}</StepperTitle>
            </StepperTrigger>
            <StepperSeparator v-if="index < stepperSteps.length - 1" />
          </StepperItem>
        </Stepper>
      </div>
      <div
        data-testid="registry-component-pagination"
        data-component="pagination"
        class="flex gap-2"
      >
        <Pagination
          aria-label="Component pages"
          :items-per-page="10"
          :total="30"
          :default-page="1"
        >
          <PaginationContent>
            <PaginationPrevious :disabled="true" aria-label="Previous page" />
            <PaginationItem :value="1" />
            <PaginationNext aria-label="Next page" />
          </PaginationContent>
        </Pagination>
      </div>
      <div
        data-testid="registry-component-table"
        data-component="table"
        class="overflow-x-auto"
      >
        <Table>
          <caption class="sr-only">
            Component status
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in tableRows" :key="row.name">
              <TableCell>{{ row.name }}</TableCell>
              <TableCell>{{ row.status }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div
        data-testid="registry-component-datatable"
        data-component="datatable"
        class="min-w-0"
      >
        <DataTable
          :columns="tableColumns"
          :data="tableRows"
          :filters="tableFilters"
          :page="1"
          :total="tableRows.length"
          :num-rows="tableRows.length"
          :loading="false"
          :page-size="10"
          :hide-pagination="true"
        />
      </div>
    </div>
  </section>
</template>
