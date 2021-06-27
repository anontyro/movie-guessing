import MainLayout from '../../components/_layout/MainLayout';
import { useUser } from '../../context/user-context';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useUser();
  return (
    <MainLayout>
      <h1>home</h1>
      <p>Current user {currentUser.apiToken}</p>
      <button onClick={() => setCurrentUser({ apiToken: 'test' })}>
        Click
      </button>
    </MainLayout>
  );
};

export default HomePage;
