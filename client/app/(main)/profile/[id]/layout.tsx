import '@mantine/core/styles.css';

export const metadata = {
  title: 'a/p/:id',
  description: 'desc',
};

export default function ProfilePageLayout({ children }: { children: any }) {
  return <div>{children}</div>;
}
