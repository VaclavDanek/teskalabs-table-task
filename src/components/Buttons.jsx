import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BackButton = ({ label = 'General|Back', path = '/' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <button className='btn btn-primary py-2' onClick={() => navigate(path)}>
      <i className='bi bi-box-arrow-left' /> {t(label)}
    </button>
  );
}