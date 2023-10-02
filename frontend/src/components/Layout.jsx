import React, { useState } from 'react';
import IconSync from './icons/IconSync.jsx';
import IconLogout from './icons/IconLogout.jsx';
import PropTypes from 'prop-types';
import Toast from './Toast';

const Layout = ({
  children,
  showMenu = false,
  disconnectUser,
  refresh,
  isLoading,
  title,
  toastNotification,
  setToastNotification,
}) => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleRefresh = (e) => {
    e.preventDefault();
    refresh();
  };

  const handleDisconnect = (e) => {
    e.preventDefault();
    setIsDisconnecting(true);
    setTimeout(() => {
      disconnectUser();
      setIsDisconnecting(false);
    }, 1500);
  };

  const main_title = 'Emailer'

  return (
    <div className="layout">
      <div className="title-menu">
        <h1>{main_title}</h1>

        <Toast
          toastNotification={toastNotification}
          setToastNotification={setToastNotification}
        />
        {showMenu && (
          <div className="menu">
            <button
              onClick={handleRefresh}
              disabled={isLoading || isDisconnecting || toastNotification}
            >
              <div className={`menu-icon ${isLoading ? 'syncing' : ''}`}>
                <IconSync />
              </div>
              <span className="hidden-mobile">
                {isLoading ? 'Refreshing' : 'Refresh emails'}
              </span>
            </button>
            <div className="hidden-mobile">·</div>
            <button
              onClick={handleDisconnect}
              disabled={isLoading || isDisconnecting || toastNotification}
            >
              <div className="menu-icon">
                <IconLogout />
              </div>
              <span className="hidden-mobile">
                {isDisconnecting ? 'Logging Out...' : 'Logout'}
              </span>
            </button>
          </div>
        )}
      </div>
      <main>{children}</main>
      
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  showMenu: PropTypes.bool.isRequired,
  disconnectUser: PropTypes.func,
  refresh: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  toastNotification: PropTypes.string,
  setToastNotification: PropTypes.func.isRequired,
};

export default Layout;
