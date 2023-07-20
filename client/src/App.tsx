/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import classNames from 'classnames';
import * as React from 'react';

import { Menu } from './shared/components/Menu';
import { UserStatusButton } from './shared/components/UserStatusButton';
import { Default, UserStatus } from './shared/constants/Enums';
import { AppContext } from './shared/contexts/AppContext';
import { N } from './shared/utils/Math';

const LogInUtility: ILogInUtility = {
  verify: async (pin: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pin === Default.PIN) {
          resolve(true);
        } else {
          reject(`Invalid pin: ${pin}`);
        }
      }, N.rand(300, 700));
    });
  },
};

const PinDigit: React.FC<IPinDigitProps> = (props: IPinDigitProps) => {
  const [hidden, setHiddenTo] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.value) {
      const timeout: any = setTimeout(() => {
        setHiddenTo(true);
      }, 500);

      return () => {
        setHiddenTo(false);

        clearTimeout(timeout);
      };
    }
  }, [props.value]);

  return (
    <div className={classNames('app-pin-digit', { focused: props.focused, hidden })}>
      <span className="app-pin-digit-value">{props.value || ''}</span>
    </div>
  );
};

const Pin: React.FC = () => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);

  const [pin, setPinTo] = React.useState<string>('');

  const ref: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (userStatus === UserStatus.LoggingIn || userStatus === UserStatus.LogInError) {
      if (ref.current) ref.current.focus();
    } else {
      setPinTo('');
    }
  }, [userStatus]);

  React.useEffect(() => {
    if (pin.length === 4) {
      const verify = async (): Promise<void> => {
        try {
          setUserStatusTo(UserStatus.VerifyingLogIn);

          if (await LogInUtility.verify(pin)) {
            setUserStatusTo(UserStatus.LoggedIn);
          }
        } catch (err) {
          console.error(err);

          setUserStatusTo(UserStatus.LogInError);
        }
      };

      verify();
    }

    if (userStatus === UserStatus.LogInError) {
      setUserStatusTo(UserStatus.LoggingIn);
    }
  }, [pin]);

  const handleOnClick = (): void => {
    if (ref.current) ref.current.focus();
  };

  const handleOnCancel = (): void => {
    setUserStatusTo(UserStatus.LoggedOut);
  };

  const handleOnChange = (e: any): void => {
    if (e.target.value.length <= 4) {
      setPinTo(e.target.value.toString());
    }
  };

  const getCancelText = (): JSX.Element => {
    return (
      <span id="app-pin-cancel-text" onClick={handleOnCancel}>
        Cancel
      </span>
    );
  };

  const getErrorText = (): JSX.Element => {
    if (userStatus === UserStatus.LogInError) {
      return <span id="app-pin-error-text">Invalid</span>;
    }

    return <span>/</span>;
  };

  return (
    <div id="app-pin-wrapper">
      <input
        disabled={
          userStatus !== UserStatus.LoggingIn && userStatus !== UserStatus.LogInError
        }
        id="app-pin-hidden-input"
        maxLength={4}
        ref={ref}
        type="number"
        value={pin}
        onChange={handleOnChange}
      />
      <div id="app-pin" onClick={handleOnClick}>
        <PinDigit focused={pin.length === 0} value={pin[0]} />
        <PinDigit focused={pin.length === 1} value={pin[1]} />
        <PinDigit focused={pin.length === 2} value={pin[2]} />
        <PinDigit focused={pin.length === 3} value={pin[3]} />
      </div>
      <h3 id="app-pin-label">
        Enter PIN (1234) {getErrorText()} {getCancelText()}
      </h3>
    </div>
  );
};

const Background: React.FC = () => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);

  const handleOnClick = (): void => {
    if (userStatus === UserStatus.LoggedOut) {
      setUserStatusTo(UserStatus.LoggingIn);
    }
  };

  return (
    <div id="app-background" onClick={handleOnClick}>
      <div id="app-background-image" className="background-image" />
    </div>
  );
};

const Loading: React.FC = () => {
  return (
    <div id="app-loading-icon">
      <i className="fa-solid fa-spinner-third" />
    </div>
  );
};

export const App: React.FC = () => {
  const [userStatus, setUserStatusTo] = React.useState<UserStatus>(UserStatus.LoggingIn);

  const getStatusClass = (): string => {
    return userStatus.replace(/\s+/g, '-').toLowerCase();
  };

  return (
    <AppContext.Provider value={{ userStatus, setUserStatusTo }}>
      <div id="app" className={getStatusClass()}>
        <Pin />
        <Menu />
        <Background />
        <div id="sign-in-button-wrapper">
          <UserStatusButton
            icon="fa-solid fa-arrow-right-to-arc"
            id="sign-in-button"
            userStatus={UserStatus.LoggingIn}
          />
        </div>
        <Loading />
      </div>
    </AppContext.Provider>
  );
};
