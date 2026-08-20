<script setup lang="ts">
import { ref } from "vue";

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/threadable/ui/button-group";

import { Calendar } from "@/registry/threadable/ui/calendar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/threadable/ui/carousel";

import { ChartContainer } from "@/registry/threadable/ui/chart";

import { Button } from "@/registry/threadable/ui/button";

const calendarValue = ref();

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
};
</script>

<template>
  <section aria-labelledby="visual-composition-heading">
    <h3 id="visual-composition-heading" class="mb-3 text-base font-semibold">
      Visual composition
    </h3>
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div
        data-testid="registry-component-button-group"
        data-component="button-group"
      >
        <ButtonGroup aria-label="Formatting actions">
          <Button type="button" variant="outline">Save</Button>
          <ButtonGroupSeparator />
          <ButtonGroupText>Draft</ButtonGroupText>
        </ButtonGroup>
      </div>

      <div data-testid="registry-component-calendar" data-component="calendar">
        <div role="group" aria-label="Choose a date">
          <Calendar v-model="calendarValue" class="rounded-md border" />
        </div>
      </div>

      <div data-testid="registry-component-carousel" data-component="carousel">
        <Carousel class="mx-auto w-full max-w-xs" aria-label="Example slides">
          <CarouselContent>
            <CarouselItem v-for="slide in ['One', 'Two', 'Three']" :key="slide">
              <div
                class="flex h-24 items-center justify-center rounded-md border"
              >
                Slide {{ slide }}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious aria-label="Previous slide" />
          <CarouselNext aria-label="Next slide" />
        </Carousel>
      </div>

      <div data-testid="registry-component-chart" data-component="chart">
        <ChartContainer
          :config="chartConfig"
          class="h-28 w-full rounded-md border p-2"
        >
          <div
            role="img"
            aria-label="Visitors chart"
            class="flex h-full items-end gap-2"
          >
            <div class="h-1/3 flex-1 bg-primary/40" />
            <div class="h-2/3 flex-1 bg-primary/60" />
            <div class="h-full flex-1 bg-primary" />
          </div>
        </ChartContainer>
      </div>
    </div>
  </section>
</template>
