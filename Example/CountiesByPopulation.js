/* @flow */

import immutable from 'immutable'
import ImmutableDataSource from 'react-native-immutable-listview-datasource'

import {
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import React, {Component} from 'react'

const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgb(39, 174, 96)',
    },
    row: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
})

const Title = ({children}) => (
    <Text style={styles.title}>{children}</Text>
)

const Row = ({name, population}) => (
    <View style={styles.row}>
        <Title>{name}</Title>
        <Title>{population}</Title>
    </View>
)

const renderRow = (rowData) => (
    <Row
        name={rowData.get('name')}
        population={rowData.get('population')}
    />
)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default class CountiesByPopulation extends Component {
    constructor() {
        super()

        this.state = {
            dataSource: new ImmutableDataSource(),
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        })
    }

    async componentDidMount() {
        let countries = immutable.fromJS([
            {name: 'China', population: '1,393,783,836'},
            {name: 'India', population: '1,267,401,849'},
            {name: 'U.S.A.', population: '322,583,006'},
            {name: 'Indonesia', population: '252,812,245'},
            {name: 'Brazil', population: '202,033,670'},
        ])

        await sleep(2000)

        await this.setStateAsync({
            dataSource: this.state.dataSource.cloneWithRows(countries),
        })

        await sleep(2000)

        await this.setStateAsync({
            dataSource: this.state.dataSource.cloneWithRows(countries.reverse()),
        })

        await sleep(2000)

        countries = countries.push(immutable.fromJS({name: 'Japan', population: '12345656778'}))

        await this.setStateAsync({
            dataSource: this.state.dataSource.cloneWithRows(countries),
        })

        await sleep(2000)

        await this.setStateAsync({
            dataSource: this.state.dataSource.cloneWithRows(countries.take(2)),
        })
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={renderRow}
                style={styles.list}
            />
        )
    }
}
