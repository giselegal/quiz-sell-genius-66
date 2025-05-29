export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/resultado',
      permanent: false,
    },
  };
}

export default function ResultPage() {
  return null;
}