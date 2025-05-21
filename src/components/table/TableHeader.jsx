import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { DataTableFilter2 } from 'asab_webui_components';

export default memo(({ titleKey, showFilter, onResetFilter }) => {
  const { t } = useTranslation();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const handleOnResetFilter = () => {
    urlSearchParams.delete('f')
    setUrlSearchParams(urlSearchParams);
  };

  return (
    <>
      <div className='flex-fill'>
        <h3>
          <i className='bi bi-people-fill pe-2' />
          {t(titleKey)}
        </h3>
      </div>
      {showFilter && <>
        <DataTableFilter2 />
        <button 
          type='button'
          className='btn btn-danger'
          onClick={onResetFilter ?? handleOnResetFilter}
        >{t('General|Cancel')}</button>
      </>}
    </>
  );
})