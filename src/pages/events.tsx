import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import CollapsedBreadcrumbs from '@components/ui/common/breadcrumbs';
import { FabAdd } from '@components/ui/common/fab-add';
import { Page } from '@components/ui/common/page';
import { CardImage } from '@components/ui/custom/card-image';
import styled from 'styled-components';

import { GroupType, useEventsQuery, useGroupQuery } from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const Events: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const groupId = router.query.groupId;

  const {
    data: groupData,
    error: groupError,
    loading: groupIsLoading,
  } = useGroupQuery({
    variables: {
      id: Number(groupId),
    },
  });

  const {
    data: eventsData,
    error: eventsError,
    loading: eventsIsLoading,
  } = useEventsQuery({
    variables: {
      groupId: Number(groupId),
    },
  });

  const createEvent = (): void => {
    // eslint-disable-next-line no-alert
    router.push('/create-event');
  };

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (groupIsLoading || eventsIsLoading) {
    return <Page title="События">Loading...</Page>;
  }

  if (groupError || eventsError) {
    return (
      <Page title="События">
        Error: {JSON.stringify(groupError || eventsError)}
      </Page>
    );
  }

  const isPrivate = groupData?.group.type === GroupType.Private;

  const steps = [
    {
      label: isPrivate ? 'Мои группы' : 'Публичные группы',
      link: isPrivate ? '/private-groups' : '/public-groups',
      onClick: async (): Promise<void> => {
        await router.push(isPrivate ? '/private-groups' : '/public-groups');
      },
    },
    {
      label: groupData!.group.name,
      link: `/group/${groupId}`,
      onClick: async (): Promise<void> => {
        await router.push(`/group/${groupId}`);
      },
    },
  ];

  return (
    <Page title={groupData!.group.name} style={{ gap: 16, marginTop: 24 }}>
      <Header>{groupData?.group.name}</Header>
      <Breadcrumbs>
        <CollapsedBreadcrumbs steps={steps} />
      </Breadcrumbs>
      {eventsData?.events.map((event) => {
        const isExpired = new Date(event.endsAt) < new Date();
        const tags = [
          {
            title: `${event.applicationPairs?.length || 0} пар`,
          },
          {
            title: `${event.status}`,
            warning: isExpired,
          },
        ];

        const startDate = new Date(event.startsAt).toLocaleDateString();
        const endDate = new Date(event.endsAt).toLocaleDateString();

        return (
          <CardImage
            key={event.id}
            imageUrl={event.pictureUrl}
            preHeader={`${startDate} - ${endDate}`}
            header={event.name}
            text={event.description}
            tags={tags}
          />
        );
      })}
      <FabAdd onClick={createEvent} />
    </Page>
  );
};

const Header = styled.div`
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;
const Breadcrumbs = styled.div`
  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;

export default Events;
