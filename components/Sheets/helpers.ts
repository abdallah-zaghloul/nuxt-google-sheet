// @ts-expect-error import error
import type { TableColumn, TableActions } from '@youcan/ui-vue3/dist/types/components/Table/types';

export const columns: TableColumn[] = [
  { label: '#', accessor: 'id' },
  { label: 'Sheet', accessor: 'name' },
  { label: 'Status', accessor: 'status' },
];

export const actions: TableActions[] = [
  {
    label: 'Open',
    iconName: 'i-youcan:open-link',
    tooltip: 'Open',
    events: {
      click(row: any, index: number) {
        navigateTo(row.googleUrl, { external: true })
      },
    },
  },
  {
    label: 'Edit',
    iconName: 'i-youcan:pencil-simple',
    tooltip: 'Edit',
    events: {
      click(row: any, index: number) {
        navigateTo(`/sheet/${row.id}`)
      },
    },
  },
  {
    label: 'Delete',
    iconName: 'i-youcan-trash',
    tooltip: 'Delete',
    events: {
      click(row: any, index: number) {
        useApi.deleteSheet(row.id)
        window.location.reload
      },
    },
  },
];