import { ListOrders200DataItem } from '@/shared/api/gen/model';
import { DateTime } from '@/shared/ui/date';
import { Price } from '@/shared/ui/price';
import { createDataTableColumnHelper, DataTable } from '@/shared/ui/table';
import {
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '../common/status-labels';

export function OrderListTable({
  orders,
  onRowClick,
}: {
  orders: ListOrders200DataItem[];
  onRowClick?: (order: ListOrders200DataItem) => void;
}) {
  return (
    <DataTable
      columns={columns}
      data={orders}
      getRowId={(order) => order.id}
      emptyMessage="Заказов пока нет"
      onRowClick={onRowClick}
    />
  );
}

const columnHelper = createDataTableColumnHelper<ListOrders200DataItem>();

const columns = columnHelper.columns([
  columnHelper.accessor('number', {
    header: 'Номер',
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Статус',
    cell: (info) => ORDER_STATUS_LABELS[info.getValue()],
  }),
  columnHelper.accessor('paymentStatus', {
    header: 'Статус оплаты',
    cell: (info) => PAYMENT_STATUS_LABELS[info.getValue()],
  }),
  columnHelper.accessor('paymentMethod', {
    header: 'Способ оплаты',
    cell: (info) => PAYMENT_METHOD_LABELS[info.getValue()],
  }),
  columnHelper.accessor('total', {
    header: 'Сумма',
    sortFn: 'basic',
    meta: { align: 'right' },
    cell: (info) => <Price value={info.getValue()} currency={info.row.original.currency} />,
  }),

  columnHelper.accessor((order) => Date.parse(order.createdAt), {
    id: 'createdAt',
    header: 'Создан',
    sortFn: 'basic',
    cell: (info) => <DateTime value={info.row.original.createdAt} />,
  }),
]);
