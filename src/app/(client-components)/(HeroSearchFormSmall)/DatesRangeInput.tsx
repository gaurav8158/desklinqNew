'use client'

import React, { Fragment, useState, FC, useCallback, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePicker from 'react-datepicker'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'
import { DateTimeType } from '@/type/FilterTypes'

export interface DateRangeInputProps {
  className?: string
  fieldClassName?: string
}

const DatesRangeInput: FC<DateRangeInputProps> = ({
  className = '[ lg:nc-flex-2 ]',
  fieldClassName = '[ nc-hero-field-padding--small ]',
}) => {
  const dateTime: any = useAppSelector(
    (state: any) => state.filter.primaryFilter.dateTime
  )
  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(dateTime.fromDate)
  )
  const [endDate, setEndDate] = useState<Date | null>(new Date(dateTime.toDate))
  //

  useEffect(() => {
    dispatch(
      updatePrimaryFilter({
        dateTime: {
          fromDate: startDate?.toISOString() || '',
          fromTime: `00:00`,
          toDate: endDate?.toISOString() || '',
          toTime: `23:59`,
        },
      })
    )
  }, [startDate, endDate, dispatch])

  const onChangeDate = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
    },
    [dispatch]
  )

  const renderInput = () => {
    return (
      <>
        <div className="flex-grow text-left">
          <span className="block xl:text-base font-semibold">
            {startDate?.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            }) || 'Add dates'}
            {endDate
              ? ' - ' +
                endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })
              : ''}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {'Check in - Check out'}
          </span>
        </div>
      </>
    )
  }

  return (
    <Popover className={`DateRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${
              open ? 'nc-hero-field-focused--2' : ''
            }`}
          >
            {renderInput()}
          </Popover.Button>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  minDate={new Date()}
                  inline
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default DatesRangeInput
