import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BackButton = memo(({ label = 'General|Back', path }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <button className='btn btn-primary px-3 py-2' onClick={() => path ? navigate(path) : navigate(-1)}>
      <i className='bi bi-box-arrow-left fs-6' /> {t(label)}
    </button>
  );
});