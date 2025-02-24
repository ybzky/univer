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

import type { DocumentDataModel, IDocumentBody, IDocumentData, IDocumentStyle, IPosition, Nullable } from '@univerjs/core';
import { DEFAULT_EMPTY_DOCUMENT_VALUE, Disposable, FOCUSING_UNIVER_EDITOR_SINGLE_MODE, HorizontalAlign, IContextService, IUniverInstanceService, toDisposable, VerticalAlign } from '@univerjs/core';
import type { IDisposable } from '@wendellhu/redi';
import { createIdentifier, Inject } from '@wendellhu/redi';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import type { IRender, ISuccinctTextRangeParam, Scene } from '@univerjs/engine-render';
import { IRenderManagerService, UNIVER_GLOBAL_DEFAULT_FONT_SIZE } from '@univerjs/engine-render';
import { isReferenceString, LexerTreeBuilder, operatorToken } from '@univerjs/engine-formula';

export interface IEditorStateParam extends Partial<IPosition> {
    visible?: boolean;
}

export interface IEditorCanvasStyle {
    fontSize?: number;
}

export interface IEditorConfigParam {
    editorUnitId: string;

    initialSnapshot?: IDocumentData;
    cancelDefaultResizeListener?: boolean;
    canvasStyle?: IEditorCanvasStyle;
    isSheetEditor: boolean;

    isSingle: boolean;
    isReadonly: boolean;
    onlyInputFormula: boolean;
    onlyInputRange: boolean;
    onlyInputContent: boolean;

}

export interface IEditorSetParam extends IEditorConfigParam, IEditorStateParam {
    render: IRender;
    documentDataModel: DocumentDataModel;
    editorDom: HTMLDivElement;
}

export interface IEditorSetValueParam {
    editorUnitId: string;
    body: IDocumentBody;
}

export interface IEditorInputFormulaParam {
    editorUnitId: string;
    formulaString: string;
}

class Editor {
    private _focus = false;

    private _valueLegality = true;

    constructor(private _param: IEditorSetParam) {

    }

    get documentDataModel() {
        return this._param.documentDataModel;
    }

    get editorUnitId() {
        return this._param.editorUnitId;
    }

    get cancelDefaultResizeListener() {
        return this._param.cancelDefaultResizeListener;
    }

    get render() {
        return this._param.render;
    }

    isValueLegality() {
        return this._valueLegality === true;
    }

    setValueLegality(state = true) {
        this._valueLegality = state;
    }

    isFocus() {
        return this._focus;
    }

    setFocus(state = false) {
        this._focus = state;
    }

    isSingle() {
        return this._param.isSingle === true || this.onlyInputFormula() || this.onlyInputFormula();
    }

    isReadOnly() {
        return this._param.isReadonly === true;
    }

    onlyInputContent() {
        return this._param.onlyInputContent === true;
    }

    onlyInputFormula() {
        return this._param.onlyInputFormula === true;
    }

    onlyInputRange() {
        return this._param.onlyInputRange === true;
    }

    getBoundingClientRect() {
        return this._param.editorDom.getBoundingClientRect();
    }

    isVisible() {
        return this._param.visible;
    }

    isSheetEditor() {
        return this._param.isSheetEditor === true;
    }

    getValue() {
        return this._param.documentDataModel.getBody()?.dataStream || '';
    }

    getBody() {
        return this._param.documentDataModel.getBody();
    }

    update(param: IEditorStateParam) {
        this._param = {
            ...this._param,
            ...param,
        };
    }

    verticalAlign() {
        const documentDataModel = this._param?.documentDataModel;

        if (documentDataModel == null) {
            return;
        }

        const { width, height } = this._param.editorDom.getBoundingClientRect();

        if (!this.isSingle()) {
            documentDataModel.updateDocumentDataPageSize(width, undefined);
            return;
        }

        let fontSize = UNIVER_GLOBAL_DEFAULT_FONT_SIZE;

        if (this._param.canvasStyle?.fontSize) {
            fontSize = this._param.canvasStyle.fontSize;
        }

        const top = (height - (fontSize * 4 / 3)) / 2 - 2;

        documentDataModel.updateDocumentDataMargin({
            t: top < 0 ? 0 : top,
        });

        documentDataModel.updateDocumentDataPageSize(undefined, undefined);
    }

