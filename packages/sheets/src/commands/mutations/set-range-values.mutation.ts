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

import type {
    CellValue,
    IBorderData,
    ICellData,
    ICopyToOptionsData,
    IDocumentData,
    IKeyValue,
    IMutation,
    IMutationCommonParams,
    IObjectMatrixPrimitiveType,
    IRange,
    IStyleData,
    ITextStyle,
    Nullable,
} from '@univerjs/core';
import { CellValueType, CommandType, IUniverInstanceService, ObjectMatrix, Tools } from '@univerjs/core';
import type { IAccessor } from '@wendellhu/redi';

/** Params of `SetRangeValuesMutation` */
export interface ISetRangeValuesMutationParams extends IMutationCommonParams {
    subUnitId: string;
    unitId: string;

    /**
     * null for clear all
     */
    cellValue?: IObjectMatrixPrimitiveType<Nullable<ICellData>>;

    /**
     * @deprecated not a good design
     */
    options?: ICopyToOptionsData;

    // /**
    //  * for formula calculate
    //  */
    // isFormulaUpdate?: boolean;
}

export interface ISetRangeValuesRangeMutationParams extends ISetRangeValuesMutationParams {
    range: IRange[];
}

/**
 * Generate undo mutation of a `SetRangeValuesMutation`
 *
 * @param {IAccessor} accessor - injector accessor
 * @param {ISetRangeValuesMutationParams} params - do mutation params
 * @returns {ISetRangeValuesMutationParams} undo mutation params
 */
export const SetRangeValuesUndoMutationFactory = (
    accessor: IAccessor,
    params: ISetRangeValuesMutationParams
): ISetRangeValuesMutationParams => {
    const { unitId, subUnitId, cellValue } = params;
    const univerInstanceService = accessor.get(IUniverInstanceService);
    const workbook = univerInstanceService.getUniverSheetInstance(unitId);

    if (workbook == null) {
        throw new Error('workbook is null error!');
    }

    const worksheet = workbook.getSheetBySheetId(subUnitId);
    if (worksheet == null) {
        throw new Error('worksheet is null error!');
    }

    const cellMatrix = worksheet.getCellMatrix();
    const styles = workbook.getStyles();
    const undoData = new ObjectMatrix<Nullable<ICellData>>();

    const newValues = new ObjectMatrix(cellValue);

    newValues.forValue((row, col, newVal) => {
        const cell = Tools.deepClone(cellMatrix?.getValue(row, col)) || {}; // clone cell data，prevent modify the original data
        const oldStyle = styles.getStyleByCell(cell);
        const newStyle = transformStyle(oldStyle, newVal && newVal.s ? (newVal.s as Nullable<IStyleData>) : null);

        cell.s = newStyle;

        undoData.setValue(row, col, setNull(cell));
    });

    return {
        ...params,
        options: {},
        cellValue: undoData.getMatrix(),
    } as ISetRangeValuesMutationParams;
};

/**
 * Supplement the data of the cell, set the other value to NULL, Used to reset properties when undoing
 * @param value
 * @returns
 */
function setNull(value: Nullable<ICellData>) {
    if (value == null) return null;

    if (value.f === undefined) {
        value.f = null;
    }

    if (value.si === undefined) {
        value.si = null;
    }

    if (value.p === undefined) {
        value.p = null;
    }

    if (value.v === undefined) {
        value.v = null;
    }

    if (value.t === undefined) {
        value.t = null;
    }

    if (value.s === undefined) {
        value.s = null;
    }

    return value;
}

export const SetRangeValuesMutation: IMutation<ISetRangeValuesMutationParams, boolean> = {
    id: 'sheet.mutation.set-range-values',
    type: CommandType.MUTATION,
    handler: (accessor, params) => {
        const { cellValue, subUnitId, unitId } = params;
        const univerInstanceService = accessor.get(IUniverInstanceService);
        const workbook = univerInstanceService.getUniverSheetInstance(unitId);
        if (!workbook) {
            return false;
        }

        const worksheet = workbook.getSheetBySheetId(subUnitId);
        if (!worksheet) {
            return false;
        }

        const cellMatrix = worksheet.getCellMatrix();
        const styles = workbook.getStyles();
        const newValues = new ObjectMatrix(cellValue);

        newValues.forValue((row, col, newVal) => {
            // clear all
            if (!newVal) {
                cellMatrix?.setValue(row, col, {});
            } else {
                const oldVal = cellMatrix.getValue(row, col) || {};

                const type =
                    newVal.t === CellValueType.FORCE_STRING
                        ? newVal.t
                        : checkCellValueType(newVal.v === undefined ? oldVal.v : newVal.v);

                if (newVal.f !== undefined) {
                    oldVal.f = newVal.f;
                }

                if (newVal.si !== undefined) {
                    oldVal.si = newVal.si;
                }

                if (newVal.p !== undefined) {
                    oldVal.p = newVal.p;
                }

                // Set to null, clear content
                if (newVal.v !== undefined) {
                    oldVal.v = type === CellValueType.NUMBER ? Number(newVal.v) : newVal.v;
                }

                if (oldVal.v !== undefined) {
                    oldVal.t = type;
                }

                // handle style
                if (newVal.s !== undefined) {
                    // use null to clear style
                    const oldStyle = styles.getStyleByCell(oldVal);

                    if (oldStyle == null) {
                        // clear
                        delete oldVal.s;
                    }

                    if (typeof newVal.s === 'string') {
                        newVal.s = styles.get(newVal.s);
                    }

                    // set style
                    const merge = mergeStyle(oldStyle, newVal.s ? (newVal.s as Nullable<IStyleData>) : null);

                    // then remove null
                    merge && Tools.removeNull(merge);

                    if (Tools.isEmptyObject(merge)) {
                        delete oldVal.s;
                    } else {
                        oldVal.s = styles.setValue(merge);
                    }

                    // Only need to copy newValue.s to oldValue.p when you modify the cell style, not when you modify the cell value.
                    if (!newVal.p && oldVal.p) {
                        mergeRichTextStyle(oldVal.p, newVal.s ? (newVal.s as Nullable<IStyleData>) : null);
                    }
                }

                cellMatrix.setValue(row, col, Tools.removeNull(oldVal));
            }
        });

        return true;
    },
};

