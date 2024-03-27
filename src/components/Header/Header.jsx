const Header = ({ title }) => {
  return (
    <header className="w-full bg-lime-500 p-4 flex justify-between items-center">
      <h1 className="text-2xl">{title}</h1>
    </header>
  );
};

export default Header;