    updateCanvasStyle() {
        const documentDataModel = this._param.documentDataModel;
        if (documentDataModel == null) {
            return;
        }

        const documentStyle: IDocumentStyle = {};

        if (this._param.canvasStyle?.fontSize) {
            if (documentStyle.textStyle == null) {
                documentStyle.textStyle = {};
            }

            documentStyle.textStyle.fs = this._param.canvasStyle.fontSize;
        }

        documentDataModel.updateDocumentStyle(documentStyle);
    }
}

export interface IEditorService {
    getEditor(id?: string): Readonly<Nullable<Editor>>;

    setState(param: IEditorStateParam, id: string): void;

    register(config: IEditorConfigParam, container: HTMLDivElement): IDisposable;

    unRegister(editorUnitId: string): void;

    isVisible(id: string): Nullable<boolean>;

    inputFormula$: Observable<IEditorInputFormulaParam>;

    setFormula(formulaString: string): void;

    resize$: Observable<string>;

    resize(id: string): void;

    getAllEditor(): Map<string, Editor>;

    /**
     * The sheet currently being operated on will determine
     * whether to include unitId information in the ref.
     */
    setOperationSheetUnitId(unitId: Nullable<string>): void;

    getOperationSheetUnitId(): Nullable<string>;

     /**
      * The sub-table within the sheet currently being operated on
      * will determine whether to include subUnitId information in the ref.
      */
    setOperationSheetSubUnitId(sheetId: Nullable<string>): void;

    getOperationSheetSubUnitId(): Nullable<string>;

    isEditor(editorUnitId: string): boolean;

    isSheetEditor(editorUnitId: string): boolean;

    changeEditorFocus$: Observable<unknown>;

    changeEditorFocus(): void;

    blur$: Observable<unknown>;

    blur(): void;

    focus$: Observable<ISuccinctTextRangeParam>;

    focus(editorUnitId?: string): void;

    setValue$: Observable<IEditorSetValueParam>;

    valueChange$: Observable<Readonly<Editor>>;

    setValue(val: string, editorUnitId?: string): void;

    setRichValue(body: IDocumentBody, editorUnitId?: string): void;

    getFirstEditor(): Editor;

    focusStyle$: Observable<string>;

    focusStyle(editorUnitId: string): void;

    refreshValueChange(editorId: string): void;

    checkValueLegality(editorId: string): boolean;
}

export class EditorService extends Disposable implements IEditorService, IDisposable {
    private _editors = new Map<string, Editor>();

    private readonly _state$ = new Subject<Nullable<IEditorStateParam>>();
    readonly state$ = this._state$.asObservable();

    private _currentSheetUnitId: Nullable<string>;

    private _currentSheetSubUnitId: Nullable<string>;

    private readonly _inputFormula$ = new Subject<IEditorInputFormulaParam>();
    readonly inputFormula$ = this._inputFormula$.asObservable();

    private readonly _resize$ = new Subject<string>();
    readonly resize$ = this._resize$.asObservable();

    private readonly _changeEditorFocus$ = new Subject<unknown>();
    readonly changeEditorFocus$ = this._changeEditorFocus$.asObservable();

    private readonly _blur$ = new Subject();
    readonly blur$ = this._blur$.asObservable();

    private readonly _focus$ = new Subject<ISuccinctTextRangeParam>();
    readonly focus$ = this._focus$.asObservable();

    private readonly _setValue$ = new Subject<IEditorSetValueParam>();
    readonly setValue$ = this._setValue$.asObservable();

    private readonly _valueChange$ = new Subject<Readonly<Editor>>();
    readonly valueChange$ = this._valueChange$.asObservable();

    private readonly _focusStyle$ = new Subject<string>();

    readonly focusStyle$ = this._focusStyle$.asObservable();

