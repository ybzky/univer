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

import { ErrorType } from '../../../basics/error-type';
import { type BaseValueObject, ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { NumberValueObject } from '../../../engine/value-object/primitive-object';
import { BaseFunction } from '../../base-function';

export class Max extends BaseFunction {
    override calculate(...variants: BaseValueObject[]) {
        if (variants.length === 0) {
            return new ErrorValueObject(ErrorType.NA);
        }

        let accumulatorAll: BaseValueObject = new NumberValueObject(Number.NEGATIVE_INFINITY);
        for (let i = 0; i < variants.length; i++) {
            let variant = variants[i];

            if (variant.isError()) {
                return variant;
            }

            if (variant.isArray()) {
                variant = variant.max();
            }

            if (variant.isNull()) {
                continue;
            }

            accumulatorAll = this._validator(accumulatorAll, variant as BaseValueObject);

            // const variant = variants[i];

            // if (variant.isReferenceObject() || (variant.isValueObject() && (variant as BaseValueObject).isArray())) {
            //     (variant as BaseReferenceObject | ArrayValueObject).iterator((valueObject, row, column) => {
            //         if (!valueObject.isError() && !(valueObject as BaseValueObject).isString()) {
            //             accumulatorAll = this._validator(accumulatorAll, valueObject as BaseValueObject);
            //         }
            //     });
            // } else if (!(variant as BaseValueObject).isString()) {
            //     accumulatorAll = this._validator(accumulatorAll, variant as BaseValueObject);
            // }
        }

        return accumulatorAll;
    }

    private _validator(accumulatorAll: BaseValueObject, valueObject: BaseValueObject) {
        const validator = accumulatorAll.isLessThan(valueObject);
        if (validator.getValue()) {
            accumulatorAll = valueObject;
        }
        return accumulatorAll;
    }
}
