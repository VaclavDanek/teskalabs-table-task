import React from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'asab_webui_components';

export default ({ data }) => {
  const { t } = useTranslation();
  return (
    <dl className='row g-2'>
      <dt className='col-sm-5 text-start'>{t('General|Username')}</dt>
      <dd className='col-sm-7 text-end'>{data.username}</dd>

      <dt className='col-sm-5 text-start'>{t('General|Email')}</dt>
      <dd className='col-sm-7 text-end'>{data.email}</dd>

      <dt className='col-sm-5 text-start'>{t('General|Created at')}</dt>
      <dd className='col-sm-7 text-end'><DateTime value={data.created}/></dd>

      <dt className='col-sm-5 text-start'>{t('General|Last signed in')}</dt>
      <dd className='col-sm-7 text-end'><DateTime value={data.last_sign_in}/></dd>

      <dt className='col-sm-5 text-start'>{t('General|Address')}</dt>
      <dd className='col-sm-7 text-end'>{data.address}</dd>

      <dt className='col-sm-5 text-start'>{t('General|Phone')}</dt>
      <dd className='col-sm-7 text-end'>{data.phone_number}</dd>

      <dt className='col-sm-5 text-start'>{t('General|IP address')}</dt>
      <dd className='col-sm-7 text-end'>{data.ip_address}</dd>

      <dt className='col-sm-5 text-start'>{t('General|MAC address')}</dt>
      <dd className='col-sm-7 text-end'>{data.mac_address}</dd>
    </dl>
  );
}