function checkCellValueType(v: Nullable<CellValue>): Nullable<CellValueType> {
    if (v === null) return null;

    if (typeof v === 'string') {
        if (isSafeNumeric(v)) {
            return CellValueType.NUMBER;
        } else if (isBooleanString(v)) {
            return CellValueType.BOOLEAN;
        }
        return CellValueType.STRING;
    }
    if (typeof v === 'number') {
        return CellValueType.NUMBER;
    }
    if (typeof v === 'boolean') {
        return CellValueType.BOOLEAN;
    }
    return CellValueType.FORCE_STRING;
}

/**
 * Convert old style data for storage
 * @param style
 */
export function transformStyle(oldStyle: Nullable<IStyleData>, newStyle: Nullable<IStyleData>): Nullable<IStyleData> {
    const backupStyle = transformNormalKey(oldStyle, newStyle);
    return backupStyle;
}
/**
 * Convert old style normal key for storage
 *
 * @param style
 */
export function transformNormalKey(
    oldStyle: Nullable<IStyleData>,
    newStyle: Nullable<IStyleData>
): Nullable<IStyleData> {
    // If there is no newly set style, directly store the historical style
    if (!newStyle || !Object.keys(newStyle).length) {
        return oldStyle;
    }
    const backupStyle: { [key: string]: any } = oldStyle || {};

    for (const k in newStyle) {
        if (k === 'bd') {
            backupStyle[k] = transformBorders(backupStyle[k] || {}, newStyle[k]);
        }
        // 1. To modify the existing style,we need original setting to undo
        // 2. Newly set the style, we need null to undo
        else if (!(k in backupStyle)) {
            backupStyle[k] = null;
        }
    }
    return backupStyle;
}
/**
 * Convert old style border for storage
 *

 * @param style
 */
export function transformBorders(oldBorders: IBorderData, newBorders: Nullable<IBorderData>): IBorderData {
    // If there is no newly set border, directly store the historical border
    if (!newBorders || !Object.keys(newBorders).length) {
        return oldBorders;
    }

    for (const k in newBorders) {
        // 1. To modify the existing border,we need original setting to undo
        // 2. Newly set the border, we need null to undo
        if (!(k in oldBorders)) {
            (oldBorders as IKeyValue)[k] = null;
        }
    }

    return oldBorders;
}

/**
 * merge new style to old style
 *
 * @param oldStyle
 * @param newStyle
 */
export function mergeStyle(
    oldStyle: Nullable<IStyleData>,
    newStyle: Nullable<IStyleData>,
    isRichText: boolean = false
): Nullable<IStyleData> {
    // clear style
    if (newStyle === null) return newStyle;
    // don't operate
    if (newStyle === undefined) return oldStyle;

    const backupStyle: { [key: string]: any } = Tools.deepClone(oldStyle) || {};
    if (!backupStyle) return;
    for (const k in newStyle) {
        if (isRichText && ['bd', 'tr', 'td', 'ht', 'vt', 'tb', 'pd'].includes(k)) {
            continue;
        }
        // you can only choose one of the themeColor and rgbColor of the border setting
        if (k in backupStyle && k === 'bd') {
            backupStyle[k] = Object.assign(backupStyle[k], newStyle[k]);
        } else {
            backupStyle[k] = (newStyle as IKeyValue)[k];
        }
    }

    // Overline/Strikethrough/Underline color follows text color
    // if ('cl' in backupStyle) {
    //     for (const k in newStyle) {
    //         if (['ul', 'ol', 'st'].includes(k)) {
    //             backupStyle[k].cl = backupStyle.cl;
    //         }
    //     }
    // }

    if ('cl' in backupStyle) {
        if ('ul' in backupStyle && backupStyle.ul) {
            backupStyle.ul.cl = backupStyle.cl;
        }

        if ('ol' in backupStyle && backupStyle.ol) {
            backupStyle.ol.cl = backupStyle.cl;
        }

        if ('st' in backupStyle && backupStyle.st) {
            backupStyle.st.cl = backupStyle.cl;
        }
    }

    return backupStyle;
}

/**
 * Find the text style of all paragraphs and modify it to the new style
 * @param p
 * @param newStyle
 */
export function mergeRichTextStyle(p: IDocumentData, newStyle: Nullable<IStyleData>) {
    p.body?.textRuns?.forEach((textRun) => {
        if (!textRun.ts) {
            textRun.ts = {};
        }

        const oldStyle = textRun.ts || {};

        const merge = mergeStyle(oldStyle as Nullable<IStyleData>, newStyle, true);

        // then remove null
        merge && Tools.removeNull(merge);

        if (Tools.isEmptyObject(merge)) {
            delete textRun.ts;
        } else {
            textRun.ts = merge as ITextStyle;
        }
    });
}

function isNumeric(str: string) {
    return /^-?\d+(\.\d+)?$/.test(str);
}

function isSafeNumeric(str: string) {
    const numberic = isNumeric(str);
    if (!numberic) {
        return false;
    }

    return Number(str) <= Number.MAX_SAFE_INTEGER;
}

function isBooleanString(str: string) {
    return str.toUpperCase() === 'TRUE' || str.toUpperCase() === 'FALSE';
}
