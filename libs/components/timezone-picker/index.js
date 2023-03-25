import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import spacetime from 'spacetime'
import soft from 'timezone-soft'
import timezones from './timezones'
import * as Localization from 'expo-localization'

export const getDefaultTimezoneIndex = () => {
    const deviceTZ = Localization.timezone
    return findIndexOfTimezone(deviceTZ)
}

export function findIndexOfTimezone(timezone) {
    const parsedTimezone = parseTimezone(timezone)
    const options = getOptions()

    let finalIndex
    options.forEach(({ value }, index) => {
        if (value === parsedTimezone.value) finalIndex = index
    })

    return new IndexPath(finalIndex)
}




export const getSelectedTimezone = ({ selectedIndex }) => {
    const options = getOptions()
    return options[selectedIndex.row].value
}

const findFuzzyTz = (zone) => {
    let currentTime = spacetime.now('GMT')
    try {
        currentTime = spacetime.now(zone)
    } catch (err) {
        return
    }
    return getOptions().filter(
        (tz) =>
            tz.offset === currentTime.timezone().current.offset
    )
        .map((tz) => {
            let score = 0
            if (
                currentTime.timezones[tz.value.toLowerCase()] &&
                !!currentTime.timezones[tz.value.toLowerCase()].dst ===
                currentTime.timezone().hasDst
            ) {
                if (
                    tz.value
                        .toLowerCase()
                        .indexOf(
                            currentTime.tz.substr(currentTime.tz.indexOf('/') + 1)
                        ) !== -1
                ) {
                    score += 8
                }
                if (
                    tz.label
                        .toLowerCase()
                        .indexOf(
                            currentTime.tz.substr(currentTime.tz.indexOf('/') + 1)
                        ) !== -1
                ) {
                    score += 4
                }
                if (
                    tz.value
                        .toLowerCase()
                        .indexOf(currentTime.tz.substr(0, currentTime.tz.indexOf('/')))
                ) {
                    score += 2
                }
                score += 1
            } else if (tz.value === 'GMT') {
                score += 1
            }
            return { tz, score }
        })
        .sort((a, b) => b.score - a.score)
        .map(({ tz }) => tz)[0]
}

const parseTimezone = (zone) => {
    if (typeof zone === 'object' && zone.value && zone.label) return zone
    if (typeof zone === 'string') {
        return (
            getOptions().find(tz => tz.value === zone) ||
            (zone.indexOf('/') !== -1 && findFuzzyTz(zone))
        )
    } else if (zone.value && !zone.label) {
        return getOptions().find(tz => tz.value === zone.value)
    }
}



const getOptions = (labelStyle) => {
    return Object.entries(timezones).map(zone => {
        const now = spacetime.now(zone[0])
        const tz = now.timezone()
        const tzStrings = soft(zone[0])


        let label = ''
        let abbr = now.isDST()
            ? // @ts-expect-error
            tzStrings[0].daylight?.abbr
            : // @ts-expect-error
            tzStrings[0].standard?.abbr
        let altName = now.isDST()
            ? tzStrings[0].daylight?.name
            : tzStrings[0].standard?.name

        const min = tz.current.offset * 60
        const hr =
            `${(min / 60) ^ 0}:` + (min % 60 === 0 ? '00' : Math.abs(min % 60))
        const prefix = `(GMT${hr.includes('-') ? hr : `+${hr}`}) ${zone[1]}`

        switch (labelStyle) {
            case 'original':
                label = prefix
                break
            case 'altName':
                label = `${prefix} ${altName?.length ? `(${altName})` : ''}`
                break
            case 'abbrev':
                label = `${prefix} ${abbr?.length < 5 ? `(${abbr})` : ''}`
                break
            default:
                label = `${prefix}`
        }

        return {
            value: tz.name,
            label: label,
            offset: tz.current.offset,
            abbrev: abbr,
            altName: altName,
        }

    }).sort((a, b) => a.offset - b.offset)
}


/**
 * 
 * @param {String} labelStyle - altName , original , abbrev 
 * @returns 
 */
function TimezonePicker({ style, labelStyle, selectedTimezoneIndex, setSelectedTimezoneIndex }) {

    const [timezoneOptions] = useState(getOptions(labelStyle))
    const [displayValue, setDisplayValue] = useState()

    useEffect(() => {
        const getDisplayValue = () => {
            if (!selectedTimezoneIndex) return
            return timezoneOptions[selectedTimezoneIndex.row].label
        }

        setDisplayValue(getDisplayValue())

    }, [selectedTimezoneIndex])


    return (
        <Layout style={style} level='1'>

            <Select

                label='Timezone'
                value={displayValue}
                selectedIndex={selectedTimezoneIndex}
                onSelect={index => setSelectedTimezoneIndex(index)}>
                {timezoneOptions.map(({ label }, index) => {
                    return <SelectItem
                        key={index}
                        title={label} />
                })}
            </Select>

        </Layout>
    )
}


export default TimezonePicker

