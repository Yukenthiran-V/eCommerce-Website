
import Cookies from 'js-cookie';

function Logout() {

  const handleLogout = () => {
    Cookies.remove("userData");
 window.location.href="/";

  };

  handleLogout();

  return (
    <></>
  );
}

export default Logout;