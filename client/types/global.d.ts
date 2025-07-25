declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native';

  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native';

  const value: ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import type React from 'react';
  import type { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
