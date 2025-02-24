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

export default {
    CELL: {
        description: '返回有关单元格格式、位置或内容的信息',
        abstract: '返回有关单元格格式、位置或内容的信息',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/cell-%E5%87%BD%E6%95%B0-51bd39a5-f338-4dbe-a33f-955d67c2b2cf',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ERROR_TYPE: {
        description: '返回对应于错误类型的数字',
        abstract: '返回对应于错误类型的数字',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/error-type-%E5%87%BD%E6%95%B0-10958677-7c8d-44f7-ae77-b9a9ee6eefaa',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    INFO: {
        description: '返回有关当前操作环境的信息',
        abstract: '返回有关当前操作环境的信息',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/info-%E5%87%BD%E6%95%B0-725f259a-0e4b-49b3-8b52-58815c69acae',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISBLANK: {
        description: '如果值为空，则返回 TRUE',
        abstract: '如果值为空，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            value: { name: '值', detail: ' 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。' },
        },
    },
    ISERR: {
        description: '如果值为除 #N/A 以外的任何错误值，则返回 TRUE',
        abstract: '如果值为除 #N/A 以外的任何错误值，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISERROR: {
        description: '如果值为任何错误值，则返回 TRUE',
        abstract: '如果值为任何错误值，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISEVEN: {
        description: '如果数字为偶数，则返回 TRUE',
        abstract: '如果数字为偶数，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/iseven-%E5%87%BD%E6%95%B0-aa15929a-d77b-4fbb-92f4-2f479af55356',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISFORMULA: {
        description: '如果有对包含公式的单元格的引用，则返回 TRUE',
        abstract: '如果有对包含公式的单元格的引用，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/isformula-%E5%87%BD%E6%95%B0-e4d1355f-7121-4ef2-801e-3839bfd6b1e5',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISLOGICAL: {
        description: '如果值为逻辑值，则返回 TRUE',
        abstract: '如果值为逻辑值，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISNA: {
        description: '如果值为错误值 #N/A，则返回 TRUE',
        abstract: '如果值为错误值 #N/A，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISNONTEXT: {
        description: '如果值不是文本，则返回 TRUE',
        abstract: '如果值不是文本，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISNUMBER: {
        description: '如果值为数字，则返回 TRUE',
        abstract: '如果值为数字，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISODD: {
        description: '如果数字为奇数，则返回 TRUE',
        abstract: '如果数字为奇数，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISOMITTED: {
        description: '检查 LAMBDA 中的值是否缺失，并返回 TRUE 或 FALSE',
        abstract: '检查 LAMBDA 中的值是否缺失，并返回 TRUE 或 FALSE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/isomitted-%E5%87%BD%E6%95%B0-831d6fbc-0f07-40c4-9c5b-9c73fd1d60c1',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISREF: {
        description: '如果值为引用值，则返回 TRUE',
        abstract: '如果值为引用值，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    ISTEXT: {
        description: '如果值为文本，则返回 TRUE',
        abstract: '如果值为文本，则返回 TRUE',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/is-%E5%87%BD%E6%95%B0-0f2d7971-6019-40a0-a171-f2d869135665',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    N: {
        description: '返回转换为数字的值',
        abstract: '返回转换为数字的值',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/n-%E5%87%BD%E6%95%B0-a624cad1-3635-4208-b54a-29733d1278c9',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    NA: {
        description: '返回错误值 #N/A',
        abstract: '返回错误值 #N/A',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/na-%E5%87%BD%E6%95%B0-5469c2d1-a90c-4fb5-9bbc-64bd9bb6b47c',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    SHEET: {
        description: '返回引用工作表的工作表编号',
        abstract: '返回引用工作表的工作表编号',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/sheet-%E5%87%BD%E6%95%B0-44718b6f-8b87-47a1-a9d6-b701c06cff24',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    SHEETS: {
        description: '返回引用中的工作表数',
        abstract: '返回引用中的工作表数',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/sheets-%E5%87%BD%E6%95%B0-770515eb-e1e8-45ce-8066-b557e5e4b80b',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
    TYPE: {
        description: '返回表示值的数据类型的数字',
        abstract: '返回表示值的数据类型的数字',
        links: [
            {
                title: '教学',
                url: 'https://support.microsoft.com/zh-cn/office/type-%E5%87%BD%E6%95%B0-45b4e688-4bc3-48b3-a105-ffa892995899',
            },
        ],
        functionParameter: {
            number1: { name: 'number1', detail: 'first' },
            number2: { name: 'number2', detail: 'second' },
        },
    },
};
