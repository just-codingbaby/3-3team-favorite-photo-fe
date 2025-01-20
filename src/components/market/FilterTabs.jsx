import { cn } from '@/lib/utils';

import { FILTER_LIST, GRADE_STYLES } from '@/constants/market';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function FilterTabs() {
  const filterKeys = Array.from(FILTER_LIST.keys());

  return (
    <Tabs className="grid" defaultValue="grade">
      <TabsList className="grid grid-cols-3 text-gray-400" aria-label="필터 옵션">
        {filterKeys.map((key) => (
          <TabsTrigger key={key} value={key}>
            {FILTER_LIST.get(key).label}
          </TabsTrigger>
        ))}
      </TabsList>
      {filterKeys.map((key) => (
        <TabsContent key={key} value={key} className="pb-18">
          <TabContentTable options={FILTER_LIST.get(key).options} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function TabContentTable({ options }) {
  return (
    <Table>
      <TableBody>
        {options.map(({ value, label }) => (
          <TableRow key={value}>
            <TableCell className={cn('flex-1 pl-8 text-left', GRADE_STYLES[label] || null)}>
              {label.replace('_', ' ')}
            </TableCell>
            <TableCell className="flex-none pr-8 text-right tabular-nums">- 개</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}