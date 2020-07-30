import * as React from 'react'
import { CustomFlagIconFactory } from 'react-flag-icon-css'
import { styles, codes } from './index'

const options = { useCssModules: false, customCodes: codes, themeStyles: styles }
const FlagIcon = CustomFlagIconFactory(React, options)

export default FlagIcon;