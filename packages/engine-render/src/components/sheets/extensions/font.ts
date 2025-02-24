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

import type { IColorStyle, IRange, IScale } from '@univerjs/core';
import { HorizontalAlign, ObjectMatrix, WrapStrategy } from '@univerjs/core';

import type { UniverRenderingContext } from '../../../context';
import type { Documents } from '../../docs/document';
import { SpreadsheetExtensionRegistry } from '../../extension';
import type { IFontCacheItem } from '../interfaces';
import type { SheetComponent } from '../sheet-component';
import { getDocsSkeletonPageSize, type SpreadsheetSkeleton } from '../sheet-skeleton';
import type { Spreadsheet } from '../spreadsheet';
import { SheetExtension } from './sheet-extension';

const UNIQUE_KEY = 'DefaultFontExtension';

const EXTENSION_Z_INDEX = 30;

export class Font extends SheetExtension {
    override uKey = UNIQUE_KEY;

    override Z_INDEX = EXTENSION_Z_INDEX;

    changeFontColor: ObjectMatrix<IColorStyle> = new ObjectMatrix();

    get spreadsheet() {
        return this.parent as Spreadsheet;
    }

    getDocuments() {
        const parent = this.parent as SheetComponent;
        return parent?.getDocuments();
    }

    setChangeFontColor(r: number, c: number, color: IColorStyle) {
        this.changeFontColor.setValue(r, c, color);
    }

    override draw(
        ctx: UniverRenderingContext,
        parentScale: IScale,
        spreadsheetSkeleton: SpreadsheetSkeleton,
        diffRanges?: IRange[]
    ) {
        const { stylesCache, dataMergeCache, overflowCache } = spreadsheetSkeleton;
        const { font: fontList } = stylesCache;
        if (!spreadsheetSkeleton) {
            return;
        }

        const { rowHeightAccumulation, columnTotalWidth, columnWidthAccumulation, rowTotalHeight } =
            spreadsheetSkeleton;

        if (
            !rowHeightAccumulation ||
            !columnWidthAccumulation ||
            columnTotalWidth === undefined ||
            rowTotalHeight === undefined
        ) {
            return;
        }
        ctx.save();

        const scale = this._getScale(parentScale);

        fontList &&
            Object.keys(fontList).forEach((fontFormat: string) => {
                const fontObjectArray = fontList[fontFormat];

                fontObjectArray.forValue((rowIndex, columnIndex, docsConfig) => {
                    const cellInfo = this.getCellIndex(
                        rowIndex,
                        columnIndex,
                        rowHeightAccumulation,
                        columnWidthAccumulation,
                        dataMergeCache
                    );
                    let { startY, endY, startX, endX } = cellInfo;
                    const { isMerged, isMergedMainCell, mergeInfo } = cellInfo;

                    if (isMerged) {
                        return true;
                    }

                    if (isMergedMainCell) {
                        startY = mergeInfo.startY;
                        endY = mergeInfo.endY;
                        startX = mergeInfo.startX;
                        endX = mergeInfo.endX;
                    }

                    /**
                     * Incremental content rendering for texture mapping
                     */
                    if (!this.isRenderDiffRangesByRow(mergeInfo.startRow, mergeInfo.endRow, diffRanges)) {
                        return true;
                    }

                    /**
                     * Overflow can cause text truncation, so columns are not rendered incrementally.
                     */
                    // if (
                    //     !this.isRenderDiffRangesByColumn(mergeInfo.startColumn, diffRanges) &&
                    //     !this.isRenderDiffRangesByColumn(mergeInfo.endColumn, diffRanges)
                    // ) {
                    //     return true;
                    // }

                    const cellWidth = endX - startX;
                    const cellHeight = endY - startY;

                    const overflowRectangle = overflowCache.getValue(rowIndex, columnIndex);
                    const { horizontalAlign } = docsConfig;

                    ctx.save();
                    ctx.beginPath();
                    if (overflowRectangle) {
                        const { startColumn, startRow, endColumn, endRow } = overflowRectangle;
                        if (startColumn === endColumn && startColumn === columnIndex) {
                            ctx.rect(
                                startX + 1 / scale,
                                startY + 1 / scale,
                                cellWidth - 2 / scale,
                                cellHeight - 2 / scale
                            );
                            ctx.clip();
                            ctx.clearRectForTexture(
                                startX + 1 / scale,
                                startY + 1 / scale,
                                cellWidth - 2 / scale,
                                cellHeight - 2 / scale
                            );
                        } else {
                            if (horizontalAlign === HorizontalAlign.CENTER) {
                                this._clipRectangle(
                                    ctx,
                                    startRow,
                                    endRow,
                                    startColumn,
                                    endColumn,
                                    scale,
                                    rowHeightAccumulation,
                                    columnWidthAccumulation
                                );
                            } else if (horizontalAlign === HorizontalAlign.RIGHT) {
                                this._clipRectangle(
                                    ctx,
                                    startRow,
                                    rowIndex,
                                    startColumn,
                                    columnIndex,
                                    scale,
                                    rowHeightAccumulation,
                                    columnWidthAccumulation
                                );
                            } else {
                                this._clipRectangle(
                                    ctx,
                                    rowIndex,
                                    endRow,
                                    columnIndex,
                                    endColumn,
                                    scale,
                                    rowHeightAccumulation,
                                    columnWidthAccumulation
                                );
                            }
                        }
                    } else {
                        ctx.rect(startX + 1 / scale, startY + 1 / scale, cellWidth - 2 / scale, cellHeight - 2 / scale);
                        ctx.clip();
                        ctx.clearRectForTexture(
                            startX + 1 / scale,
                            startY + 1 / scale,
                            cellWidth - 2 / scale,
                            cellHeight - 2 / scale
                        );
                    }

                    ctx.translate(startX, startY);
                    this._renderDocuments(ctx, docsConfig, startX, startY, endX, endY, rowIndex, columnIndex);
                    ctx.restore();
                });
            });
        ctx.restore();
    }

