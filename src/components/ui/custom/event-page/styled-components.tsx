import Image from 'next/image';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: calc(100% - 10px);
`;

export const ImageWrapper = styled(Image)`
  width: calc(100% - 10px);
  height: 30vw;
  border-radius: 20px 20px 0 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 16px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
