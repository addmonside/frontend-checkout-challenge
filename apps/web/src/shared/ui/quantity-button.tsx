'use client';

import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from './kit/button';

export const QuantityButton = ({
  value,
  maxValue = Number.MAX_SAFE_INTEGER,
  onChange,
  onRemove,
  isPendingChange,
  isPendingRemove,
}: {
  value: number;
  maxValue?: number;
  isPendingChange?: boolean;
  isPendingRemove?: boolean;
  onChange: (q: number) => void;
  onRemove: () => void;
}) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
    else onRemove();
  };

  return (
    <>
      <Button
        className="w-8"
        variant="outline"
        isPending={value > 1 ? isPendingChange : isPendingRemove}
        onClick={handleDecrement}
      >
        {value > 1 ? <MinusIcon /> : <Trash2Icon />}
        <span className="hidden">{value > 1 ? 'Уменьшить на 1' : 'Удалить'}</span>
      </Button>
      <Button
        className="w-8"
        variant="outline"
        isPending={isPendingChange}
        onClick={handleIncrement}
        disabled={value >= maxValue}
      >
        <PlusIcon />
        <span className="hidden">Добавить 1</span>
      </Button>
    </>
  );
};
