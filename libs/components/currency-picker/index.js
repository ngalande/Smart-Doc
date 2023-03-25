import React, { useEffect, useState } from 'react'
import { currencies } from './currencies'
import { IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


export function getSelectedCurrency(index) {
    return currencies[index.row]

}

export function findIndexOfCurrency({ currencyCode }) {

    if (!currencyCode) return


    /**
     * 
     * @param {Array} arr the array
     * @param {int} start the starting index of the new array
     * @param {int} end the last index of the new array
     * @returns 
     */
    const search = ({ start, end }) => {

        if (start > end) return

        //get midpoint index
        const midpoint = parseInt((start + end) / 2)

        //found the item
        if (currencies[midpoint].cc === currencyCode) return midpoint

        const order = currencyCode.localeCompare(currencies[midpoint].cc)

        if (order === -1) {
            return search({ start, end: midpoint - 1 })
        } else {
            return search({ start: midpoint + 1, end })
        }
    }

    const index = search({ start: 0, end: currencies.length - 1 })

    if (!index) return 0

    const indexPath = new IndexPath(index)
    return indexPath
}

export function getInitialCurrencyIndex() {
    return findIndexOfCurrency({
        currencyCode: 'ZMK'
    })



}


function CurrencyPicker({ style, selectedCurrencyIndex, setSelectedCurrencyIndex }) {

    const [displayValue, setDisplayValue] = useState()

    useEffect(() => {
        const getDisplayValue = () => {
            if (selectedCurrencyIndex === null){
              return 'Select a Currency'
            } 
            const { name, cc } = currencies[selectedCurrencyIndex.row]
            return `${name} - ${cc}`
        }

        setDisplayValue(getDisplayValue())

    }, [selectedCurrencyIndex])

    return (
        <Layout style={style} level='1'>

            <Select
                label='Currency'
                value={displayValue}
                selectedIndex={new IndexPath(selectedCurrencyIndex)}
                onSelect={index => setSelectedCurrencyIndex(index)}>
                {currencies.map(({ cc, name }, index) => {
                    return < SelectItem
                        key={index}
                        title={`${name} - ${cc}`
                        } />
                })}
            </Select>

        </Layout >


    )
}


export default CurrencyPicker

