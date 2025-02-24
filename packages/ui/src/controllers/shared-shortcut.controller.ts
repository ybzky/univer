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

import { Disposable, ICommandService, LifecycleStages, OnLifecycle, RedoCommand, UndoCommand } from '@univerjs/core';
import { Inject, Injector } from '@wendellhu/redi';

import { CopyCommand, CutCommand, PasteCommand } from '../services/clipboard/clipboard.command';
import { IMenuService } from '../services/menu/menu.service';
import { KeyCode, MetaKeys } from '../services/shortcut/keycode';
import type { IShortcutItem } from '../services/shortcut/shortcut.service';
import { IShortcutService } from '../services/shortcut/shortcut.service';
import { IClipboardInterfaceService } from '../services/clipboard/clipboard-interface.service';
import { supportClipboardAPI } from '../services/clipboard/clipboard-utils';
import { SetEditorResizeOperation } from '../commands/operations/editor/set-editor-resize.operation';
import { RedoMenuItemFactory, UndoMenuItemFactory } from './menus/menus';

// Not that the clipboard shortcut items would only be invoked when the browser fully supports clipboard API.
// If not, the corresponding shortcut would not be triggered and we will perform clipboard operations
// through clipboard events (editorElement.addEventListener('paste')).

export const CopyShortcutItem: IShortcutItem = {
    id: CopyCommand.id,
    description: 'shortcut.copy',
    group: '1_common-edit',
    binding: KeyCode.C | MetaKeys.CTRL_COMMAND,
    // preconditions: supportClipboardAPI,
};

export const CutShortcutItem: IShortcutItem = {
    id: CutCommand.id,
    description: 'shortcut.cut',
    group: '1_common-edit',
    binding: KeyCode.X | MetaKeys.CTRL_COMMAND,
    // preconditions: supportClipboardAPI,
};

export const PasteShortcutItem: IShortcutItem = {
    id: PasteCommand.id,
    description: 'shortcut.paste',
    group: '1_common-edit',
    binding: KeyCode.V | MetaKeys.CTRL_COMMAND,
    preconditions: supportClipboardAPI,
};

export const UndoShortcutItem: IShortcutItem = {
    id: UndoCommand.id,
    description: 'shortcut.undo',
    group: '1_common-edit',
    binding: KeyCode.Z | MetaKeys.CTRL_COMMAND,
};

export const RedoShortcutItem: IShortcutItem = {
    id: RedoCommand.id,
    description: 'shortcut.redo',
    group: '1_common-edit',
    binding: KeyCode.Y | MetaKeys.CTRL_COMMAND,
};

/**
 * Define shared UI behavior across Univer business. Including undo / redo and clipboard operations.
 */
@OnLifecycle(LifecycleStages.Ready, SharedController)
export class SharedController extends Disposable {
    constructor(
        @Inject(Injector) private readonly _injector: Injector,
        @IMenuService private readonly _menuService: IMenuService,
        @IShortcutService private readonly _shortcutService: IShortcutService,
        @ICommandService private readonly _commandService: ICommandService,
        @IClipboardInterfaceService private readonly _interfaceService: IClipboardInterfaceService
    ) {
        super();

        this.initialize();
    }

    initialize(): void {
        this._registerCommands();
        this._registerShortcuts();
        this._registerMenus();
    }

    private _registerMenus(): void {
        [UndoMenuItemFactory, RedoMenuItemFactory].forEach((factory) => {
            this.disposeWithMe(this._menuService.addMenuItem(this._injector.invoke(factory)));
        });
    }

    private _registerCommands(): void {
        [CutCommand, CopyCommand, PasteCommand, SetEditorResizeOperation].forEach((command) =>
            this.disposeWithMe(this._commandService.registerMultipleCommand(command))
        );
    }

    private _registerShortcuts(): void {
        const shortcutItems = [UndoShortcutItem, RedoShortcutItem];
        shortcutItems.push(CutShortcutItem, CopyShortcutItem, PasteShortcutItem);

        shortcutItems.forEach((shortcut) => this.disposeWithMe(this._shortcutService.registerShortcut(shortcut)));
    }
}
