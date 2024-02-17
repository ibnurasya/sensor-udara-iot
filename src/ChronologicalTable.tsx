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
import { TimelineData, getTimelineData } from './firebase/get-timeline-data.ts'

const columnHelper = createColumnHelper<TimelineData>()

const columns = [
  columnHelper.accessor('date', {
    header: () => 'Date',
    id: 'date',
    cell: info => {
      const unixtime = info.getValue()
      return format(new Date(unixtime * 1000), 'dd-MM-yyyy HH:mm')
    },
    size: 120,
  }),
  columnHelper.accessor('PM_2_5_SensorValue', {
    header: () => 'PM 2.5',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
  columnHelper.accessor('PM_2_5_ISPU_Number', {
    header: () => 'ISPU PM2.5',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
  columnHelper.accessor('PM_2_5_ISPU_Category', {
    header: () => 'Kategori ISPU PM2.5',
    maxSize: 80,
  }),
  columnHelper.accessor('PM_10_SensorValue', {
    header: () => 'PM 10',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
  columnHelper.accessor('PM_10_ISPU_Number', {
    header: () => 'ISPU PM10',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
  columnHelper.accessor('PM_10_ISPU_Category', {
    header: () => 'Kategori ISPU PM10',
    maxSize: 80,
  }),
  columnHelper.accessor('CO_SensorValue', {
    header: () => 'CO',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
  columnHelper.accessor('CO_ISPU_Number', {
    header: () => 'ISPU CO',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
  columnHelper.accessor('CO_ISPU_Category', {
    header: () => 'Kategori ISPU CO',
    cell: info => info.renderValue(),
    maxSize: 80,
  }),
]

type ChronologicalTableProps = {
  startDate: number;
  endDate: number;
}

function ChronologicalTable({ startDate, endDate }: ChronologicalTableProps) {
  const [data, setData] = React.useState<TimelineData[]>(() => [])

  React.useEffect(() => {
    (async () => {
      const timelineData = await getTimelineData(
        `-${endDate}`,
        `-${startDate}`
      )
      setData(timelineData.filter(Boolean))
    })()
  }, [startDate, endDate])

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
                <th key={header.id} style={{ width: header.getSize() }}>
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
            <tr key={row.id} className={row.index % 2 === 0 ? 'even' : 'odd'}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
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

        &.even {
          background-color: #487ef254;
        }
      }
    }
  }
`

export default ChronologicalTable

