import * as React from 'react';

import { UserStatus } from '../constants/Enums';

export const AppContext = React.createContext<any>(UserStatus.LoggedOut);
