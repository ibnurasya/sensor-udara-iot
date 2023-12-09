import * as React from 'react'

import './App.tsx'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import styled from 'styled-components'
import { format } from 'date-fns'

type ChronologicalRow = {
  date: number
  val_pm25: number
  ispu_pm25: number
  cat_ispu_pm25: string
  val_pm10: number
  ispu_pm10: number
  cat_ispu_pm10: string
  val_co: number
  ispu_co: number
  cat_ispu_co: string
}

const defaultData: ChronologicalRow[] = [
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Baik',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Baik',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Baik',
  },
  {
    date: 1702028505,
    val_pm25: 50,
    ispu_pm25: 50,
    cat_ispu_pm25: 'Buruk',
    val_pm10: 50,
    ispu_pm10: 50,
    cat_ispu_pm10: 'Buruk',
    val_co: 50,
    ispu_co: 50,
    cat_ispu_co: 'Buruk',
  },
]

const columnHelper = createColumnHelper<ChronologicalRow>()

const columns = [
  columnHelper.accessor('date', {
    header: () => 'Date',
    id: 'date',
    cell: info => {
      const unixtime = info.getValue()
      return format(new Date(unixtime * 1000), 'dd-MM-yyyy')
    },
  }),
  columnHelper.accessor('val_pm25', {
    header: () => 'PM 2.5',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('ispu_pm25', {
    header: () => 'ISPU PM2.5',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('cat_ispu_pm25', {
    header: () => 'Kategori ISPU PM2.5',
  }),
  columnHelper.accessor('val_pm10', {
    header: () => 'PM 10',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('ispu_pm10', {
    header: () => 'ISPU PM10',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('cat_ispu_pm10', {
    header: () => 'Kategori ISPU PM10',
  }),
  columnHelper.accessor('val_co', {
    header: () => 'CO',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('ispu_co', {
    header: () => 'ISPU CO',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('cat_ispu_co', {
    header: () => 'Kategori ISPU CO',
  }),
]

function ChronologicalTable() {
  const [data, setData] = React.useState(() => [...defaultData])
  // const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <ChronologicalTableContainer>
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
    </ChronologicalTableContainer>
  )
}

const ChronologicalTableContainer = styled.div`
  color: black;
  font-size: 12px;
  overflow-x: scroll;

  table {
    min-width: 800px;
    border-collapse: collapse;

    th {
      padding: 0.25rem 0.5rem;
      background: #487EF2;
      color: white;

      &:first-child {
        border-radius: 0.2rem 0 0 0.2rem;
      }
      &:last-child {
        border-radius: 0 0.2rem 0.2rem 0;
      }
    }

    thead {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    tbody {
      display: block;
      height: 100px;
      overflow-y: scroll;

      tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
    }
  }
`

export default ChronologicalTable

