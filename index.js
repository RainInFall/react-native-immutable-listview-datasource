/* @flow */

import {ListView} from 'react-native'

const getIdentitiesFromList = (list) => list.keySeq().toArray()
const rowHasChanged = (r1, r2) => r1 !== r2
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[sectionID].get(rowID)

export default class ImmutableDataSource {
    constructor(ds) {
        if (ds) {
            this.ds = ds
        } else {
            this.ds = new ListView.DataSource({
                rowHasChanged,
                getRowData,
            })
        }
    }

    get rowIdentities() {
        return this.ds.rowIdentities
    }

    get sectionIdentities() {
        return this.ds.sectionIdentities
    }

    cloneWithRows(rows) {
        return new this.constructor(this.ds.cloneWithRows(rows, getIdentitiesFromList(rows)))
    }

    cloneWithRowsAndSections() {
        throw new Error('cloneWithRowsAndSections not implemented')
    }

    getRowCount() {
        return this.ds.getRowCount()
    }

    getRowAndSectionCount() {
        return this.ds.getRowAndSectionCount()
    }

    rowShouldUpdate(sectionIdx, rowIdx) {
        return this.ds.rowShouldUpdate(sectionIdx, rowIdx)
    }

    getRowData(sectionIdx, rowIdx) {
        return this.ds.getRowData(sectionIdx, rowIdx)
    }

    getRowIDForFlatIndex(index) {
        return this.ds.getRowIDForFlatIndex(index)
    }

    getSectionIDForFlatIndex(index) {
        return this.ds.getSectionIDForFlatIndex(index)
    }

    getSectionLengths() {
        return this.ds.getSectionLengths()
    }

    sectionHeaderShouldUpdate(sectionIndex) {
        return this.ds.sectionHeaderShouldUpdate(sectionIndex)
    }

    getSectionHeaderData(sectionIndex) {
        return this.ds.getSectionHeaderData(sectionIndex)
    }
}
