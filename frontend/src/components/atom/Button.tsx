import React, { type FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { getButtonStyle } from '@/src/helpers/styleHelper'

interface ButtonProps {
    children: React.ReactNode
    color?: string
    size?: string
    fill?: boolean
    extraStyles?: object
    onPress: () => void
}

const Button: FC<ButtonProps> = ({
    children,
    color,
    size,
    fill,
    extraStyles,
    onPress
}) => {
    const { containerStyle } = getButtonStyle({ size, color, fill })
    const style = {
        ...containerStyle,
        ...extraStyles
    }
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

export default Button