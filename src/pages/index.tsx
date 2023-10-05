import { ReactNode } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { CardImage, ICardImageProperties } from '@components/ui/card-image';
import { CardPreference } from '@components/ui/card-preference';
import { CardEmailToggle } from '@components/ui/email/card-email-toggle';

const testCardImageProperties: ICardImageProperties = {
  imageUrl: 'https://source.unsplash.com/random/368×200/?fruit',
  preHeader: 'Pre Header Text',
  header: 'Header Text',
  text: 'Body Text',
  tags: [
    {
      title: 'Test Tag 1',
      warning: true,
    },
    {
      title: 'Test Tag 2',
    },
    {
      title: 'Test Tag 3',
    },
  ],
};

const textCardPreferenceProperties = {
  header: 'Header Text',
  preferences: [
    {
      title: 'Диапазон',
      value: '1-10 USD',
    },
    {
      title: 'Я не хочу чтобы мне дарили',
      value: 'Сладости',
    },
    {
      title: 'Я хочу чтобы мне дарили',
      value: 'Книги',
    },
    {
      title: 'Комментарий для партнёра',
      value: 'Присылайте мне всё в офис 235',
    },
  ],
};

const textCardEmailToggleProperties = {
  title: 'Email',
  description: 'При включенной опции уведомления будут приходить на ваш емейл',
};

export default function IndexPage(): ReactNode {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '80%',
        alignItems: 'center',
        margin: '100px',
        gap: '20px',
        marginBottom: '100px',
      }}
    >
      <Button onClick={handleClick} variant={ButtonVariant.primary}>
        я получил подарок
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.secondary}>
        я не получил подарок
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.borderless}>
        Отмена
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.warning}>
        Удалить
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.outlined}>
        Удалить
      </Button>
      <CardImage
        imageUrl={testCardImageProperties.imageUrl}
        text={testCardImageProperties.text}
        header={testCardImageProperties.header}
        preHeader={testCardImageProperties.preHeader}
        tags={testCardImageProperties.tags}
      />
      <CardPreference
        header={textCardPreferenceProperties.header}
        preferences={textCardPreferenceProperties.preferences}
      />
      <CardEmailToggle
        title={textCardEmailToggleProperties.title}
        description={textCardEmailToggleProperties.description}
      />
    </div>
  );
}
