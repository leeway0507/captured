'use client'

import React from 'react'
import Image from 'next/image'

import { PopUpModal } from './new-modal'
import { useShoppingCart } from '../context/shopping-cart-context'

function ConfirmForm(title: string, content: string | JSX.Element, callBack: CallableFunction) {
    const { setModalOpen } = useShoppingCart()

    const ConfirmHandler = () => {
        callBack()
        setModalOpen(false)
    }
    const CancelHandler = () => {
        setModalOpen(false)
    }

    return (
        <div className="flex w-full max-w-[380px] flex-col overflow-hidden bg-white text-left align-middle">
            <div className="flex content-center justify-between">
                <div className="text-md text-main-black">{title}</div>
                <button type="button" className="flex items-end" onClick={CancelHandler}>
                    <Image src="/icons/white/x-mark-white.svg" alt="x-mark" width="20" height="20" priority />
                </button>
            </div>
            <div className="text-sub-black">{content}</div>
            <div className="flex gap-4">
                <button type="button" className="black-bar px-5 py-3" onClick={ConfirmHandler}>
                    예
                </button>
                <button
                    type="button"
                    className="black-bar bg-light-gray px-5 py-3 text-main-black "
                    onClick={CancelHandler}
                >
                    아니오
                </button>
            </div>
        </div>
    )
}

const ConfirmPopUpModal = (title: string, content: string | JSX.Element, callBack: CallableFunction) =>
    PopUpModal(ConfirmForm(title, content, callBack))

export default ConfirmPopUpModal
