/* @flow */

import DataSource from '../'
import immutable from 'immutable'

describe('Data Source', () => {
    it('is defined', () => {
        expect(DataSource).toBeDefined()
    })

    it('can be constructed', () => {
        expect(new DataSource()).toBeDefined()
    })

    let dataSource = null
    let items = null

    beforeEach(() => {
        items = immutable.fromJS([
            {name: 'Francis Bacon'},
            {name: 'René Descartes'},
            {name: 'John Locke'},
            {name: 'Baruch Spinoza'},
        ])
        dataSource = new DataSource()
        dataSource = dataSource.cloneWithRows(items)
    })

    it('implements cloneWithRows', () => {
        expect(dataSource.cloneWithRows(items)).toBeDefined()
    })

    it('throws cloneWithRowsAndSections', () => {
        expect(() => dataSource.cloneWithRowsAndSections()).toThrowError('cloneWithRowsAndSections not implemented')
    })

    it('implements getRowCount', () => {
        expect(dataSource.getRowCount()).toBe(4)
    })

    it('implements getRowAndSectionCount', () => {
        expect(dataSource.getRowAndSectionCount()).toBe(5)
    })

    it('implements rowShouldUpdate', () => {
        expect(dataSource.rowShouldUpdate(0, 0)).toBe(true)
        dataSource = dataSource.cloneWithRows(items)
        expect(dataSource.rowShouldUpdate(0, 0)).toBe(false)
    })

    it('implements getRowData', () => {
        items.forEach((item, i) => {
            expect(dataSource.getRowData(0, i)).toBe(item)
        })
    })

    it('implements getRowIDForFlatIndex', () => {
        expect(dataSource.getRowIDForFlatIndex(0)).toBe(0)
    })

    it('implements getSectionIDForFlatIndex', () => {
        expect(dataSource.getSectionIDForFlatIndex(0)).toBe('s1')
    })

    it('implements getSectionLengths', () => {
        expect(dataSource.getSectionLengths()).toEqual([4])
    })

    it('implements sectionHeaderShouldUpdate', () => {
        expect(dataSource.sectionHeaderShouldUpdate(0)).toBe(true)
        dataSource = dataSource.cloneWithRows(items)
        expect(dataSource.sectionHeaderShouldUpdate(0)).toBe(false)
    })

    it('implements getSectionHeaderData', () => {
        expect(dataSource.getSectionHeaderData(0)).toBe(items)
    })

    it('implements rowIdentities', () => {
        expect(dataSource.rowIdentities).toEqual([[0, 1, 2, 3]])
    })

    it('implements sectionIdentities', () => {
        expect(dataSource.sectionIdentities).toEqual(['s1'])
    })
})