    private _renderDocuments(
        ctx: UniverRenderingContext,
        docsConfig: IFontCacheItem,
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        row: number,
        column: number
    ) {
        const documents = this.getDocuments() as Documents;

        if (documents == null) {
            throw new Error('documents is null');
        }

        const { documentSkeleton, angle, wrapStrategy } = docsConfig;
        const cellWidth = endX - startX;
        const cellHeight = endY - startY;

        if (wrapStrategy === WrapStrategy.WRAP && angle === 0) {
            documentSkeleton.getViewModel().getDataModel().updateDocumentDataPageSize(cellWidth);
            documentSkeleton.calculate();
        } else {
            documentSkeleton.getViewModel().getDataModel().updateDocumentDataPageSize(Number.POSITIVE_INFINITY);
        }

        // Use fix https://github.com/dream-num/univer/issues/927, Set the actual width of the content to the page width of the document,
        // so that the divide will be aligned when the skeleton is calculated.
        if (wrapStrategy !== WrapStrategy.WRAP) {
            const contentSize = getDocsSkeletonPageSize(documentSkeleton);
            const documentStyle = documentSkeleton.getViewModel().getDataModel().getSnapshot().documentStyle;
            if (contentSize && documentStyle) {
                const { width } = contentSize;
                const { marginRight = 0, marginLeft = 0 } = documentStyle;

                documentSkeleton
                    .getViewModel()
                    .getDataModel()
                    .updateDocumentDataPageSize(width + marginLeft + marginRight);
                documentSkeleton.calculate();
            }
        }

        documentSkeleton.makeDirty(false);

        documents.resize(cellWidth, cellHeight);

        documents.changeSkeleton(documentSkeleton).render(ctx);
    }

    private _clipRectangle(
        ctx: UniverRenderingContext,
        startRow: number,
        endRow: number,
        startColumn: number,
        endColumn: number,
        scale: number,
        rowHeightAccumulation: number[],
        columnWidthAccumulation: number[]
    ) {
        const startY = rowHeightAccumulation[startRow - 1] || 0;
        const endY = rowHeightAccumulation[endRow] || rowHeightAccumulation[rowHeightAccumulation.length - 1];

        const startX = columnWidthAccumulation[startColumn - 1] || 0;
        const endX = columnWidthAccumulation[endColumn] || columnWidthAccumulation[columnWidthAccumulation.length - 1];

        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.clip();
        ctx.clearRectForTexture(startX, startY, endX - startX, endY - startY);
    }
}

SpreadsheetExtensionRegistry.add(Font);
