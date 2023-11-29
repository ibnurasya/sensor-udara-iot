import * as React from 'react'

import './App.tsx'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  date: string
  valPM2_5: number
  ISPUPM2_5: number
  categoryISPUPM2_5: string
  valPM10: number
  ISPUPM10: number
  categoryISPUPM10: string
  valCO: number
  ISPUCO: number
  categoryISPUCO: string
}

const defaultData: Person[] = [
  {
    date: '20-11-2023 11:23:21',
    valPM2_5: 50,
    ISPUPM2_5: 50,
    categoryISPUPM2_5: 'Baik',
    valPM10: 75,
    ISPUPM10: 75,
    categoryISPUPM10: 'Sedang',
    valCO: 100,
    ISPUCO: 100,
    categoryISPUCO: 'Tidak Sehat',
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('date', {
    header: () => 'Date',
    id: 'date',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('valPM2_5', {
    header: () => 'PM 2.5',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('ISPUPM2_5', {
    header: () => 'ISPU PM2_5',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('categoryISPUPM2_5', {
    header: () => 'Kategori ISPU PM2_5',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('valPM10', {
    header: () => 'PM 10',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('ISPUPM10', {
    header: () => 'ISPU PM10',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('categoryISPUPM10', {
    header: () => 'Kategori ISPU PM10',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('valPMCO', {
    header: () => 'CO',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('ISPUPMCO', {
    header: () => 'ISPU CO',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('categoryISPUPMCO', {
    header: () => 'Kategori ISPU CO',
    footer: info => info.column.id,
  }),
]

function App() {
  const [data, setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

return TimeTable