import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import { ResultCard, Spinner, ErrorHandler } from 'asab_webui_components';

//* components
import UserDataList from '../components/user/UserDataList';
import { BackButton } from '../components/Buttons';

export const UserDetailScreen = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  //* state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://devtest.teskalabs.com/detail/${id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((e) => {
        setError({
          error: 'UserDetailScreen|Failed to fetch user data',
          error_dict: { msg: e.message }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

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
            <h5 className='card-title mb-4'>{t('UserDetailScreen|Title')}</h5>
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