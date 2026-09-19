import {
  type ColumnDef,
  createColumnHelper,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  metaHelper,
  type RowData,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';

export type DataTableColumnMeta = {
  /** Выравнивание содержимого столбца. */
  align?: 'left' | 'right' | 'center';
};

/** Фичи таблицы: клиентская сортировка + клиентская пагинация. */
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type DataTableFeatures = typeof dataTableFeatures;

export type DataTableColumnDef<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  unknown
>;

/** Типизированный columnHelper под DataTable. */
export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}

const ALIGN_CLASS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

const SORT_ICON = { asc: '↑', desc: '↓' } as const;

const PAGE_SIZES = [10, 20, 50] as const;

export type DataTableProps<TData extends RowData> = {
  columns: DataTableColumnDef<TData>[];
  data: TData[];
  pageSize?: number;
  getRowId?: (row: TData, index: number) => string;
  emptyMessage?: React.ReactNode;
  /** Клик (или Enter) по строке. Клики по ссылкам/кнопкам внутри ячеек игнорируются. */
  onRowClick?: (row: TData) => void;
};

const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, label';

export function DataTable<TData extends RowData>({
  columns,
  data,
  pageSize = 10,
  getRowId,
  emptyMessage = 'Нет данных',
  onRowClick,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    initialState: { pagination: { pageIndex: 0, pageSize } },
  });

  const { pageIndex, pageSize: currentPageSize } = table.state.pagination;
  const pageCount = Math.max(table.getPageCount(), 1);
  const rows = table.getRowModel().rows;
  const total = data.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-muted/50 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const column = header.column;
                  const align = ALIGN_CLASS[column.columnDef.meta?.align ?? 'left'];
                  const sorted = column.getIsSorted();
                  const canSort = column.getCanSort();

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      scope="col"
                      aria-sort={
                        sorted === 'asc'
                          ? 'ascending'
                          : sorted === 'desc'
                            ? 'descending'
                            : canSort
                              ? 'none'
                              : undefined
                      }
                      className={`text-muted-foreground h-10 px-3 font-medium whitespace-nowrap ${align}`}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={column.getToggleSortingHandler()}
                          className="hover:text-foreground inline-flex cursor-pointer items-center gap-1 select-none"
                        >
                          <FlexRender header={header} />
                          <span
                            aria-hidden
                            className={`inline-block w-3 ${sorted ? 'text-foreground' : 'opacity-40'}`}
                          >
                            {sorted ? SORT_ICON[sorted] : '↕'}
                          </span>
                        </button>
                      ) : (
                        <FlexRender header={header} />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="text-muted-foreground h-24 px-3 text-center"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={
                    onRowClick
                      ? (e) => {
                          if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
                          onRowClick(row.original);
                        }
                      : undefined
                  }
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === 'Enter' && e.target === e.currentTarget) {
                            onRowClick(row.original);
                          }
                        }
                      : undefined
                  }
                  className={`hover:bg-muted/40 border-b last:border-b-0 ${
                    onRowClick
                      ? 'focus-visible:bg-muted/40 cursor-pointer focus-visible:outline-none'
                      : ''
                  }`}
                >
                  {row.getAllCells().map((cell) => {
                    const align = ALIGN_CLASS[cell.column.columnDef.meta?.align ?? 'left'];
                    return (
                      <td key={cell.id} className={`px-3 py-2 ${align}`}>
                        <FlexRender cell={cell} />
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="text-muted-foreground hidden sm:block">Всего: {total}</div>

        <div className="flex flex-1 flex-wrap items-center justify-between gap-3 sm:flex-none sm:justify-end sm:gap-4">
          <label className="text-muted-foreground flex items-center gap-2">
            <span className="text-muted-foreground">
              <span className="hidden sm:inline">Страница</span> {pageIndex + 1} из {pageCount}
            </span>
            <span className="hidden sm:inline">На странице</span>
            <select
              value={currentPageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="bg-background text-foreground h-8 rounded-md border px-2"
            >
              {(PAGE_SIZES.includes(pageSize as (typeof PAGE_SIZES)[number])
                ? PAGE_SIZES
                : [...PAGE_SIZES, pageSize].sort((a, b) => a - b)
              ).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="hover:bg-muted h-8 rounded-md border px-3 disabled:pointer-events-none disabled:opacity-50"
            >
              Назад
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="hover:bg-muted h-8 rounded-md border px-3 disabled:pointer-events-none disabled:opacity-50"
            >
              Вперёд
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
