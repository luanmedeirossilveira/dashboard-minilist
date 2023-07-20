import { UserStatus } from '../../constants/Enums';
import { Info } from '../Info';
import { Movies } from '../Movies';
import { QuickNav } from '../QuickNav';
import { Restaurants } from '../Restaurants';
import { Tools } from '../Tools';
import { UserStatusButton } from '../UserStatusButton';
import { Weather } from '../Weather';

export const Menu: React.FC = () => {
  return (
    <div id="app-menu">
      <div id="app-menu-content-wrapper">
        <div id="app-menu-content">
          <div id="app-menu-content-header">
            <div className="app-menu-content-header-section">
              <Info />
            </div>
            <div className="app-menu-content-header-section">
              <UserStatusButton
                icon="fa-solid fa-arrow-right-from-arc"
                id="sign-out-button"
                userStatus={UserStatus.LoggedOut}
              />
            </div>
          </div>
          <QuickNav />
          <Weather />
          <Restaurants />
          <Tools />
          <Movies />
        </div>
      </div>
    </div>
  );
};
