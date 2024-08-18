
import MainNav from "../../components/MainNav";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <MainNav />
      <main className="mt-0" >{children}</main>
    </div>
  );
};

export default Layout;
