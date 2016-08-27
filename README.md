# React Native Immutable ListView DataSource
[![Build Status](https://img.shields.io/travis/DaleJefferson/React-Native-Immutable-ListView-DataSource.svg?maxAge=3600)](https://travis-ci.org/DaleJefferson/React-Native-Immutable-ListView-DataSource)
[![Downloads per Month](https://img.shields.io/npm/dm/react-native-immutable-listview-datasource.svg?maxAge=86400)](https://www.npmjs.com/package/react-native-immutable-listview-datasource)
[![Version](https://img.shields.io/npm/v/react-native-immutable-listview-datasource.svg?maxAge=3600)](https://www.npmjs.com/package/react-native-immutable-listview-datasource)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=86400)]()

## Why

If you are using ImmutableJS in your app and don't want to convert back toJS.

## Install
```
npm install --save react-native-immutable-listview-datasource
```

## Usage

```js
const ds = new ImmutableDataSource()

this.state = {
    dataSource: ds.cloneWithRows(rows)
}
```

## Full example

```js
/* @flow */

import React, {Component} from 'react'

import {
    AppRegistry,
    StyleSheet,
    ListView,
    Text,
    View
} from 'react-native'

import immutable from 'immutable'

import ImmutableDataSource from 'react-native-immutable-listview-datasource'

const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgb(39, 174, 96)'
    },
    row: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: 'white'
    }
})

const countries = immutable.fromJS([
    {name: 'China', population: '1,393,783,836'},
    {name: 'India', population: '1,267,401,849'},
    {name: 'U.S.A.', population: '322,583,006'},
    {name: 'Indonesia', population: '252,812,245'},
    {name: 'Brazil', population: '202,033,670'}
])

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
    <Row name={rowData.get('name')}
        population={rowData.get('population')} />
)

export default class CountiesByPopulation extends Component {
    constructor() {
        super()

        const ds = new ImmutableDataSource()

        this.state = {
            dataSource: ds.cloneWithRows(countries)
        }
    }

    componentDidMount() {
      setTimeout(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(countries.pop())
          })
      }, 3000)
    }

    render() {
        return (
            <ListView style={styles.list}
                dataSource={this.state.dataSource}
                renderRow={renderRow} />
        )
    }
}
```

Read my article about this package https://medium.com/@dalejefferson/react-native-immutablejs-listview-datasource-part-2-cf072df71c8#.ak3wgcnp6
