<template>
  <thead class="sticky top-0 bg-surface-raised text-muted">
    <tr>
      <slot name="leading" />
      <th class="px-4 py-2 font-medium">
        Date
      </th>
      <th class="px-4 py-2 font-medium">
        Title
      </th>
      <th class="px-4 py-2 font-medium">
        Type
      </th>
      <th class="px-4 py-2 font-medium">
        Category
      </th>
      <th class="px-4 py-2 text-right font-medium">
        Amount
      </th>
      <slot name="trailing" />
    </tr>
  </thead>
</template>
