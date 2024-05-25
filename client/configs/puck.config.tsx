import { DropZone, type Config } from '@measured/puck';
// import { Heading as _Heading } from "@measured/puck/components/Heading";
// import type { HeadingProps as PuckHeadingProps } from '@measured/puck/components/Heading';

type Components = {
  HeadingBlock: {
    align: 'left' | 'center' | 'right';
    text?: string;
    // level?:   PuckHeadingProps['rank'];
    // size:     PuckHeadingProps['size'];
    padding?: string;
  };
  Text: {
    text?: string;
    align: 'left' | 'center' | 'right';
    padding?: string;
    size?: 's' | 'm';
    color: 'default' | 'muted';
    maxWidth?: string;
  };
  Image: {
    url: string;
    align: 'left' | 'middle' | 'right' | 'top' | 'bottom';
  };
  Flex: {
    zone: string;
  };
};

// const sizeOptions = [
//   { value: "xxxl", label: "XXXL" },
//   { value: "xxl",  label: "XXL" },
//   { value: "xl",   label: "XL" },
//   { value: "l",    label: "L" },
//   { value: "m",    label: "M" },
//   { value: "s",    label: "S" },
//   { value: "xs",   label: "XS" },
// ];

// const levelOptions = [
//   { label: "",  value: "" },
//   { label: "1", value: "1" },
//   { label: "2", value: "2" },
//   { label: "3", value: "3" },
//   { label: "4", value: "4" },
//   { label: "5", value: "5" },
//   { label: "6", value: "6" },
// ];

export const config: Config<Components> = {
  root: {
    render: ({ children }) => {
      return <div className="puckRootPoint">{children}</div>;
    },
  },
  components: {
    HeadingBlock: {
      fields: {
        text: { type: 'text' },
        // size: {
        //   type: 'select',
        //   options: sizeOptions,
        // },
        // level: {
        //   type: 'select',
        //   options: levelOptions,
        // },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
        padding: { type: 'number' },
      },
      defaultProps: {
        align: 'left',
        text: 'Text',
        padding: '24',
        // size: 'm'
      },
      render: ({ align, text, /*size, level,*/ padding }) => (
        <div style={{ padding: padding + 'px' }}>
          <span
            style={{
              display: 'block',
              textAlign: align,
              width: '100%',
            }}
          >
            {text}
          </span>
        </div>
      ),
    },
    Text: {
      fields: {
        text: { type: 'textarea' },
        align: {
          type: 'radio',
          options: [
            { label: 'left', value: 'left' },
            { label: 'center', value: 'center' },
            { label: 'right', value: 'right' },
          ],
        },
        padding: { type: 'number' },
        size: {
          type: 'select',
          options: [
            { label: 'S', value: 's' },
            { label: 'M', value: 'm' },
          ],
        },
        color: {
          type: 'radio',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Muted', value: 'muted' },
          ],
        },
        maxWidth: { type: 'number' },
      },
      defaultProps: {
        text: 'Text paragraph',
        align: 'left',
        color: 'default',
        padding: '24',
        size: 'm',
      },
      render: ({ text, align, color, size, padding, maxWidth }) => (
        <div style={{ padding: padding + 'px' }}>
          <span
            style={{
              color: color === 'default' ? 'inherit' : 'var(--puck-color-grey-4)',
              display: 'flex',
              textAlign: align,
              width: '100%',
              fontSize: size === 'm' ? '20px' : '16px',
              fontWeight: 300,
              maxWidth: maxWidth + 'px',
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent:
                align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
            }}
          >
            {text}
          </span>
        </div>
      ),
    },
    Image: {
      fields: {
        url: { type: 'text' },
        align: {
          type: 'radio',
          options: [
            { label: 'left', value: 'left' },
            { label: 'middle', value: 'middle' },
            { label: 'right', value: 'right' },
            { label: 'top', value: 'top' },
            { label: 'bottom', value: 'bottom' },
          ],
        },
      },
      defaultProps: {
        url: 'https://placehold.co/600x400',
        align: 'middle',
      },
      render: ({ url, align }) => (
        <div>
          <img align={align} src={url} />
        </div>
      ),
    },
    Flex: {
      defaultProps: {
        zone: { type: 'text' },
      },
      render: () => (
        <div>
          <DropZone zone="custom-zone" />
        </div>
      ),
    },
  },
  categories: {
    typography: { components: ['HeadingBlock', 'Text'] },
    images: { components: ['Image'] },
    layout: { components: ['Flex'] },
  },
};

export default config;
