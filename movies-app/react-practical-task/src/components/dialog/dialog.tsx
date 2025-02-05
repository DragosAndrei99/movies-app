import FocusTrap from "focus-trap-react";
import { MouseEventHandler, ReactElement } from "react";
import { createPortal } from "react-dom";


export default function Dialog({ title, children, handleClose }: { title: string, children: ReactElement[], handleClose: MouseEventHandler }) {

  return (
    <>
      {createPortal(
        <div className="fixed inset-0 bg-gray-900 text-white rounded-md max-w-lg mx-auto z-50">
          <div className="mx-6 flex-col align-center justify-between uppercase">
            <div className="flex justify-end">
              <button onClick={handleClose} >X</button>
            </div>
            <h2 className="pt-6 text-2xl mb-6">{title}</h2>
          </div>
          <FocusTrap>
            <div>
            {...children}
            </div>
          </FocusTrap>
        </div>
        , document.body)}
    </>
  )
}