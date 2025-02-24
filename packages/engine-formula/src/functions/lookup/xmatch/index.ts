/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Nullable } from '@univerjs/core';

import { ErrorType } from '../../../basics/error-type';
import { ArrayBinarySearchType, ArrayOrderSearchType } from '../../../engine/utils/compare';
import type { ArrayValueObject } from '../../../engine/value-object/array-value-object';
import type { BaseValueObject } from '../../../engine/value-object/base-value-object';
import { ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { NumberValueObject } from '../../../engine/value-object/primitive-object';
import { BaseFunction } from '../../base-function';
import { compareToken } from '../../../basics/token';

export class Xmatch extends BaseFunction {
    override calculate(
        lookupValue: BaseValueObject,
        lookupArray: ArrayValueObject,
        matchMode?: BaseValueObject,
        searchMode?: BaseValueObject
    ) {
        if (lookupValue == null || lookupArray == null) {
            return new ErrorValueObject(ErrorType.NA);
        }

        if (lookupValue.isError()) {
            return lookupValue;
        }

        if (lookupArray.isError()) {
            return new ErrorValueObject(ErrorType.REF);
        }

        if (!lookupArray.isArray()) {
            return new ErrorValueObject(ErrorType.VALUE);
        }

        const rowCountLookup = lookupArray.getRowCount();

        const columnCountLookup = lookupArray.getColumnCount();

        if (rowCountLookup !== 1 && columnCountLookup !== 1) {
            return new ErrorValueObject(ErrorType.VALUE);
        }

        if (matchMode?.isError()) {
            return new ErrorValueObject(ErrorType.NA);
        }

        if (searchMode?.isError()) {
            return new ErrorValueObject(ErrorType.NA);
        }

        const matchModeValue = this.getIndexNumValue(matchMode || new NumberValueObject(0));

        if (matchModeValue instanceof ErrorValueObject) {
            return matchModeValue;
        }

        const searchModeValue = this.getIndexNumValue(searchMode || new NumberValueObject(1));

        if (searchModeValue instanceof ErrorValueObject) {
            return searchModeValue;
        }

        if (lookupValue.isArray()) {
            return lookupValue.map((value) => {
                const result = this._handleSingleObject(
                    value,
                    lookupArray,
                    matchModeValue,
                    searchModeValue
                );

                return result;
            });
        }

        return this._handleSingleObject(
            lookupValue,
            lookupArray,
            matchModeValue,
            searchModeValue
        ); ;
    }

    private _handleSingleObject(
        value: BaseValueObject,
        searchArray: ArrayValueObject,
        matchModeValue: number,
        searchModeValue: number
    ) {
        let rowOrColumn: Nullable<number>;
        if ((searchModeValue === 2 || searchModeValue === -2) && matchModeValue !== 2) {
            const searchType = this._getSearchModeValue(searchModeValue);
            rowOrColumn = searchArray.binarySearch(value, searchType);
        } else if (matchModeValue === 2) {
            const matchObject = searchArray.compare(value, compareToken.EQUALS) as ArrayValueObject;

            let position: Nullable<{ row: number; column: number }>;

            if (searchModeValue !== -1) {
                position = matchObject.getFirstTruePosition();
            } else {
                position = matchObject.getLastTruePosition();
            }
            if (position == null) {
                return new ErrorValueObject(ErrorType.NA);
            }

            rowOrColumn = searchArray.getRowCount() === 1 ? position.column : position.row;
        } else if (matchModeValue === -1 || matchModeValue === 1) {
            const position = searchArray.orderSearch(value, matchModeValue === 1 ? ArrayOrderSearchType.MAX : ArrayOrderSearchType.MIN, searchModeValue === -1);

            if (position == null) {
                return new ErrorValueObject(ErrorType.NA);
            }

            if (position instanceof ErrorValueObject) {
                return position;
            }

            rowOrColumn = searchArray.getRowCount() === 1 ? position.column : position.row;
        } else {
            const matchObject = searchArray.isEqual(value) as ArrayValueObject;

            let position: Nullable<{ row: number; column: number }>;

            if (searchModeValue !== -1) {
                position = matchObject.getFirstTruePosition();
            } else {
                position = matchObject.getLastTruePosition();
            }

            if (position == null) {
                return new ErrorValueObject(ErrorType.NA);
            }

            rowOrColumn = searchArray.getRowCount() === 1 ? position.column : position.row;
        }

        if (rowOrColumn == null) {
            return new ErrorValueObject(ErrorType.NA);
        }

        return new NumberValueObject(rowOrColumn + 1);
    }

    private _getSearchModeValue(searchModeValue: number) {
        return searchModeValue === -2 ? ArrayBinarySearchType.MAX : ArrayBinarySearchType.MIN;
    }
}
