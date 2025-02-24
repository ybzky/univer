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

import { FUNCTION_NAMES_DATE, FunctionType, type IFunctionInfo } from '@univerjs/engine-formula';

export const FUNCTION_LIST_DATE: IFunctionInfo[] = [
    {
        functionName: FUNCTION_NAMES_DATE.DATE,
        functionType: FunctionType.Date,
        description: 'formula.functionList.DATE.description',
        abstract: 'formula.functionList.DATE.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.DATE.functionParameter.year.name',
                detail: 'formula.functionList.DATE.functionParameter.year.detail',
                example: '2024',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.DATE.functionParameter.month.name',
                detail: 'formula.functionList.DATE.functionParameter.month.detail',
                example: '1',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.DATE.functionParameter.day.name',
                detail: 'formula.functionList.DATE.functionParameter.day.detail',
                example: '1',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.DATEDIF,
        functionType: FunctionType.Date,
        description: 'formula.functionList.DATEDIF.description',
        abstract: 'formula.functionList.DATEDIF.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.DATEDIF.functionParameter.number1.name',
                detail: 'formula.functionList.DATEDIF.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.DATEDIF.functionParameter.number2.name',
                detail: 'formula.functionList.DATEDIF.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.DATEVALUE,
        functionType: FunctionType.Date,
        description: 'formula.functionList.DATEVALUE.description',
        abstract: 'formula.functionList.DATEVALUE.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.DATEVALUE.functionParameter.number1.name',
                detail: 'formula.functionList.DATEVALUE.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.DATEVALUE.functionParameter.number2.name',
                detail: 'formula.functionList.DATEVALUE.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.DAY,
        functionType: FunctionType.Date,
        description: 'formula.functionList.DAY.description',
        abstract: 'formula.functionList.DAY.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.DAY.functionParameter.serialNumber.name',
                detail: 'formula.functionList.DAY.functionParameter.serialNumber.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.DAYS,
        functionType: FunctionType.Date,
        description: 'formula.functionList.DAYS.description',
        abstract: 'formula.functionList.DAYS.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.DAYS.functionParameter.number1.name',
                detail: 'formula.functionList.DAYS.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.DAYS.functionParameter.number2.name',
                detail: 'formula.functionList.DAYS.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.DAYS360,
        functionType: FunctionType.Date,
        description: 'formula.functionList.DAYS360.description',
        abstract: 'formula.functionList.DAYS360.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.DAYS360.functionParameter.number1.name',
                detail: 'formula.functionList.DAYS360.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.DAYS360.functionParameter.number2.name',
                detail: 'formula.functionList.DAYS360.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.EDATE,
        functionType: FunctionType.Date,
        description: 'formula.functionList.EDATE.description',
        abstract: 'formula.functionList.EDATE.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.EDATE.functionParameter.startDate.name',
                detail: 'formula.functionList.EDATE.functionParameter.startDate.detail',
                example: 'A1',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.EDATE.functionParameter.months.name',
                detail: 'formula.functionList.EDATE.functionParameter.months.detail',
                example: '1',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.EOMONTH,
        functionType: FunctionType.Date,
        description: 'formula.functionList.EOMONTH.description',
        abstract: 'formula.functionList.EOMONTH.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.EOMONTH.functionParameter.number1.name',
                detail: 'formula.functionList.EOMONTH.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.EOMONTH.functionParameter.number2.name',
                detail: 'formula.functionList.EOMONTH.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.HOUR,
        functionType: FunctionType.Date,
        description: 'formula.functionList.HOUR.description',
        abstract: 'formula.functionList.HOUR.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.HOUR.functionParameter.number1.name',
                detail: 'formula.functionList.HOUR.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.HOUR.functionParameter.number2.name',
                detail: 'formula.functionList.HOUR.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.ISOWEEKNUM,
        functionType: FunctionType.Date,
        description: 'formula.functionList.ISOWEEKNUM.description',
        abstract: 'formula.functionList.ISOWEEKNUM.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.ISOWEEKNUM.functionParameter.number1.name',
                detail: 'formula.functionList.ISOWEEKNUM.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.ISOWEEKNUM.functionParameter.number2.name',
                detail: 'formula.functionList.ISOWEEKNUM.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.MINUTE,
        functionType: FunctionType.Date,
        description: 'formula.functionList.MINUTE.description',
        abstract: 'formula.functionList.MINUTE.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.MINUTE.functionParameter.number1.name',
                detail: 'formula.functionList.MINUTE.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.MINUTE.functionParameter.number2.name',
                detail: 'formula.functionList.MINUTE.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.MONTH,
        functionType: FunctionType.Date,
        description: 'formula.functionList.MONTH.description',
        abstract: 'formula.functionList.MONTH.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.MONTH.functionParameter.serialNumber.name',
                detail: 'formula.functionList.MONTH.functionParameter.serialNumber.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.NETWORKDAYS,
        functionType: FunctionType.Date,
        description: 'formula.functionList.NETWORKDAYS.description',
        abstract: 'formula.functionList.NETWORKDAYS.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.NETWORKDAYS.functionParameter.number1.name',
                detail: 'formula.functionList.NETWORKDAYS.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.NETWORKDAYS.functionParameter.number2.name',
                detail: 'formula.functionList.NETWORKDAYS.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.NETWORKDAYS_INTL,
        functionType: FunctionType.Date,
        description: 'formula.functionList.NETWORKDAYS_INTL.description',
        abstract: 'formula.functionList.NETWORKDAYS_INTL.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.NETWORKDAYS_INTL.functionParameter.number1.name',
                detail: 'formula.functionList.NETWORKDAYS_INTL.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.NETWORKDAYS_INTL.functionParameter.number2.name',
                detail: 'formula.functionList.NETWORKDAYS_INTL.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.NOW,
        functionType: FunctionType.Date,
        description: 'formula.functionList.NOW.description',
        abstract: 'formula.functionList.NOW.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.NOW.functionParameter.number1.name',
                detail: 'formula.functionList.NOW.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.NOW.functionParameter.number2.name',
                detail: 'formula.functionList.NOW.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.SECOND,
        functionType: FunctionType.Date,
        description: 'formula.functionList.SECOND.description',
        abstract: 'formula.functionList.SECOND.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.SECOND.functionParameter.number1.name',
                detail: 'formula.functionList.SECOND.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.SECOND.functionParameter.number2.name',
                detail: 'formula.functionList.SECOND.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.TIME,
        functionType: FunctionType.Date,
        description: 'formula.functionList.TIME.description',
        abstract: 'formula.functionList.TIME.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.TIME.functionParameter.number1.name',
                detail: 'formula.functionList.TIME.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.TIME.functionParameter.number2.name',
                detail: 'formula.functionList.TIME.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.TIMEVALUE,
        functionType: FunctionType.Date,
        description: 'formula.functionList.TIMEVALUE.description',
        abstract: 'formula.functionList.TIMEVALUE.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.TIMEVALUE.functionParameter.number1.name',
                detail: 'formula.functionList.TIMEVALUE.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.TIMEVALUE.functionParameter.number2.name',
                detail: 'formula.functionList.TIMEVALUE.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.TODAY,
        functionType: FunctionType.Date,
        description: 'formula.functionList.TODAY.description',
        abstract: 'formula.functionList.TODAY.abstract',
        functionParameter: [
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.WEEKDAY,
        functionType: FunctionType.Date,
        description: 'formula.functionList.WEEKDAY.description',
        abstract: 'formula.functionList.WEEKDAY.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.WEEKDAY.functionParameter.number1.name',
                detail: 'formula.functionList.WEEKDAY.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.WEEKDAY.functionParameter.number2.name',
                detail: 'formula.functionList.WEEKDAY.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.WEEKNUM,
        functionType: FunctionType.Date,
        description: 'formula.functionList.WEEKNUM.description',
        abstract: 'formula.functionList.WEEKNUM.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.WEEKNUM.functionParameter.number1.name',
                detail: 'formula.functionList.WEEKNUM.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.WEEKNUM.functionParameter.number2.name',
                detail: 'formula.functionList.WEEKNUM.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.WORKDAY,
        functionType: FunctionType.Date,
        description: 'formula.functionList.WORKDAY.description',
        abstract: 'formula.functionList.WORKDAY.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.WORKDAY.functionParameter.number1.name',
                detail: 'formula.functionList.WORKDAY.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.WORKDAY.functionParameter.number2.name',
                detail: 'formula.functionList.WORKDAY.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.WORKDAY_INTL,
        functionType: FunctionType.Date,
        description: 'formula.functionList.WORKDAY_INTL.description',
        abstract: 'formula.functionList.WORKDAY_INTL.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.WORKDAY_INTL.functionParameter.number1.name',
                detail: 'formula.functionList.WORKDAY_INTL.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.WORKDAY_INTL.functionParameter.number2.name',
                detail: 'formula.functionList.WORKDAY_INTL.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.YEAR,
        functionType: FunctionType.Date,
        description: 'formula.functionList.YEAR.description',
        abstract: 'formula.functionList.YEAR.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.YEAR.functionParameter.serialNumber.name',
                detail: 'formula.functionList.YEAR.functionParameter.serialNumber.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
    {
        functionName: FUNCTION_NAMES_DATE.YEARFRAC,
        functionType: FunctionType.Date,
        description: 'formula.functionList.YEARFRAC.description',
        abstract: 'formula.functionList.YEARFRAC.abstract',
        functionParameter: [
            {
                name: 'formula.functionList.YEARFRAC.functionParameter.number1.name',
                detail: 'formula.functionList.YEARFRAC.functionParameter.number1.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
            {
                name: 'formula.functionList.YEARFRAC.functionParameter.number2.name',
                detail: 'formula.functionList.YEARFRAC.functionParameter.number2.detail',
                example: 'A1:A20',
                require: 1,
                repeat: 0,
            },
        ],
    },
];