    constructor(
        @IUniverInstanceService private readonly _currentUniverService: IUniverInstanceService,
        @IRenderManagerService private readonly _renderManagerService: IRenderManagerService,
        @Inject(LexerTreeBuilder) private readonly _lexerTreeBuilder: LexerTreeBuilder,
        @IContextService private readonly _contextService: IContextService
    ) {
        super();
    }

    isEditor(editorUnitId: string) {
        return this._editors.has(editorUnitId);
    }

    isSheetEditor(editorUnitId: string) {
        const editor = this._editors.get(editorUnitId);
        return !!(editor && editor.isSheetEditor());
    }

    changeEditorFocus() {
        const documentDataModel = this._currentUniverService.getCurrentUniverDocInstance();
        const editorUnitId = documentDataModel.getUnitId();
        if (!this.isEditor(editorUnitId) || this.isSheetEditor(editorUnitId)) {
            return;
        }
        // const editor = this._editors.get(editorUnitId);
        this._changeEditorFocus$.next(null);

        this.blur();
    }

    focusStyle(editorUnitId: string) {
        const editor = this.getEditor(editorUnitId);
        if (!editor) {
            return false;
        }

        this.getAllEditor().forEach((editor) => {
            editor.setFocus(false);
        });

        editor.setFocus(true);

        this._contextService.setContextValue(FOCUSING_UNIVER_EDITOR_SINGLE_MODE, editor.isSingle());

        this._focusStyle$.next(editorUnitId);
    }

    blur() {
        this._blur$.next(null);
    }

    focus(editorUnitId?: string) {
        if (editorUnitId == null) {
            const documentDataModel = this._currentUniverService.getCurrentUniverDocInstance();
            editorUnitId = documentDataModel.getUnitId();
        }

        const editor = this.getEditor(editorUnitId);

        if (editor == null) {
            return;
        }

        this._currentUniverService.setCurrentUniverDocInstance(editorUnitId);

        const valueCount = editor.getValue().length;

        this._focus$.next({
            startOffset: valueCount - 2,
            endOffset: valueCount - 2,
        });
    }

    setFormula(formulaString: string, editorUnitId?: string) {
        if (editorUnitId == null) {
            editorUnitId = this._getCurrentEditorUnitId();
        }
        this._inputFormula$.next({ formulaString, editorUnitId });
    }

    setValue(val: string, editorUnitId?: string) {
        if (editorUnitId == null) {
            editorUnitId = this._getCurrentEditorUnitId();
        }

        if (val.substring(0, 1) === '=') {
            this.setFormula(val, editorUnitId);
        } else {
            this._setValue$.next({ body: {
                dataStream: val,
            }, editorUnitId });
        }

        this._refreshValueChange(editorUnitId);
    }

    getValue(id?: string) {
        const editor = this.getEditor(id);

        return editor?.getValue();
    }

    setRichValue(body: IDocumentBody, editorUnitId?: string) {
        if (editorUnitId == null) {
            editorUnitId = this._getCurrentEditorUnitId();
        }

        this._setValue$.next({ body, editorUnitId });

        this._refreshValueChange(editorUnitId);
    }

    getRichValue(id?: string) {
        const editor = this.getEditor(id);

        return editor?.getBody();
    }

    override dispose(): void {
        this._state$.complete();
        this._editors.clear();
        super.dispose();
    }

    getEditor(id?: string): Readonly<Nullable<Editor>> {
        if (id == null) {
            id = this._getCurrentEditorUnitId();
        }
        return this._editors.get(id);
    }

    getAllEditor() {
        return this._editors;
    }

    getFirstEditor() {
        return [...this.getAllEditor().values()][0];
    }

    resize(unitId: string) {
        const editor = this.getEditor(unitId);
        if (editor == null) {
            return;
        }

        editor.verticalAlign();

        this._resize$.next(unitId);
    }

    setState(param: IEditorStateParam, id: string) {
        const editor = this._editors.get(id);
        if (editor) {
            editor.update(param);
        }

        this._refresh(param);
    }

