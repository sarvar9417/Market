import { t } from 'i18next';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';

export const FilialTable = ({
  setPageSize,
  branchInputChange,
  data,
  setData,
  countPage,
  totalDatas,
  setCurrentPage,
  keyPressed,
}) => {
  return (
    <div>
      <TableHeader
        setPageSize={setPageSize}
        branchInputChange={branchInputChange}
        filename={t('Filiallar')}
        countPage={countPage}
        totalDatas={totalDatas}
        setCurrentPage={setCurrentPage}
        keyPressed={keyPressed}
      />
      <TableHead data={data} setData={setData} />
    </div>
  );
};
