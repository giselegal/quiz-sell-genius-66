// Redirect /result to /resultado
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/resultado',
      permanent: false,
    },
  };
}

export default function ResultPageRedirect() {
  return null;
}