    isVisible(id: string) {
        return this.getEditor(id)?.isVisible();
    }

    setOperationSheetUnitId(unitId: Nullable<string>) {
        this._currentSheetUnitId = unitId;
    }

    getOperationSheetUnitId() {
        return this._currentSheetUnitId;
    }

    setOperationSheetSubUnitId(sheetId: Nullable<string>) {
        this._currentSheetSubUnitId = sheetId;
    }

    getOperationSheetSubUnitId() {
        return this._currentSheetSubUnitId;
    }

    register(config: IEditorConfigParam, container: HTMLDivElement): IDisposable {
        const { initialSnapshot, editorUnitId, canvasStyle = {} } = config;

        const documentDataModel = this._currentUniverService.createDoc(initialSnapshot || this._getBlank(editorUnitId));

        let render = this._renderManagerService.getRenderById(editorUnitId);

        if (render == null) {
            this._renderManagerService.create(editorUnitId);
            render = this._renderManagerService.getRenderById(editorUnitId)!;
        }

        render.engine.setContainer(container);

        const editor = new Editor({ ...config, render, documentDataModel, editorDom: container, canvasStyle });

        this._editors.set(editorUnitId, editor);

        // Delete scroll bar
        (render.mainComponent?.getScene() as Scene)?.getViewports()?.[0].getScrollBar()?.dispose();

        if (!editor.isSheetEditor()) {
            editor.verticalAlign();
            editor.updateCanvasStyle();
        }

        return toDisposable(() => {
            this.unRegister(editorUnitId);
        });
    }

    unRegister(editorUnitId: string) {
        const editor = this._editors.get(editorUnitId);

        if (editor == null) {
            return;
        }

        this._renderManagerService.removeItem(editorUnitId);

        editor.documentDataModel.dispose();

        this._editors.delete(editorUnitId);

        this._currentUniverService.disposeDocument(editorUnitId);
    }

    refreshValueChange(editorUnitId: string) {
        this._refreshValueChange(editorUnitId);
    }

    checkValueLegality(editorUnitId: string) {
        const editor = this._editors.get(editorUnitId);

        if (editor == null) {
            return true;
        }

        let value = editor.getValue();

        editor.setValueLegality();

        value = value.replace(/\r\n/g, '').replace(/\n/g, '').replace(/\n/g, '');

        if (value.length === 0) {
            return true;
        }

        if (editor.onlyInputFormula()) {
            if (value.substring(0, 1) !== operatorToken.EQUALS) {
                editor.setValueLegality(false);
                return false;
            }
            const bracketCount = this._lexerTreeBuilder.checkIfAddBracket(value);
            editor.setValueLegality(bracketCount === 0);
        } else if (editor.onlyInputRange()) {
            const valueArray = value.split(',');
            const result = valueArray.every((refString) => {
                return isReferenceString(refString.trim());
            });
            editor.setValueLegality(result);
        }

        return editor.isValueLegality();
    }

    private _refreshValueChange(editorId: string) {
        const editor = this.getEditor(editorId);
        if (editor == null) {
            return;
        }

        this._valueChange$.next(editor);
    }

    private _getCurrentEditorUnitId() {
        const current = this._currentUniverService.getCurrentUniverDocInstance();
        return current.getUnitId();
    }

    private _refresh(param: IEditorStateParam): void {
        this._state$.next(param);
    }

    private _getBlank(id: string) {
        return {
            id,
            body: {
                dataStream: `${DEFAULT_EMPTY_DOCUMENT_VALUE}`,
                textRuns: [],
                paragraphs: [
                    {
                        startIndex: 0,
                    },
                ],
            },
            documentStyle: {
                renderConfig: {
                    verticalAlign: VerticalAlign.TOP,
                    horizontalAlign: HorizontalAlign.LEFT,
                },
                marginLeft: 6,
                marginTop: 2,
                marginRight: 6,
            },
        } as IDocumentData;
    }
}

export const IEditorService = createIdentifier<IEditorService>(
    'univer.editor.service'
);
