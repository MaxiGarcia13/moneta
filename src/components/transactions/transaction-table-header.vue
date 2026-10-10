<template>
  <thead class="sticky top-0 bg-surface-raised text-muted">
    <tr>
      <slot name="leading" />
      <th class="px-4 py-3 font-medium">
        Date
      </th>
      <th class="px-4 py-3 font-medium">
        Title
      </th>
      <th class="px-4 py-3 font-medium">
        Type
      </th>
      <th class="px-4 py-3 font-medium">
        Category
      </th>
      <th class="px-4 py-3 text-right font-medium">
        Amount
      </th>
    </tr>
  </thead>
</template>
