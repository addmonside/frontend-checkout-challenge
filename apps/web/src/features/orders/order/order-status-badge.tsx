import { GetOrder200Data } from '@/shared/api/gen/model';
import { Badge } from '@/shared/ui/kit/badge';
import { ORDER_STATUS_LABELS } from '../common/status-labels';

export function OrderStatusBadge({ status }: { status: GetOrder200Data['status'] }) {
  return <Badge>{ORDER_STATUS_LABELS[status]}</Badge>;
}
