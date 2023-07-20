interface IPosition {
  left: number;
  x: number;
}

interface INumberUtility {
  clamp: (min: number, value: number, max: number) => number;
  rand: (min: number, max: number) => number;
}

interface ITimeUtility {
  format: (date: Date) => string;
  formatHours: (hours: number) => string | number;
  formatSegment: (segment: number) => string | number;
}

interface ILogInUtility {
  verify: (pin: string) => Promise<boolean>;
}

interface IScrollableComponentState {
  grabbing: boolean;
  position: IPosition;
}

interface IScrollableComponentProps {
  children: any;
  className?: string;
  id?: string;
}

interface IInfoProps {
  id?: string;
}

interface IPinDigitProps {
  focused: boolean;
  value: string;
}

interface IMenuSectionProps {
  children: any;
  icon: string;
  id: string;
  scrollable?: boolean;
  title: string;
}

interface IUserStatusButton {
  icon: string;
  id: string;
  userStatus: UserStatus;
}

interface IAppContext {
  userStatus: UserStatus;
  setUserStatusTo: (status: UserStatus) => void;
}
