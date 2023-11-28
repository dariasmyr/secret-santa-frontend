import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';

import {
  useGenerateTelegramBotLinkQuery,
  useGenerateUrlGoogleQuery,
} from '@/generated/graphql';

const Login: FC = () => {
  const { t } = useTranslation(['common', 'auth']);
  const { data: tgLinkData, error: tgLinkError } =
    useGenerateTelegramBotLinkQuery();
  const { data: googleLinkData, error: googleLinkError } =
    useGenerateUrlGoogleQuery({
      variables: {
        state: 'http://localhost:3000/auth/google',
      },
    });
  const router = useRouter();

  if (tgLinkError) {
    return <div>Error: {JSON.stringify(tgLinkError)}</div>;
  }

  if (googleLinkError) {
    return <div>Error: {JSON.stringify(googleLinkError)}</div>;
  }

  if (!tgLinkData) {
    return <div>Loading...</div>;
  }

  if (!googleLinkData) {
    return <div>Loading...</div>;
  }

  const handleLoginViaTelegram = async (): Promise<void> => {
    await router.push(tgLinkData.generateTelegramBotLink);
  };

  const handleLoginViaGoogle = async (): Promise<void> => {
    await router.push(googleLinkData.generateUrlGoogle);
  };

  return (
    <PageWrapper>
      <Image src={'/assets/logo1.png'} width={230} height={100} alt="Logo" />
      <Title>{t('auth:login:title')}</Title>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label={
          <p>
            {t('auth:login:confirm_with')}{' '}
            <a href="#">{t('auth:login:terms_of_use')}</a>
          </p>
        }
      />
      <Button variant={ButtonVariant.primary} onClick={handleLoginViaGoogle}>
        {t('auth:login:google')}
      </Button>
      <p>{t('auth:login:or')}</p>
      <Button variant={ButtonVariant.primary} onClick={handleLoginViaTelegram}>
        {t('auth:login:telegram')}
      </Button>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'auth'])),
    },
  };
};

const Title = styled.div`
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/h5 */
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 133.4%; /* 32.016px */
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30%;
  height: 100vh;
  gap: 16px;
`;

export default Login;
