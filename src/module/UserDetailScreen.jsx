import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import { ResultCard, Spinner, ErrorHandler } from 'asab_webui_components';

//* components
import { BackButton, UserDataList } from '../components';

//* hooks
import { useUser } from '../api/hooks/useUser';

export const UserDetailScreen = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { fetchUser, isLoading, error } = useUser();

  //* state
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUser(id).then(userData => setUserData(userData));
  }, [id, fetchUser]);

  if (isLoading) {
    return (
      <Container className='h-100 pt-5'>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container className='h-100'>
      <ResultCard 
        isSuccessful={!error}
        body={
          <div className='p-3'>
            <h4 className='flex-fill mb-4'>
              <i className='bi bi-person-vcard pe-2' />
              {t('UserDetailScreen|Title')}
            </h4>
            {error ? (
              <div className='mb-4'>
                <ErrorHandler error={error} />
              </div> 
            ) : <UserDataList data={userData} />}
            <BackButton />
          </div>
        }
      />
    </Container>
  );
}