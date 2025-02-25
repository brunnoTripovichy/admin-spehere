import Logo from '../components/Logo';

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card">
        <Logo />
        <h2>Sign-in</h2>
      </div>
    </div>
  );
};

export default Page;
