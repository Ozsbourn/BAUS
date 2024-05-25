import '@mantine/core/styles.css';

export const metadata = {
  title: 'a/b/:id',
  description: 'desc',
};

export default function BuilderLayout({ children }: { children: any }) {
  return <div>{children}</div>;
}
