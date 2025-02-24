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

import { Average } from './average';
import { Count } from './count';
import { CountA } from './counta';
import { FUNCTION_NAMES_STATISTICAL } from './function-names';
import { Max } from './max';
import { Min } from './min';

export const functionStatistical = [
    [Average, FUNCTION_NAMES_STATISTICAL.AVERAGE],
    [Count, FUNCTION_NAMES_STATISTICAL.COUNT],
    [Max, FUNCTION_NAMES_STATISTICAL.MAX],
    [Min, FUNCTION_NAMES_STATISTICAL.MIN],
    [Min, FUNCTION_NAMES_STATISTICAL.MIN],
    [CountA, FUNCTION_NAMES_STATISTICAL.COUNTA],
];
