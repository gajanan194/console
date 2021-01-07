import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../utils/dropdown';
import { formatPrometheusDuration, parsePrometheusDuration } from '../utils/datetime';

const OFF_KEY = 'OFF_KEY';

type Props = {
  interval: number;
  setInterval: (v: number) => never;
  id?: string;
};

const IntervalDropdown: React.FC<Props> = ({ interval, setInterval, id }) => {
  const { t } = useTranslation();

  const onChange = React.useCallback(
    (v: string) => setInterval(v === OFF_KEY ? null : parsePrometheusDuration(v)),
    [setInterval],
  );

  const intervalOptions = {
    [OFF_KEY]: t('monitoring~Refresh off'),
    '15s': t('monitoring~{{count}} second', { count: 15 }),
    '30s': t('monitoring~{{count}} second', { count: 30 }),
    '1m': t('monitoring~{{count}} minute', { count: 1 }),
    '5m': t('monitoring~{{count}} minute', { count: 5 }),
    '15m': t('monitoring~{{count}} minute', { count: 15 }),
    '30m': t('monitoring~{{count}} minute', { count: 30 }),
    '1h': t('monitoring~{{count}} hour', { count: 1 }),
    '2h': t('monitoring~{{count}} hour', { count: 2 }),
    '1d': t('monitoring~{{count}} day', { count: 1 }),
  };

  return (
    <Dropdown
      id={id}
      items={intervalOptions}
      onChange={onChange}
      selectedKey={interval === null ? OFF_KEY : formatPrometheusDuration(interval)}
    />
  );
};

export default IntervalDropdown;
