import React, { useState } from 'react'
import { IndexPath, Select as Component, SelectItem } from '@ui-kitten/components'

const Select = ({ ref, style, initialSelectedIndex = 0, onSelect, value, options, label }) => {

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(initialSelectedIndex))


    return (
        <Component
        
            ref={ref}
            style={style}
            selectedIndex={selectedIndex}
            label={label}
            value={value}
            onSelect={index => {
                setSelectedIndex(index)
                onSelect(options[index.row])
            }}
        >
            {options.map((value, index) => (
                <SelectItem
                    key={index}
                    title={value}
                />
            ))}

        </Component>
    )
}

export default Select