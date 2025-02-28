function NavabarLogo() {
  return (
    <div className="text-center mt-3">
      <a className="navbar-brand fs-3" href="/">
        <img
          src={require('../assets/images/ukcart.png')}
          alt="uk logo"
          style={{ height: '70px', width: '200px' }}
        />
      </a>
    </div>
  );
}
export default NavabarLogo;
