declare module 'react-world-flags' {
  import { FC } from 'react';

  interface FlagProps {
    code: string;
    style?: React.CSSProperties;
    className?: string;
    fallback?: React.ReactNode;
    width?: number;
    height?: number;
  }

  const Flag: FC<FlagProps>;
  export default Flag;
}